import { useEffect, useState } from 'react';
import baseURL from '../utils/baseURL';
import axios from 'axios';
import ArtworksCard from '../components/ArtworksCard';

function ArtworksGalleryHome() {
	const [artworks, setArtworks] = useState([]);

	useEffect(() => {
		async function fetchAllArtwork() {
			try {
				const response = await axios({
					method: 'GET',
					url: `${baseURL}/artworks`,
				});

				// Access the artworks array from the response
				setArtworks(response.data.artworks);
			} catch (error) {
				console.error(error);
			}
		}

		fetchAllArtwork();
	}, []);

	return (
		<div className="bg-white">
			<div className="bg-white grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
				{Object.values(artworks).map((artwork, index) => (
					<ArtworksCard key={artwork.id} artwork={artwork} />
				))}
			</div>
		</div>
	);
}

export default ArtworksGalleryHome;

