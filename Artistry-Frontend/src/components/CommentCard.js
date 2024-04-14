import React from 'react';
import { Link } from 'react-router-dom';
//
export default function CommentCard({ comment }) {
	// Filter comments based on the selected artwork's id
	const avatarImg = comment.user.userAvatarImg;
	const username = comment.user.username;
	const content = comment.content;

	return (
		<div>
			<div key={comment?.id} className="border relative p-3 m-3 rounded-lg flex space-x-4 text-sm text-gray-500 ">
				<div className="flex-none py-10">
					<img src={avatarImg} alt="" className="h-10 w-10  rounded-full bg-gray-100" />
				</div>

				<div className="flex items-start flex-col">
					<h3 className=" font-medium p-3 text-gray-900">
						<Link
							className="text-gray-600 font-semibold text-lg  hover:text-indigo-800 transition duration-300 ease-in-out hover:underline"
							to={`/users/${comment.user?._id}/profile`}>
							{username}
						</Link>
					</h3>
					<div className="prose prose-sm  max-w-none text-left py-2 p-3 text-gray-500">{content}</div>
				</div>
			</div>
		</div>
	);
}
