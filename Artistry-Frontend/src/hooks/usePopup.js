import { useState } from 'react';

export const usePopup = () => {
	const [showPopup, setShowPopup] = useState(false);

	const openPopup = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	return { showPopup, openPopup, closePopup };
};
