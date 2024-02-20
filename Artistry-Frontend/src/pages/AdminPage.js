// import Footer from '../components/Footer';
// import CommentCard, { comments } from '../components/CommentCard';
// import ArtworksCard from '../components/ArtworksCard';
// import UserHeader from '../components/UserHeader';

// export default function AdminPage() {
// 	// Filter reported artworks
// 	// const reportedArtworks = artworks.filter((artwork) => artwork.report);

// 	// Filter reported comments
// 	const reportedComments = comments.filter((comment) => comment.report);

// 	//get login user from local storage
// 	return (
// 		<>
// 			<UserHeader />

// 			<div className="bg-white mx-auto h-full max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex flex-col sm:flex-row">
// 				<div className="mx-auto  max-w-3xl ">
// 					<div className="m-4">
// 						<h2 className="text-2xl font-bold mb-4 border-gray-300 pb-2">Reported Artworks</h2>
// 						{/* <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
// 							{reportedArtworks.map((artwork, index) => (
// 								<ArtworksCard key={index} artwork={artwork} />
// 							))}
// 						</div> */}
// 					</div>
// 					<hr className="my-8 border-t border-gray-300" />
// 					<div className="m-4">
// 						<h2 className="text-2xl font-bold mb-4  border-gray-300 pb-2">Reported Comments</h2>
// 						{reportedComments.map((comment) => (
// 							<div key={comment.id}>
// 								{/* Display reported comment details */}
// 								<CommentCard comment={comment} />
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 			<Footer />
// 		</>
// 	);
// }
