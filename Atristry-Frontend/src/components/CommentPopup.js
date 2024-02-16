import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { XCircleIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { createCommentAction } from '../redux/slices/comments';
import { GlobalSuccessMessage, FailedMessage } from '../utils/alert';
import LoadingComp from './LoadingComp';
export default function CommentPopup({ onClose, artworkID }) {
	const dispatch = useDispatch();
	//---form data---
	const [formData, setFormData] = useState({
		content: '',
		id: artworkID,
	});

	//onChange
	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		dispatch(createCommentAction({ content: formData.content, id: artworkID }));
	};

	const { loading, error, isAdded } = useSelector((state) => state?.comments);
	const { profile } = useSelector((state) => state?.users);
	return (
		<>
			{error && <FailedMessage message={error?.message} />}
			{isAdded && <GlobalSuccessMessage message="Thanks for your comment" />}
			<div className="fixed bg-cover bg-center top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-md">
				<div className="relative transform  overflow-hidden rounded-lg bg-white text-left shadow-xl md:max-w-lg lg:max-w-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
					<div className="flex w-full h-full space-x-2 ">
						<div>
							<img className="inline-block m-2 h-12 w-12 rounded-full" src={profile?.user?.userAvatarImg} alt="" />
						</div>
						<div className="w-full">
							<form onSubmit={handleOnSubmit} action="submit" className="relative">
								<div className="overflow-hidden rounded-lg shadow-sm ring-2 ring-inset focus-within:ring-indigo-900 ">
									<label htmlFor="comment" className="sr-only ">
										Add your comment
									</label>
									<textarea
										onChange={handleOnChange}
										value={formData.content}
										rows={12}
										name="content"
										className="block w-full resize-none border-0 py-4 text-large bg-transparent placeholder:text-gray-800 focus:ring-0 sm:text-sm sm:leading-6 indent-2"
										placeholder="Add your comment..."
									/>

									{/* Spacer element to match the height of the toolbar */}
									<div className="py-3" aria-hidden="true">
										{/* Matches height of button in toolbar (1px border + 36px content height) */}
										<div className="py-px">
											<div className="h-9" />
										</div>
									</div>
								</div>

								<div className="absolute inset-x-0 bottom-0 flex justify-end pl-2 py-2 pr-2 space-x-5">
									<div className="flex items-center space-x-5">
										<div className="flex items-center">
											{/* close button */}
											<button
												onClick={onClose}
												type="button"
												className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
												<XCircleIcon className="w-6 h-6 " />
											</button>
										</div>
									</div>

									{/* sendButton */}
									<div>
										{loading ? (
											<LoadingComp />
										) : (
											<button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
												<PaperAirplaneIcon className="w-6 h-6 " />
											</button>
										)}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
