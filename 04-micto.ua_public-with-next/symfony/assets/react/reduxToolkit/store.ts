import { configureStore } from '@reduxjs/toolkit';
import institutionCommentsResucer from './slices/commentsUnitSlice';
import filterCommentReducer from './slices/filterCommentsSlice';
import institutionReducer from './slices/institutionSlice';
import institutionUnitReducer from './slices/institutionUnitSlice';
import selectsSliceResucer from './slices/selectsSlice';
import unitDepartmentReducer from './slices/unitDepartmentSlice';
import notificationsReducer from './slices/notificationsSlice';
import userReducer from './slices/userSlice';
// import { api } from './api/Api';

export const store = configureStore({
	reducer: {
		user: userReducer,
		institutionUnit: institutionUnitReducer,
		unitDepartment: unitDepartmentReducer,
		myInstitutions: institutionReducer,
		myComments: institutionCommentsResucer,
		selects: selectsSliceResucer,
		filterComments: filterCommentReducer,
		notifications: notificationsReducer,
		// [api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
