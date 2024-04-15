import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { resetErrAction, resetSuccessAction } from './globalActions/globalActions';

//initial state
const initialState = {
	loading: false,
	error: null,
	artworks: [],
	artwork: {},
	isUploaded: false,
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
				state.isUploaded = false;
			})
			.addCase(uploadArtworkAction.fulfilled, (state, action) => {
				state.loading = false;
				state.artwork = action.payload;
				state.isUploaded = true;
				state.error = null;
			})
			.addCase(uploadArtworkAction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.isUploaded = false;
			});

		builder.addCase(resetSuccessAction.pending, (state) => {
			state.isDeleted = false;
			state.isUpdated = false;
			state.isUploaded = false;
		});

		builder.addCase(resetErrAction.pending, (state) => {
			state.error = null;
			state.isUploaded = false;
		});
	},
});

// Exports
export default artworksSlice.reducer;
