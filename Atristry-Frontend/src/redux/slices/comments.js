import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { resetErrAction, resetSuccessAction } from './globalActions/globalActions';

//initial state
const initialState = {
	loading: false,
	error: null,
	comments: [],
	comment: {},
	isAdded: false,
	isDeleted: false,
	isUpdated: false,
};

// create comment for artwork by id action
export const createCommentAction = createAsyncThunk(
	'comment/create',
	async (payload, { rejectWithValue, getState, dispatch }) => {
		try {
			const { content, id } = payload;

			//get token from localstorage
			const token = getState()?.users?.userAuth?.userInfo?.token;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.post(`${baseURL}/comments/${id}`, { content, id }, config);
			dispatch(fetchCommentsByArtworkId({ id }));
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error?.response?.data);
		}
	}
);

//fetch comment for artwork by id action
export const fetchCommentsByArtworkId = createAsyncThunk(
	'comments/fetchByArtworkId',
	async ({ id }, { rejectWithValue, getState, dispatch }) => {
		try {
			const { data } = await axios.get(`${baseURL}/artworks/${id}`, { id });
			return data;
		} catch (error) {
			return rejectWithValue(error?.response?.data);
		}
	}
);
//slice
const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	extraReducers: (builder) => {
		//create
		builder.addCase(createCommentAction.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createCommentAction.fulfilled, (state, action) => {
			state.loading = false;
			state.comment = action.payload;
			state.isAdded = true;
		});
		builder.addCase(createCommentAction.rejected, (state, action) => {
			state.loading = false;
			state.comment = null;
			state.isAdded = false;
			state.error = action.payload;
		});

		builder.addCase(fetchCommentsByArtworkId.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchCommentsByArtworkId.fulfilled, (state, action) => {
			state.loading = false;
			state.comments = action.payload.artwork.comments;
			state.isAdded = false;
		});
		builder.addCase(fetchCommentsByArtworkId.rejected, (state, action) => {
			state.loading = false;
			state.comments = null;
			state.error = action.payload;
		});

		//Reset err
		builder.addCase(resetErrAction.pending, (state, action) => {
			state.error = null;
		});
		//Reset success
		builder.addCase(resetSuccessAction.pending, (state, action) => {
			state.isAdded = false;
			state.error = null;
		});
	},
});

//generate reducer
const commentsReducer = commentsSlice.reducer;
export default commentsReducer;
