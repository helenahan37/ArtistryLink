import CommentPopup from './CommentPopup';

import { Link } from 'react-router-dom';
import { usePopup } from '../hooks/usePopup';
import baseURL from '../utils/baseURL';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { BsHeartFill, BsChatSquareHeartFill } from 'react-icons/bs';

export default function ArtworksCard({ artwork }) {
	const { showPopup, openPopup, closePopup } = usePopup();
	const userToken = useSelector((state) => state.users?.userAuth?.userInfo?.token);

	const { artworkImg, title, description, id } = artwork;
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

	return (
		<div key={id} className="group relative mb-4">
			<div className="relative">
				<img src={artworkImg} alt={title} className="w-full h-auto object-cover rounded-lg" />

				<div className="absolute bottom-0 right-0 mb-4 mr-4 flex space-x-2">
					<button onClick={handleFavoriteClick} className="text-white hover:text-pink-600 focus:outline-none">
						{isFavorited ? (
							<BsHeartFill className="w-6 h-6 text-pink-600" />
						) : (
							<BsHeartFill className="w-6 h-6 hover:text-pink-600" />
						)}
					</button>
					<button onClick={openPopup} className="text-white hover:text-indigo-600 focus:outline-none">
						<BsChatSquareHeartFill className="w-6 h-6" />
					</button>
				</div>

				{showPopup && <CommentPopup onClose={closePopup} artworkID={id} />}
			</div>

			<div className="bg-white bg-opacity-80 py-4 px-4 flex justify-between">
				<div>
					<Link to={`/artworks/${id}`}>
						<h3 className="text-lg hover:underline font-semibold">{title}</h3>
					</Link>
					<p className="text-sm text-gray-500">{artwork.username}</p>
					<p className="text-sm text-gray-600">{description}</p>
				</div>
			</div>
		</div>
	);
}
