import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	getUserInfo,
	ResponseError,
	Role,
	updatePasswordResponse,
	User,
	UserEmailInput,
	UserInfo,
	UserPasswordInput,
} from '../../Types/cabinetTypes';
import { toast } from 'react-toastify';

export interface userState {
	userName: string;
	userInfo: {
		info: UserInfo;
		isLoading: boolean;
		errors: ResponseError[];
	};
	roles: Role[] | [];
	password: {
		errors: ResponseError[];
		isUpdatePass: boolean;
	};
	email: {
		errors: ResponseError[];
		isUpdateEmail: boolean;
	};
}

const initialState: userState = {
	userName: '',
	userInfo: {
		info: {
			phone: {
				number: '',
			},
			email: '',
			firstName: '',
			lastName: '',
			middleName: '',
		},
		isLoading: false,
		errors: [],
	},
	roles: [],
	password: {
		isUpdatePass: false,
		errors: [],
	},
	email: {
		isUpdateEmail: false,
		errors: [],
	},
};

export const fetchUserInfo = createAsyncThunk('unit/fetchUserInfo', async (_, { dispatch }) => {
	const response = await fetch(`/graphql`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: `{
          me {
            phone {
              number
            }
            email
            firstName
            lastName
            middleName
          }
        }`,
		}),
	});
	const result = (await response.json()) as getUserInfo;

	return result;
});

export const updatePassword = createAsyncThunk(
	'unit/updatePassword',
	async ({ pass: passInput }: { pass: UserPasswordInput }, { dispatch }) => {
		const response = await fetch(`/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
          mutation updatePassword($input: UserPasswordInput!) {
            editMyPassword(input: $input)
          }`,
				variables: {
					input: passInput,
				},
			}),
		});
		const result = (await response.json()) as updatePasswordResponse;

		return result;
	}
);

export const updateEmail = createAsyncThunk(
	'unit/updateEmail',
	async ({ payload: emailInput }: { payload: UserEmailInput }, { dispatch }) => {
		const response = await fetch(`/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
          mutation updateEmail($input: UserEmailInput!) {
            editMyEmail(input: $input) {
              email
            }
          }`,
				variables: {
					input: emailInput,
				},
			}),
		});
		const result = (await response.json()) as updatePasswordResponse;

		return result;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.userName = action.payload.userName;
			state.roles = action.payload.roles;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(updatePassword.pending, (state) => {
				state.password.isUpdatePass = true;
			})
			.addCase(
				updatePassword.fulfilled,
				(state, action: PayloadAction<updatePasswordResponse>) => {
					state.password.isUpdatePass = false;
					if (action.payload?.errors) {
						state.password.errors = [...action.payload.errors];
					} else {
						state.password.errors = [];
						toast.success('Дані оновленно');
					}
				}
			)
			.addCase(
				updatePassword.rejected,
				(state, action: PayloadAction<updatePasswordResponse>) => {
					state.password.isUpdatePass = false;
					if (action.payload?.errors) {
						state.password.errors = [...action.payload.errors];
					}
				}
			)
			.addCase(updateEmail.pending, (state) => {
				state.email.isUpdateEmail = true;
			})
			.addCase(
				updateEmail.fulfilled,
				(state, action: PayloadAction<updatePasswordResponse>) => {
					state.email.isUpdateEmail = false;
					if (action.payload?.errors) {
						state.email.errors = [...action.payload.errors];
					} else {
						state.email.errors = [];
						toast.success('Дані оновленно');
					}
				}
			)
			.addCase(
				updateEmail.rejected,
				(state, action: PayloadAction<updatePasswordResponse>) => {
					state.email.isUpdateEmail = false;
					if (action.payload?.errors) {
						state.email.errors = [...action.payload.errors];
					}
				}
			)
			.addCase(fetchUserInfo.pending, (state) => {
				state.userInfo.isLoading = true;
			})
			.addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<getUserInfo>) => {
				state.userInfo.isLoading = false;
				if (action.payload?.errors) {
					state.userInfo.errors = [...action.payload.errors];
				} else {
					state.userInfo.errors = [];
				}
				if (action.payload.data?.me) {
					state.userInfo.info = { ...action.payload.data.me };
				}
			})
			.addCase(fetchUserInfo.rejected, (state, action: PayloadAction<getUserInfo>) => {
				state.userInfo.isLoading = false;
				if (action.payload?.errors) {
					state.userInfo.errors = [...action.payload.errors];
				}
			});
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
