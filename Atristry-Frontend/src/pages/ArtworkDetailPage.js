import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BsHeartFill, BsChatSquareHeart, BsChatSquareHeartFill } from 'react-icons/bs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePopup } from '../hooks/usePopup';
import CommentPopup from '../components/CommentPopup';
import CommentCard from '../components/CommentCard';
import axios from 'axios';
import { useState } from 'react';
import baseURL from '../utils/baseURL';
import { useSelector } from 'react-redux';
import { fetchCommentsByArtworkId } from '../redux/slices/comments';
import { useDispatch } from 'react-redux';
import { IoArrowBackOutline } from 'react-icons/io5';

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

	const handleXClick = function () {
		navigate(-1);
	};

	return (
		<>
			{' '}
			<Header />
			<div className="bg-white mx-auto max-w-2xl px-4 py-16 lg:max-w-7xl lg:px-8 flex flex-col justify-between items-center">
				{/* description div */}
				<div className="flex flex-col relative w-full lg:w-1/2 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
					<div className="relative">
						<img src={selectedArtwork.artworkImg} alt={''} className="h-auto w-full object-cover rounded-lg" />
						{/* X Icon */}
						<button className="absolute top-0 right-0 mt-2 mr-6" onClick={handleXClick}>
							<IoArrowBackOutline className="w-8 h-8 text-gray-500" />
						</button>

						{/* Heart Icon */}
						<button
							className="absolute bottom-0 right-0 mb-2 mr-12 flex items-center space-x-1 text-white hover:text-pink-600 focus:outline-none"
							onClick={handleFavoriteClick}>
							{isFavorited ? (
								<BsHeartFill className="w-6 h-6 text-pink-600" />
							) : (
								<BsHeartFill className="w-6 h-6 hover:text-pink-600" />
							)}
						</button>

						{/* Comment Icon */}
						<button
							onClick={openPopup}
							className="absolute bottom-0 right-0 mb-2 mr-2 flex items-center space-x-1 text-white hover:text-indigo-600 focus:outline-none">
							{/* <Link to={`/comments/${id}`}> */}
							<BsChatSquareHeartFill className="w-6 h-6" />
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
					<div>
						<button
							onClick={openPopup}
							className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-large font-medium text-gray-900 hover:bg-indigo-500 hover:text-white sm:w-auto lg:w-full">
							Write a comment
						</button>
					</div>
				</div>
				{/* comment div */}
				{/* <div className=" w-full   p-8 mt-8 sm:mt-0  "> */}
				<div className="w-full lg:w-1/2 px-4 py-10 lg:px-8 lg:py-6 overflow-y-auto" style={{ maxHeight: '50vh' }}>
					{comments && comments.length > 0 ? (
						comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)
					) : (
						<div className="flex flex-col items-center justify-center p-10">
							<BsChatSquareHeart className="w-12 h-12 text-gray-400" /> {/* 示例图标 */}
							<p className="mt-2 text-lg font-semibold text-gray-600">No comments yet</p>
							<p className="text-sm text-gray-500">Be the first to share what you think!</p>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
}
