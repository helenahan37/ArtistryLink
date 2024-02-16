import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users';
import artworksReducer from '../slices/artworks';
import commentsReducer from '../slices/comments';
const store = configureStore({
	reducer: {
		users: usersReducer,
		artworks: artworksReducer,
		comments: commentsReducer,
	},
});

export default store;
