import Footer from '../components/Footer';
import UserHeader from '../components/UserHeader';
import { useEffect, useState } from 'react';
import { getUserProfileAction, updateUserProfileAction } from '../redux/slices/users';
import { useDispatch, useSelector } from 'react-redux';
import { FailedMessage, GlobalSuccessMessage } from '../utils/alert';
import LoadingComp from '../components/LoadingComp';

export default function SettingPage() {
	//dispatch
	const dispatch = useDispatch();
	//get user profile from
	useEffect(() => {
		dispatch(getUserProfileAction());
	}, [dispatch]);
	//get data from store
	const { isUpdated, error, loading, profile } = useSelector((state) => state?.users);
	//get orders

	const [formData, setFormData] = useState({
		username: profile?.user?.username,
		email: profile?.user?.email,
		bio: profile?.user?.bio,
		password: '',
	});

	//onChange Handeler
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	//file upload

	const [file, setFile] = useState(null);
	const [fileErr, setFileErr] = useState(null);
	//file handlechange
	const fileHandleChange = (e) => {
		const newFile = e.target.files[0];
		//validation
		if (newFile?.size > 10000000) {
			setFileErr(`${newFile?.name} is too large`);
		}
		if (!newFile?.type?.startsWith('image/')) {
			setFileErr(`${newFile?.name} is not an image`);
		}
		setFile(newFile);
		// Update only if a new image is selected
		if (!newFile) {
			setFormData({ ...formData });
		} else {
			setFormData({ ...formData, file: newFile });
		}
	};
	//submit Handeler
	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(
			updateUserProfileAction({
				...formData,
				file,
			})
		);
	};

	return (
		<>
			<UserHeader />
			{error && <FailedMessage message={error?.message} />}
			<div className="flex justify-center items-center">
				<div className="divide-y divide-dark/5">
					<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
						<div>
							<h2 className="text-base font-semibold leading-7 text-dark">Personal Information</h2>
							<p className="mt-1 text-sm leading-6 text-gray-400">
								Use a permanent address where you can receive mail.
							</p>
						</div>
						{isUpdated && <GlobalSuccessMessage message="Profile update success" />}

						<form onSubmit={onSubmit} className="md:col-span-2">
							<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
								<div className="col-span-full flex items-center gap-x-8">
									<img
										src={formData.userAvatarImg || profile?.user?.userAvatarImg}
										name="userAvatarImg"
										alt="user avatar"
										className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
									/>
									<div>
										<input onChange={fileHandleChange} name="userAvatarImg" type="file" id="file" className="sr-only" />
										<label htmlFor="file">
											<span
												type="button"
												disabled={fileErr?.length > 0}
												className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold hover:bg-indigo-400 text-white shadow-sm">
												Change Avatar
											</span>
										</label>

										<p className="mt-2 text-xs leading-5 text-gray-400">JPG, JPEG, or PNG. 1MB max.</p>
									</div>
								</div>

								<div className="col-span-full">
									<label htmlFor="username" className="block text-sm font-medium leading-6 text-dark">
										Username
									</label>
									<div className="mt-2">
										<div className="flex rounded-md bg-dark/5 ring-1 ring-inset ring-dark/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
											<input
												onChange={onChange}
												value={formData.username}
												type="text"
												name="username"
												id="username"
												autoComplete="username"
												className=" indent-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-dark focus:ring-0 sm:text-sm sm:leading-6"
												placeholder="tom cook"
											/>
										</div>
									</div>
								</div>

								<div className="col-span-full">
									<label htmlFor="email" className="block text-sm font-medium leading-6 text-dark">
										Email Address
									</label>
									<div className="mt-2">
										<input
											onChange={onChange}
											value={formData.email}
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											className=" indent-2 block w-full rounded-md border-0 bg-dark/5 py-1.5 text-dark shadow-sm ring-1 ring-inset ring-dark/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>
						</form>
					</div>

					<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
						<div>
							<h2 className="text-base font-semibold leading-7 text-dark">Bio</h2>
							<p className="mt-1 text-sm leading-6 text-gray-400">Write a few sentences about yourself.</p>
						</div>
						<form onSubmit={onSubmit} className="md:col-span-2 ">
							<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
								<div className="col-span-full">
									<label htmlFor="about" className="block text-sm font-medium leading-6 text-dark">
										About
									</label>
									<div className="mt-2">
										<textarea
											onChange={onChange}
											value={formData.bio}
											id="about"
											name="bio"
											rows={3}
											className=" indent-2 block w-full rounded-md border-0 bg-dark/5 py-1.5 text-dark shadow-sm ring-1 ring-inset ring-dark/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>
						</form>
					</div>

					<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
						<div>
							<h2 className="text-base font-semibold leading-7 text-dark">Change Password</h2>
							<p className="mt-1 text-sm leading-6 text-gray-400">Update the password associated with your account.</p>
						</div>

						<form onSubmit={onSubmit} className="md:col-span-2">
							<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
								<div className="col-span-full">
									<label htmlFor="new-password" className="block text-sm font-medium leading-6 text-dark">
										New Password
									</label>
									<div className="mt-2">
										<input
											onChange={onChange}
											value={formData.password}
											id="new-password"
											name="password"
											type="password"
											autoComplete="new-password"
											className="  indent-2 block w-full rounded-md border-0 bg-dark/5 py-1.5 text-dark shadow-sm ring-1 ring-inset ring-dark/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>

							<div className="mt-8 flex">
								{loading ? (
									<LoadingComp />
								) : (
									<button
										type="submit"
										className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
										Save
									</button>
								)}
							</div>
						</form>
					</div>

					<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
						<div>
							<h2 className="text-base font-semibold leading-7 text-dark">Delete Account</h2>
							<p className="mt-1 text-sm leading-6 text-gray-400">
								No longer want to use our service? You can delete your account here. This action is not reversible. All
								information related to this account will be deleted permanently.
							</p>
						</div>

						<form className="flex items-start md:col-span-2">
							<button
								type="submit"
								className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400">
								Yes, delete my account
							</button>
						</form>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}
