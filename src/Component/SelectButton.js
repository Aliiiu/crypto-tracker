import React from 'react';
import './selectbutton.css';

const SelectButton = ({ children, onClick, selected }) => {
	return (
		<span
			style={{
				backgroundColor: selected ? 'gold' : '',
				color: selected ? 'black' : '',
				fontWeight: selected ? 700 : 500,
			}}
			onClick={onClick}
			className='selectbutton'
		>
			{children}
		</span>
	);
};

export default SelectButton;
