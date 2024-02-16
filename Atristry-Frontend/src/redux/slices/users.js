import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { resetErrAction, resetSuccessAction } from './globalActions/globalActions';

const initialState = {
	loading: false,
	error: null,
	users: [],
	user: null,
	profile: {},
	authorProfile: {},
	userAuth: {
		loading: false,
		error: null,
		userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
	},
};

//login user Action
export const loginUserAction = createAsyncThunk(
	'users/login',
	async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
		try {
			//make the http request
			const { data } = await axios.post(`${baseURL}/users/login`, {
				email,
				password,
			});
			//save the user into localstorage
			localStorage.setItem('userInfo', JSON.stringify(data));
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error?.response?.data);
		}
	}
);
//register action
export const registerUserAction = createAsyncThunk(
	'users/register',
	async ({ email, password, username }, { rejectWithValue, getState, dispatch }) => {
		try {
			//make the http request
			const { data } = await axios.post(`${baseURL}/users/register`, {
				email,
				password,
				username,
			});
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error?.response?.data);
		}
	}
);

//sign out action
export const signOutAction = createAsyncThunk(
	'users/logout',
	async (payload, { rejectWithValue, getState, dispatch }) => {
		//get token
		localStorage.removeItem('userInfo');
		return true;
	}
);

//get looged in user profile action
export const getUserProfileAction = createAsyncThunk(
	'users/fetchloggedinProfile',
	async (playload, { rejectWithValue, getState, dispatch }) => {
		try {
			//get token
			const token = getState()?.users?.userAuth?.userInfo?.token;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.get(`${baseURL}/users/profile`, config);
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error?.response?.data);
		}
	}
);

//get userid profile action
export const getAuthorProfileAction = createAsyncThunk(
	'users/fetchAuthorProfile',
	async (authorId, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${baseURL}/users/${authorId}/profile`);
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error?.response?.data);
		}
	}
);

//update user profile action
export const updateUserProfileAction = createAsyncThunk(
	'users/updateProfile',
	async ({ username, email, password, bio, file }, { rejectWithValue, getState, dispatch }) => {
		try {
			//get loginuser token
			const token = getState()?.users?.userAuth?.userInfo?.token;
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			};
			const formData = new FormData();
			formData.append('username', username);
			formData.append('email', email);
			formData.append('password', password);
			formData.append('bio', bio);
			formData.append('file', file);
			const { data } = await axios.patch(`${baseURL}/users/settings`, formData, config);
			return data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error?.response?.data);
		}
	}
);
//users slice
const usersSlice = createSlice({
	name: 'users',
	initialState,
	extraReducers: (builder) => {
		//login actions
		// 3 states: pending, fulfilled, rejected
		builder.addCase(loginUserAction.pending, (state, action) => {
			state.userAuth.loading = true;
		});
		builder.addCase(loginUserAction.fulfilled, (state, action) => {
			state.userAuth.userInfo = action.payload;
			state.userAuth.loading = false;
		});
		builder.addCase(loginUserAction.rejected, (state, action) => {
			state.userAuth.error = action.payload;
			state.userAuth.loading = false;
		});
		//register actions
		builder.addCase(registerUserAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(registerUserAction.fulfilled, (state, action) => {
			state.user = action.payload;
			state.loading = false;
		});
		builder.addCase(registerUserAction.rejected, (state, action) => {
			state.error = action.payload;
			state.loading = false;
		});
		//reset error action

		//logout
		builder.addCase(signOutAction.fulfilled, (state, action) => {
			state.userAuth.userInfo = null;
			state.token = null;
			state.profile = {};
			state.error = null;
		});

		//profile
		builder.addCase(getUserProfileAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
			state.profile = action.payload;
			state.loading = false;
		});
		builder.addCase(getUserProfileAction.rejected, (state, action) => {
			state.error = null;
			state.loading = false;
		});

		//profile
		builder.addCase(getAuthorProfileAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getAuthorProfileAction.fulfilled, (state, action) => {
			state.authorProfile = action.payload;
			state.loading = false;
		});
		builder.addCase(getAuthorProfileAction.rejected, (state, action) => {
			state.error = action.payload;
			state.loading = false;
		});

		//update profile
		builder.addCase(updateUserProfileAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(updateUserProfileAction.fulfilled, (state, action) => {
			state.profile = action.payload;
			state.loading = false;
			state.isUpdated = true;
		});
		builder.addCase(updateUserProfileAction.rejected, (state, action) => {
			state.profile = null;
			state.loading = false;
			state.isUpdated = false;
			state.error = action.payload;
		});

		//Reset success
		builder.addCase(resetSuccessAction.pending, (state, action) => {
			state.isAdded = false;
			state.isUpdated = false;
		});

		builder.addCase(resetErrAction.pending, (state) => {
			state.error = null;
			state.userAuth.error = null;
		});
	},
});

//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
