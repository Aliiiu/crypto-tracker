import { Typography } from '@mui/material';
import HTMLReactParser from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { numberWithCommas } from '../Component/Banner/Carousel';
import CoinInfo from '../Component/CoinInfo/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoCtx } from '../Context/crypto-context';
import './cryptoPage.css';

const CryptoProject = () => {
	const { id } = useParams();
	const [coin, setCoin] = useState();
	const { currency, symbol } = CryptoCtx();

	const fetchCoin = () => {
		fetch(SingleCoin(id), {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				setCoin(data);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchCoin();
	}, []);

	if (!coin) return 'Loading...';
	return (
		<div className='container'>
			<div className='sideBar'>
				<img
					src={coin?.image.large}
					alt={coin?.name}
					height='200'
					style={{ marginBottom: 20 }}
				/>
				<Typography variant='h3' className='header'>
					{coin?.name}
				</Typography>
				<Typography variant='subtitle1' className='description'>
					{HTMLReactParser(coin?.description.en.split('. ')[0])}.
				</Typography>
				<div className='marketData'>
					<span style={{ display: 'flex' }}>
						<Typography variant='h5' className='header'>
							Rank:
						</Typography>{' '}
						&nbsp; &nbsp;{' '}
						<Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>
							{coin?.market_cap_rank}
						</Typography>
					</span>
					<span style={{ display: 'flex' }}>
						<Typography variant='h5' className='header'>
							Current Price:
						</Typography>{' '}
						&nbsp; &nbsp;{' '}
						<Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>
							{symbol}
							{numberWithCommas(
								coin?.market_data.current_price[currency.toLowerCase()]
							)}
						</Typography>
					</span>
					<span style={{ display: 'flex' }}>
						<Typography variant='h5' className='header'>
							Market Cap:
						</Typography>{' '}
						&nbsp; &nbsp;{' '}
						<Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>
							{symbol}
							{numberWithCommas(
								coin?.market_data.market_cap[currency.toLowerCase()]
									.toString()
									.slice(0, -6)
							)}
							M
						</Typography>
					</span>
				</div>
			</div>
			<CoinInfo coin={coin} />
		</div>
	);
};

export default CryptoProject;
