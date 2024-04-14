import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ArtworkDetailPage from './pages/ArtworkDetailPage';
import SettingPage from './pages/SettingPage';
import GalleryPage from './pages/GalleryPage';
import AuthorProfile from './components/AuthorProfile';
import AuthRoute from './components/routesProtector/AuthRoute';
import UserHeader from './components/UserHeader';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';

function App() {
	const user = useSelector((state) => state.users.userAuth.userInfo);

	return (
		<div className="App">
			<BrowserRouter>
				{user ? <UserHeader /> : <Header />}

				<Routes>
					<Route exact path="/" element={<LandingPage />} />
					<Route path="/explore" element={<ExplorePage />} />
					<Route
						path="/profile"
						element={
							<AuthRoute>
								<ProfilePage />
							</AuthRoute>
						}
					/>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/settings" element={<SettingPage />} />
					<Route path="/gallery" element={<GalleryPage />} />
					<Route path="/artworks/:id" element={<ArtworkDetailPage />} />
					<Route path="/users/profile/:userId" element={<AuthorProfile />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
