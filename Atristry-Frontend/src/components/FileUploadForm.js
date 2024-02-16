import { useState } from 'react';
import React from 'react';
import { uploadArtworkAction } from '../redux/slices/artworks';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { GlobalSuccessMessage, FailedMessage } from '../utils/alert';
import LoadingCamp from './LoadingComp';

export default function FileUploadForm({ onClose }) {
	//animated components for react-select
	const animatedComponents = makeAnimated();
	const dispatch = useDispatch();

	//genre options
	const genres = [
		'Modern',
		'Impressionist',
		'Contemporary',
		'Surrealist',
		'Pop Art',
		'Cubist',
		'Abstract',
		'Graffiti/Street-Art',
		'Other',
	];

	const genreSelect = genres?.map((genre) => {
		return {
			value: genre,
			label: genre,
		};
	});
	const [genreOption, setGenreOption] = useState('');
	const handleGenreChange = (genre) => {
		setGenreOption(genre.value);
	};

	// medium options

	const mediums = [
		'Oil Painting',
		'Acrylic Painting',
		'Watercolor painting',
		'Ink Drawing',
		'Pencil Drawing',
		'Sculpture',
		'Mixed Media',
		'Photography',
		'Other',
	];

	const mediumSelect = mediums?.map((medium) => {
		return {
			value: medium,
			label: medium,
		};
	});
	const [mediumOption, setMediumOption] = useState('');
	const handleMediumChange = (medium) => {
		setMediumOption(medium.value);
	};

	const [formData, setFormData] = useState({
		description: '',
		genre: '',
		medium: '',
		title: '',
		username: '',
	});

	//upload artwork image
	//file
	const [file, setFile] = useState(null);
	const [fileErr, setFileErr] = useState(null);
	//file handlechange
	const fileHandleChange = (e) => {
		const newFile = e.target.files[0];

		if (file) {
		} else {
			console.log('Please select a file to upload.');
		}
		//validation
		if (newFile?.size > 10000000) {
			setFileErr(`${newFile?.name} is too large`);
		}
		if (!newFile?.type?.startsWith('image/')) {
			setFileErr(`${newFile?.name} is not an image`);
		}

		setFile(newFile);
	};
	//get artwork from store
	const { isAdded, loading, error } = useSelector((state) => state?.artworks);

	//onChange
	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	//handle submit
	const handleSubmit = (e) => {
		e.preventDefault();

		//dispatch
		dispatch(
			uploadArtworkAction({
				title: formData.title,
				description: formData.description,
				file,
				genre: genreOption,
				medium: mediumOption,
				username: formData.username,
			})
		);
		setFormData({
			title: '',
			description: '',
			genre: '',
			file: '',
			medium: '',
		});
	};
	return (
		<>
			<div className="flex items-center justify-center p-18">
				<div className=" mx-auto w-full rounded-lg p-8  bg-white">
					<form onSubmit={handleSubmit} className="py-6 px-9 " action="https://formbold.com/s/FORM_ID" method="POST">
						<div className="mb-6 pt-4">
							<label className="mb-5 block text-2xl font-semibold  text-dark">Upload Artwork</label>
							{error && <FailedMessage message={error?.message} />}
							{fileErr && <FailedMessage message={fileErr} />}
							{isAdded && <GlobalSuccessMessage message="Artwork upload success" />}

							<div className="mb-8">
								<label
									for="file"
									className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
									<div>
										<span className="mb-2 block text-xl font-semibold text-gray-900">Drop files here</span>
										<span className="mb-2 block text-base font-medium text-[#6B7280]">Or</span>
										<input
											onChange={fileHandleChange}
											type="file"
											className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
										/>
									</div>
								</label>
							</div>
						</div>
						<div className="mb-5">
							<label htmlFor="Title" className="flex justify-start text-sm font-medium leading-6 text-gray-900">
								Artwork Title
							</label>
							<input
								value={formData?.title}
								onChange={handleOnChange}
								type="title"
								name="title"
								id="title"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-2 "
								placeholder="Add artwork title"
							/>
						</div>
						<div className="mb-5">
							<label htmlFor="Description" className="flex justify-start text-sm font-medium leading-6 text-gray-900">
								Description
							</label>
							<textarea
								value={formData?.description}
								onChange={handleOnChange}
								type="description"
								name="description"
								id="description"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-2 "
								placeholder="Add Description"
							/>
						</div>

						<div className="mb-5">
							<label htmlFor="genre" className="flex  text-sm font-medium leading-6  justify-start text-gray-900">
								Genre
							</label>
							<Select
								id="genre"
								components={animatedComponents}
								name="genres"
								options={genreSelect}
								isLoading={false}
								isSearchable={true}
								closeMenuOnSelect={true}
								onChange={(e) => handleGenreChange(e)}
							/>
						</div>

						<div className="mb-5">
							<label htmlFor="medium" className="flex justify-start text-sm font-medium leading-6 text-gray-900">
								Medium
							</label>
							<Select
								id="medium"
								components={animatedComponents}
								name="mediums"
								options={mediumSelect}
								isLoading={false}
								isSearchable={true}
								closeMenuOnSelect={true}
								onChange={(e) => handleMediumChange(e)}
							/>
						</div>
						<div className="mt-5">
							{loading ? (
								<LoadingCamp />
							) : (
								<button className="hover:shadow-form w-full rounded-md bg-indigo-600 py-3 px-8 text-center text-base font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
									Upload Artwork
								</button>
							)}
							<button
								onClick={onClose}
								className="hover:shadow-form w-full rounded-md bg-indigo-600 py-3 px-8 mt-3 text-center text-base font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
								Close
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
