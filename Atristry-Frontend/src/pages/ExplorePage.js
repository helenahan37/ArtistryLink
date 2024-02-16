import Header from '../components/Header';
import Footer from '../components/Footer';
import ArtworksGalleryExplore from '../components/ArtworksGalleryExplore';

export default function ExplorePage() {
	return (
		<div className="bg-white">
			{/* Header */}
			<Header />
			<main>
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<ArtworksGalleryExplore />
				</div>
			</main>
			{/* Footer */}
			<Footer />
		</div>
	);
}
