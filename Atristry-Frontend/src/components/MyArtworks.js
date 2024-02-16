// MyArtworks.js
import React from "react";

function MyArtworks({ artworks, username }) {

  // Filter artworks based on the username
  const userArtworks = artworks
    ? artworks.filter((artwork) => artwork.username === username )
    :null;

  // create an array for the filtered artworks 
  const arrayMyArtworks = userArtworks
    ?userArtworks.map((artwork) => (
      <li key={artwork.title}>
        <h3> {artworks}</h3>
      </li>
    ))
  
    :null;

  return (
    <div>
      <div className="container">
      <h2>{`${username}'s Artworks`}</h2>
      <ul>{arrayMyArtworks}</ul>
      </div>
    </div>
  );
}

export default MyArtworks;


