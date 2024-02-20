// ArtworksGallery.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../utils/baseURL';
import ArtworksCard from './ArtworksCard';
import SearchBar from './SearchBar';

function ArtworksGalleryExplore() {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);

  useEffect(() => {
    async function fetchAllArtwork() {
      try {
        const response = await axios({
          method: 'GET',
          url: `${baseURL}/artworks`,
        });

        // Access the artworks array from the response
        const allArtworks = response.data.artworks;
        setArtworks(allArtworks);
        setFilteredArtworks(allArtworks); // Initialize filteredArtworks with all artworks 
		
      } catch (error) {
        console.error(error);
      }
    }

    fetchAllArtwork();
  }, []);

  const handleSearch = (searchValue) => {
    // If there is a search value, filter artworks; otherwise, display all artworks
    if (searchValue.trim() !== '') {
      const filtered = artworks.filter((artwork) =>
        artwork.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredArtworks(filtered);
    } else {
      setFilteredArtworks(artworks);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="bg-white">
        <div className="bg-white grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {Object.values(filteredArtworks).map((artwork, index) => (
            <ArtworksCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtworksGalleryExplore;