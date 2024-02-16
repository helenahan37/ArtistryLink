import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
	ChatBubbleOvalLeftEllipsisIcon,
	ExclamationTriangleIcon,
	ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePopup } from '../hooks/usePopup';
import CommentPopup from '../components/CommentPopup';
import CommentCard from '../components/CommentCard';
import axios from 'axios';
import { useState } from 'react';
import baseURL from '../utils/baseURL';
import { useSelector } from 'react-redux';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { fetchCommentsByArtworkId } from '../redux/slices/comments';
import { useDispatch } from 'react-redux';

export default function ArtworkDetailPage({ artwork }) {
	const dispatch = useDispatch();

	const { showPopup, openPopup, closePopup } = usePopup();
	const navigate = useNavigate();
	const [selectedArtwork, setSelectedArtwork] = useState('');
	const { id } = useParams();

	//fetch artwork by id
	useEffect(() => {
		async function fetchArtworkById() {
			try {
				const response = await axios({
					method: 'GET',
					url: `${baseURL}/artworks/${id}`,
				});

				// Update this line to set the artworks array from the response
				setSelectedArtwork(response.data.artwork);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}
		}

		fetchArtworkById();
	}, [id]);

	//fetch comments by artwork id
	useEffect(() => {
		dispatch(fetchCommentsByArtworkId({ id }));
	}, [id, dispatch]);

	const comments = useSelector((state) => state.comments.comments);
	console.log('comments', comments);

	const userToken = useSelector((state) => state.users?.userAuth?.userInfo?.token);
	const [isFavorited, setIsFavorited] = useState(false);
	const [isReported, setIsReported] = useState(false);

	useEffect(() => {
		const storedFavoritedArtworks = JSON.parse(localStorage.getItem('favoritedArtworks')) || {};
		setIsFavorited(storedFavoritedArtworks[id] || false);
	}, [id]);

	const handleFavoriteClick = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${userToken}`,
				'Content-Type': 'multipart/form-data',
			},
		};

		try {
			if (isFavorited) {
				await axios.delete(`${baseURL}/artworks/${id}/favorite`, config);
			} else {
				await axios.post(`${baseURL}/artworks/${id}/favorite`, {}, config);
			}

			const updatedFavoritedArtworks = {
				...(JSON.parse(localStorage.getItem('favoritedArtworks')) || {}),
				[id]: !isFavorited,
			};
			localStorage.setItem('favoritedArtworks', JSON.stringify(updatedFavoritedArtworks));

			setIsFavorited(!isFavorited);
		} catch (error) {
			console.error(error);
			console.error('Response:', error.response);
		}
	};

	const handleReportClick = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${userToken}`,
					'Content-Type': 'application/json',
				},
			};

			const payload = {
				artworkId: id,
			};

			await axios.post(`${baseURL}/artworks/${id}/report`, payload, config);
			setIsReported(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleXClick = function () {
		navigate(-1);
	};

	return (
		<>
			{' '}
			<Header />
			<div className="bg-white mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex flex-col sm:flex-row justify-between items-center">
				{/* description div */}
				<div className="flex flex-col relative w-full lg:w-1/2 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
					<div className="relative">
						<img src={selectedArtwork.artworkImg} alt={''} className="h-3/4 object-cover rounded-lg" />
						{/* X Icon */}
						<button className="absolute top-0 right-0 mt-2 mr-10" onClick={handleXClick}>
							<ArrowUturnLeftIcon className="w-6 h-6 text-gray-500" />
						</button>
						{/* Exclamation Icon */}
						<button className="absolute top-0 right-0 mt-2 mr-2" onClick={handleReportClick}>
							{isReported ? (
								<ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
							) : (
								<ExclamationTriangleIcon className="w-6 h-6 text-gray-500 hover:text-yellow-500" />
							)}
						</button>

						{/* Heart Icon */}
						<button
							className="absolute bottom-0 right-0 mb-2 mr-12 flex items-center space-x-1 text-gray-600 hover:text-pink-600 focus:outline-none"
							onClick={handleFavoriteClick}>
							{isFavorited ? (
								<IoHeart className="w-6 h-6 text-pink-600" />
							) : (
								<IoHeartOutline className="w-6 h-6 hover:text-pink-600" />
							)}
						</button>

						{/* Comment Icon */}
						<button
							onClick={openPopup}
							className="absolute bottom-0 right-0 mb-2 mr-2 flex items-center space-x-1 text-gray-600 hover:text-indigo-600 focus:outline-none">
							{/* <Link to={`/comments/${id}`}> */}
							<ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
							{/* </Link> */}
						</button>
						{showPopup && <CommentPopup onClose={closePopup} artworkID={id} />}
					</div>
					<div className="border border-gray-300 rounded-lg mt-3">
						<div className="px-4 py-3">
							<h3 className="text-2xl font-semibold">Title: {selectedArtwork.title}</h3>
							<p className="text-sm text-gray-500">
								<Link
									className="text-gray-600 font-semibold text-lg  hover:text-indigo-800 transition duration-300 ease-in-out hover:underline"
									to={`/users/${selectedArtwork.user?._id}/profile`}>
									Author:{selectedArtwork.user?.username}
								</Link>
							</p>
						</div>
					</div>

					<div className="border border-gray-300 rounded-lg mt-3">
						<div className="px-4 py-3 text-gray-600">Description: {selectedArtwork.description}</div>
					</div>
					<div className="border border-gray-300 rounded-lg mt-3">
						<div className="px-4 py-3 text-gray-600">
							<p>
								<strong>Genre:</strong> {selectedArtwork.genre}
							</p>
							<p>
								<strong>Medium:</strong> {selectedArtwork.medium}
							</p>
						</div>
					</div>
				</div>
				{/* comment div */}
				{/* <div className=" w-full   p-8 mt-8 sm:mt-0  "> */}
				<div className="w-full lg:w-1/2  sm:px-6 lg:px-8 xl:block overflow-y-auto" style={{ maxHeight: '50vh' }}>
					{comments && comments.length > 0 ? (
						comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)
					) : (
						<p>No comments yet.</p>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
}
