import React from 'react';
import ReactLoading from 'react-loading';

const LoadingComp = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<ReactLoading type="spinningBubbles" color="blue" />
		</div>
	);
};

export default LoadingComp;
