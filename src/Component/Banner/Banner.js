import { Container, Typography } from '@mui/material';
import React from 'react';
import './banner.css';
import Carousel from './Carousel';

const Banner = () => {
	return (
		<div className='banner'>
			<Container className='bannerContent'>
				<div className='tagline'>
					<Typography
						variant='h2'
						style={{
							fontWeight: 'bold',
							marginBottom: 15,
							fontFamily: 'Montserrat',
						}}
					>
						Crypto Hunter
					</Typography>
					<Typography
						variant='subtitle2'
						style={{
							color: 'darkgrey',
							textTransform: 'capitalize',
							fontFamily: 'Montserrat',
						}}
					>
						Get all the info regarding your favorite crypto currency
					</Typography>
				</div>
				<Carousel />
			</Container>
		</div>
	);
};

export default Banner;
