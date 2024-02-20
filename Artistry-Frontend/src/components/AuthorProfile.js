import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorProfileAction } from '../redux/slices/users';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import ArtworksCard from '../components/ArtworksCard';

const UserProfilePage = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAuthorProfileAction(userId));
	}, [userId, dispatch]);

	const { authorProfile } = useSelector((state) => state?.users);

	//get data from store
	const artworks = authorProfile?.user?.artworks || [];

	return (
		<>
			<Header />

			<div className="relative block h-500-px">
				<div>
					<img
						src="https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80"
						alt="bg-ground"
					/>
				</div>

				<div className="relative flex justify-center items-center flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
					<span className="relative flex justify-center -mt-14">
						<img className="h-32 w-32 rounded-full" src={authorProfile?.user?.userAvatarImg} alt="" />
						<span className="absolute bottom-0 right-0 block h-7 w-7 rounded-full bg-green-400 ring-2 ring-white">
							<CheckBadgeIcon />
						</span>
					</span>

					<div className="px-6">
						<div className="flex flex-wrap justify-center">
							<div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
						</div>
						<div className="text-center mt-5">
							<h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
								{authorProfile?.user?.username}
							</h3>

							<div className="text-blueGray-600 mt-1">
								<i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
								{authorProfile?.user?.email}
							</div>
						</div>
						<div className="mt-10 py-10 border-t border-blueGray-200 text-center">
							<div className="flex flex-wrap justify-center">
								<div className="w-full lg:w-9/12 px-4">
									<p className="mb-4 text-lg leading-relaxed text-blueGray-700">{authorProfile?.user?.bio}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<div className="bg-white grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{artworks.map((artwork, index) => (
						<ArtworksCard key={index} artwork={artwork} />
					))}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default UserProfilePage;
