import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../redux/slices/users';
import { useEffect } from 'react';
import { FailedMessage} from '../utils/alert';
import LoadingComp from '../components/LoadingComp';
import { resetErrAction, resetSuccessAction } from '../redux/slices/globalActions/globalActions';

export default function Login() {
	const dispatch = useDispatch();
	const [values, setValues] = useState({});
	const { email, password } = values;

	//get data from redux store
	const { error, loading, userInfo } = useSelector((state) => state?.users?.userAuth);

	const handleInput = (e) => {
		// Dispatch resetErrAction when user modifies input
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(resetErrAction());
		dispatch(resetSuccessAction());
		//bring dispatch passing playload
		dispatch(loginUserAction({ email, password }));
	};

	//redirect user to their own page based on their role
	useEffect(() => {
		if (userInfo?.user && !userInfo?.user?.isAdmin) {
			window.location.href = '/profile';
		} else if (userInfo?.user && userInfo?.user?.isAdmin) {
			window.location.href = '/admin';
		}
	}, [userInfo]);

	return (
		<>
			<Header />
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" method="POST" action="" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="email"
								className=" text-sm font-medium  flex items-center justify-between leading-6 text-gray-900">
								Email address
							</label>
							<div className="mt-2">
								<input
									onChange={handleInput}
									value={email}
									id="email"
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
									Password
								</label>
								<div className="text-sm">
									<Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
										Forgot password?
									</Link>
								</div>
							</div>
							<div className="mt-2">
								<input
									onChange={handleInput}
									value={password}
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-2"
								/>
							</div>
						</div>
						{error && <FailedMessage message={error?.message} />}
						<div>
							{loading ? (
								<LoadingComp />
							) : (
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
									Sign in
								</button>
							)}
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?{' '}
						<Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Register here
						</Link>
					</p>
				</div>
			</div>
			<Footer />
		</>
	);
}