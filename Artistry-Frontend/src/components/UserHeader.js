import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { signOutAction } from '../redux/slices/users';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileAction, loginUserAction } from '../redux/slices/users';

const navigation = [
	{ name: 'Home', to: '/' },
	{ name: 'Explore', to: '/explore' },
];
const userNavigation = [
	{ name: 'My Profile', to: '/profile' },
	{ name: 'My Gallery', to: '/gallery' },
	{ name: 'Settings', to: '/settings' },
	{ name: 'Sign out', to: '/' },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}
export default function UserHeader() {
	const dispatch = useDispatch();

	// eslint-disable-next-line
	const [isSignOutButtonClicked, setIsSignOutButtonClicked] = useState(false);

	// logout user and remove localstorage user info
	const signOutHandler = (item) => {
		if (item.name === 'Sign out') {
			dispatch(signOutAction());
			setIsSignOutButtonClicked(true);
			window.location.reload();
			window.location.href = '/';
		}
	};

	//get data from store
	const { profile } = useSelector((state) => state?.users);

	useEffect(() => {
		dispatch(loginUserAction());
	}, [dispatch]);
	useEffect(() => {
		dispatch(getUserProfileAction());
	}, [dispatch]);

	return (
		<Disclosure as="nav" className="bg-black">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 justify-between">
							<div className="flex">
								<div className="-ml-2 mr-2 flex items-center md:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
								<Link to="/" className="flex flex-shrink-0 items-center">
									<img className="h-8 w-auto" src={logo} alt="artistconnet" />
								</Link>
								<div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
									{navigation.map((item) => (
										<Link
											key={item.name}
											to={item.to}
											className={classNames(
												item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
												'rounded-md px-3 py-2 text-sm font-medium'
											)}
											aria-current={item.current ? 'page' : undefined}>
											{item.name}
										</Link>
									))}
								</div>
							</div>
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<span className="inline-flex items-center gap-x-1.5 rounded-md  bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-inner">
										{profile?.user?.username}
									</span>
								</div>
								<div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
									{/* Profile dropdown */}
									<Menu as="div" className="relative ml-3">
										<div>
											<Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
												<span className="absolute -inset-1.5" />
												<span className="sr-only">Open user menu</span>
												<img className="h-8 w-8 rounded-full" src={profile?.user?.userAvatarImg} alt="" />
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-200"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95">
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												{userNavigation.map((item) => (
													<Menu.Item key={item.name}>
														{({ active }) => (
															<Link
																to={item.to}
																onClick={() => signOutHandler(item)}
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700'
																)}>
																{item.name}
															</Link>
														)}
													</Menu.Item>
												))}
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="md:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									to={item.to}
									className={classNames(
										item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block rounded-md px-3 py-2 text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
						<div className="flex flex-col justify-items-center border-t border-gray-700 pb-3 pt-4">
							<div className="flex items-center justify-center px-5 sm:px-6">
								<div className="flex-shrink-0">
									<img className="h-10 w-10 rounded-full" src={profile?.user?.userAvatarImg} alt="" />
								</div>
								<div className="ml-3">
									<div className="text-base font-medium text-white">{profile?.user?.username}</div>
									<div className="text-sm font-medium text-gray-400">{profile?.user?.email}</div>
								</div>
							</div>
							<div className="mt-3 space-y-1 px-2 sm:px-3">
								{userNavigation.map((item) => (
									<Link
										key={item.name}
										to={item.to}
										onClick={() => signOutHandler(item)}
										className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
										{item.name}
									</Link>
								))}
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
