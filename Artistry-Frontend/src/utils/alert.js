import Swal from 'sweetalert2';
import { resetErrAction, resetSuccessAction } from '../redux/slices/globalActions/globalActions';
import { useDispatch } from 'react-redux';

export const RgisterSuccess = () => {
	const dispatch = useDispatch();

	Swal.fire({
		icon: 'success',
		title: 'Register Success',
		text: 'Please login to continue',
	}).then(() => {
		// After the user closes the error pop-up, reset the error state
		dispatch(resetSuccessAction());
	});
};

export const GlobalSuccessMessage = ({ message }) => {
	const dispatch = useDispatch();

	Swal.fire({
		icon: 'success',
		title: 'Success',
		text: message,
	}).then(() => {
		// After the user closes the error pop-up, reset the error state
		dispatch(resetSuccessAction());
	});
};
export const FailedMessage = ({ message }) => {
	const dispatch = useDispatch();

	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: message,
	}).then(() => {
		// After the user closes the error pop-up, reset the error state
		dispatch(resetErrAction());
	});
};
