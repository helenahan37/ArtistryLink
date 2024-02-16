import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserProfileAction } from '../redux/slices/users';
import { useState, useEffect } from 'react';
import UserHeader from './UserHeader';
const navigation = [
	{ name: 'Home', to: '/' },
	{ name: 'Explore', to: '/explore' },
];

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const dispatch = useDispatch();

	//get login user from localstorage
	const user = JSON.parse(localStorage.getItem('userInfo'));

	const isLoggedIn = user?.token ? true : false;

	useEffect(() => {
		dispatch(getUserProfileAction());
	}, [dispatch]);

	return (
		<header className="bg-black">
			{!isLoggedIn ? (
				<nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-1" aria-label="Global">
					<div className="flex items-center gap-x-12">
						<Link to="/" className="-m-1.5 p-1.5">
							<img className="h-7 w-auto" src={logo} alt="logo" />
						</Link>
						<div className="hidden lg:flex lg:gap-x-12">
							{navigation.map((item) => (
								<Link key={item.name} to={item.to} className="text-sm font-semibold leading-6 text-white">
									{item.name}
								</Link>
							))}
						</div>
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5  text-white"
							onClick={() => setMobileMenuOpen(true)}>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="hidden lg:flex">
						<Link to="/login" className="text-sm font-semibold leading-6 text-white">
							Log in <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>{' '}
					<Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
						<div className="fixed inset-0 z-10" />
						<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
							<div className="flex items-center justify-between">
								<Link to="/" className="-m-1.5 p-1.5">
									<span className="sr-only">ArtistConnect</span>
									<img className="h-8 w-auto" src={logo} alt="" />
								</Link>
								<button
									type="button"
									className="-m-2.5 rounded-md p-2.5 text-white"
									onClick={() => setMobileMenuOpen(false)}>
									<span className="sr-only">Close menu</span>
									<XMarkIcon className="h-6 w-6" aria-hidden="true" />
								</button>
							</div>
							<div className="mt-6 flow-root">
								<div className="-my-6 divide-y divide-gray-500/10">
									<div className="space-y-2 py-6">
										{navigation.map((item) => (
											<Link
												key={item.name}
												to={item.to}
												className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800">
												{item.name}
											</Link>
										))}
									</div>
									<div className="py-6">
										<Link
											to="/login"
											className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800">
											Log in
										</Link>
									</div>
								</div>
							</div>
						</Dialog.Panel>
					</Dialog>
				</nav>
			) : (
				<UserHeader />
			)}
		</header>
	);
}
