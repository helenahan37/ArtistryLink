import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAction } from '../redux/slices/users';
import React, { useEffect, useState } from 'react';
import LoadingComp from '../components/LoadingComp';
import { FailedMessage } from '../utils/alert';
import { resetSuccessAction } from '../redux/slices/globalActions/globalActions';

export default function Register() {
	//dispatch
	const dispatch = useDispatch();
	const [values, setValues] = useState({
		email: '',
		password: '',
		username: '',
	});
	const { email, password, username } = values;
	const handleInput = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(resetSuccessAction());

		//bring dispatch passing playload
		dispatch(registerUserAction({ email, password, username }));
	};
	//select store data
	const { user, error, loading } = useSelector((state) => state?.users);
	//redirect
	useEffect(() => {
		if (user) {
			window.location.href = '/login';
		}
	}, [user]);

	return (
		<>
			<Header />
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Create Your Account
					</h2>
				</div>
				{/* errr */}
				{error && <FailedMessage message={error?.message} />}
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="email"
								className=" text-sm font-medium  flex items-center justify-between leading-6 text-gray-900">
								Your Email
							</label>
							<div className="mt-2">
								<input
									onChange={handleInput}
									id="email"
									value={email}
									name="email"
									type="email"
									autoComplete="email"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-2 "
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
									Your Username
								</label>
							</div>

							<div className="mt-2">
								<input
									onChange={handleInput}
									id="username"
									value={username}
									type="username"
									name="username"
									autoComplete="current-username"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-2"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
									Password
								</label>
							</div>

							<div className="mt-2">
								<input
									onChange={handleInput}
									id="password"
									value={password}
									type="password"
									name="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-2"
								/>
							</div>
						</div>

						{/* errr */}
						<div>
							{loading ? (
								<LoadingComp />
							) : (
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
									Create Account
								</button>
							)}
						</div>
					</form>

					<div className="flex font-semibold leading-6 items-start mt-8 mb-3">
						<div className="flex items-center h-5">
							<input
								id="terms"
								aria-describedby="terms"
								type="checkbox"
								className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
								required=""
							/>
						</div>
						<div className=" font-semibold leading-6 ml-3 text-sm ">
							<label for="terms" className="text-sm text-gray-500 dark:text-gray-300 mt-3">
								I accept the{' '}
								<Link class="font-medium text-primary-600 hover:underline dark:text-primary-500" to="#">
									Terms and Conditions
								</Link>
							</label>
						</div>
					</div>
					<div className=" flex items-start ">
						<p className="text-sm  text-gray-500 ">
							Already have an account?{' '}
							<Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
								Login here
							</Link>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
