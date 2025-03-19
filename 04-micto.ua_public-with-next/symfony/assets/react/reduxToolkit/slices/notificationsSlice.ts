import {
	getMyNotificationsResponse,
	IMyNotifications,
	markNotificationAsReadResponse,
	UserNotification,
} from '@/Types/cabinetTypes';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface NotificationsState {
	loading: boolean;
	notifications: UserNotification[];
}

const initialState: NotificationsState = {
	loading: true,
	notifications: [],
};

export const fetchUserNotifications = createAsyncThunk(
	'notifications/fetchUserNotifications',
	async () => {
		const response = await fetch(`/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `{
				myNotifications(
					filter: {
					onlyUnread: false,
					}
					pagination: {
					limit: 10,
					page: 1
					}
				) {
					pageInfo {
					totalItems
					page
					}
					items {
					id
					creationDate
					isRead
					notification {
						__typename
						creationDate
						... on CommentReplyNotification {
						thread {
							id
							type
							text
						}
						replyTo {
							id
							text
						}
						reply {
							id
							text
						}
						}
						... on CommentNotification {
						comment {
							id
							dateCreated
							type
							text
							institution {
								id
							}
						}
						}
					}
					}
				}
			}`,
			}),
		});
		const result = (await response.json()) as getMyNotificationsResponse;

		return result.data.myNotifications;
	}
);

export const markNotificationsAsRead = createAsyncThunk(
	'notifications/markNotificationsAsRead',
	async (ids: number[]) => {
		const response = await fetch(`/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `mutation markNotificationAsRead($ids: [Int!]!) {
					markNotificationAsRead(id: $ids)
				}`,
				variables: {
					ids: ids,
				},
			}),
		});
		const result = (await response.json()) as markNotificationAsReadResponse;

		return result;
	}
);

let debounceTimer;

const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		updateNotification: (state, action: PayloadAction<UserNotification>) => {
			state.notifications = [...state.notifications, action.payload];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserNotifications.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				fetchUserNotifications.fulfilled,
				(state, action: PayloadAction<IMyNotifications>) => {
					state.notifications = [...action.payload.items] as any;
					state.loading = false;
				}
			)
			.addCase(fetchUserNotifications.rejected, (state) => {
				state.loading = false;
				// set errors
			})
			.addCase(markNotificationsAsRead.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				markNotificationsAsRead.fulfilled,
				(
					state,
					action: PayloadAction<markNotificationAsReadResponse, string, { arg: number[] }>
				) => {
					state.loading = false;
					if (action.payload.data.markNotificationAsRead) {
						state.notifications = state.notifications.map((stateEl) => {
							if (action.meta.arg.includes(stateEl.id)) {
								return {
									...stateEl,
									isRead: true,
								};
							}
							return stateEl;
						});
					}
				}
			)
			.addCase(markNotificationsAsRead.rejected, (state) => {
				state.loading = false;
				// set errors
			});
	},
});

export const {} = notificationsSlice.actions;

export default notificationsSlice.reducer;
