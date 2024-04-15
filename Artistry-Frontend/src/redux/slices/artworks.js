import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { getUserProfileAction } from './users';
import { resetErrAction, resetSuccessAction } from './globalActions/globalActions';

//initial state
const initialState = {
	loading: false,
	error: null,
	artworks: [],
	artwork: {},
	isAdded: false,
	isDeleted: false,
	isUpdated: false,
};

// create upload artwork action
export const uploadArtworkAction = createAsyncThunk(
	'artworks/upload',
	async (payload, { rejectWithValue, getState, dispatch }) => {
		try {
			const { title, description, genre, medium, file, username } = payload;

			//get token from localstorage
			const token = getState()?.users?.userAuth?.userInfo?.token;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			};

			const formData = new FormData();
			formData.append('title', title);
			formData.append('description', description);
			formData.append('genre', genre);
			formData.append('medium', medium);
			formData.append('file', file);
			formData.append('username', username);

			//make the http request
			const { data } = await axios.post(`${baseURL}/artworks/upload`, formData, config);
			dispatch(getUserProfileAction());

			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error?.response?.data);
		}
	}
);

//slice
const artworksSlice = createSlice({
	name: 'artworks',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(uploadArtworkAction.pending, (state) => {
				state.loading = true;
			})
			.addCase(uploadArtworkAction.fulfilled, (state, action) => {
				state.loading = false;
				state.artwork = action.payload;
				state.isAdded = true;
				state.error = null;
			})
			.addCase(uploadArtworkAction.rejected, (state, action) => {
				state.loading = false;
				state.isAdded = false;
				state.error = action.payload;
			})
			.addCase(getUserProfileAction.fulfilled, (state, action) => {
				state.artworks = action.payload.artworks;
			});

		builder.addCase(resetSuccessAction.pending, (state, action) => {
			state.isDeleted = false;
			state.isAdded = false;
			state.isUpdated = false;
		});

		builder.addCase(resetErrAction.pending, (state) => {
			state.error = null;
			state.isAdded = false;
		});
	},
});
// Exports
export default artworksSlice.reducer;
