import {
	IComment,
	CommentFilterInput,
	CommentOrderInput,
	EntityComments,
	EntityType,
	getInstitutionResponseComment,
	getInstitutionResponseComments,
	ReplyCommentInput,
	ResponseError,
} from '@/Types/cabinetTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
	loading: boolean;
	commentLoading: boolean;
	entityComment: IComment | null;
	entityComments: EntityComments;
	errors: ResponseError[];
};

const initialState: initialStateType = {
	errors: [],
	entityComments: {
		items: [],
		pageInfo: {
			page: 1,
		},
	},
	entityComment: null,
	commentLoading: true,
	loading: true,
};

export const fetchComments = createAsyncThunk(
	'comments/fetchComments',
	async ({
		entityId: entityId,
		entityType: entityType,
		filter: filter,
		order: order,
	}: {
		entityId: number;
		entityType: EntityType;
		filter?: CommentFilterInput;
		order?: CommentOrderInput;
	}) => {
		try {
			const response = await fetch(`/graphql`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `query entityComments ($entityId: Int!, $entityType: EntityType!, $filter: CommentFilterInput, $order: CommentOrderInput){
          entityComments(entityId: $entityId, entityType: $entityType, filter: $filter, order: $order) {
            pageInfo {
              page
            }
            items {
              text
              id
              name
              dateCreated
              mark
              type
              institution {
			    id
                ownershipForm {
                  name 
                  title
				  
                }
                canEdit
                name
                fullName
                slug
              }
              replies {
                items {
                    id
                    name
                    text
                    dateCreated
                  }
                }
                unit {
					id
                    name
                }
                department{
                    name
                }
            }
          }
        }`,
					variables: {
						entityId: entityId,
						entityType: entityType,
						filter: filter,
						order: order,
					},
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const result = (await response.json()) as getInstitutionResponseComments;

			return result.data.entityComments;
		} catch (error) {
			console.error('Fetch error:', error);
		}
	}
);

export const fetchComment = createAsyncThunk('comments/fetchComment', async (id: number) => {
	try {
		const response = await fetch('/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `query getComment($id: Int!){
                      comment (id: $id) {
                        id
                        name
                        dateCreated
                        email
                        phone
                        mark
                        yearOfVisit
                        monthOfVisit
                        text
                        numLikes
                        numDislikes
                        department {
							id
                            name
                        }
                        replies {
                          items {
                            id
                            name
                            text
                            dateCreated
                          }
                        }
                        unit {
							id
                            name
                        }
                        institution {
						  id
                          ownershipForm {
                            name 
                            title
                            
                          }
                          canEdit
                          name
                          fullName
                          slug
                        }
                        type
                      }
                    }
                `,
				variables: {
					id: id,
				},
			}),
		});

		return (await response.json()) as getInstitutionResponseComment;
	} catch (e) {
		console.log(e, 'Something went wrong when I received the comment');
	}
});

export const addComment = createAsyncThunk(
	'comments/addComment',
	async ({ input: input }: { input: ReplyCommentInput }) => {
		try {
			const response = await fetch('/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `mutation addInstitutionComment($input: ReplyCommentInput!){
          replyComment(input: $input) {
                text
                id
                name
                dateCreated
                mark
                type
                replies {
                    items {
                        id
                        name
                        text
                        dateCreated
                    }
                }
                unit {
                    name
                }
                department{
                    name
                }
            }
          }
        `,
					variables: {
						input: input,
					},
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const result = await response.json();

			return result.data.replyComment;
		} catch (e) {
			console.log(e, 'Помилка при додавані коментаря');
		}
	}
);

let debounceTimer;

export const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchComments.pending, (state) => {
				clearTimeout(debounceTimer);

				debounceTimer = setTimeout(() => {
					state.loading = true;
				}, 300);
			})
			.addCase(fetchComments.rejected, (state) => {
				clearTimeout(debounceTimer);
				state.loading = false;
			})
			.addCase(fetchComments.fulfilled, (state, action: PayloadAction<EntityComments>) => {
				clearTimeout(debounceTimer);
				state.entityComments = action.payload;
				state.loading = false;
			})
			.addCase(fetchComment.pending, (state) => {
				clearTimeout(debounceTimer);

				debounceTimer = setTimeout(() => {
					state.commentLoading = true;
				}, 300);
			})
			.addCase(fetchComment.rejected, (state) => {
				clearTimeout(debounceTimer);
				state.commentLoading = false;
			})
			.addCase(
				fetchComment.fulfilled,
				(state, action: PayloadAction<getInstitutionResponseComment>) => {
					clearTimeout(debounceTimer);
					state.entityComment = action.payload.data.comment;
					state.commentLoading = false;
				}
			);
	},
});

// Action creators are generated for each case reducer function

export default commentsSlice.reducer;
