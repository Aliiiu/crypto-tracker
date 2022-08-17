import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config/api';
import { CryptoCtx } from '../../Context/crypto-context';

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Carousel = () => {
	const { currency, symbol } = CryptoCtx();
	const [trending, setTrending] = useState([]);

	const fetchTrendingCoins = () => {
		fetch(TrendingCoins(currency), { method: 'GET' })
			.then((res) => res.json())
			.then((data) => setTrending(data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchTrendingCoins();
	}, [currency]);

	const items = trending.map((coin) => {
		let profit = coin.price_change_percentage_24h >= 0;

		return (
			<Link
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					cursor: 'pointer',
					textTransform: 'uppercase',
					color: 'white',
				}}
				to={`/coins/${coin.id}`}
			>
				<img
					src={coin?.image}
					alt={coin.name}
					height='80'
					style={{ marginBottom: 10 }}
				/>
				<span>
					{coin?.symbol} &nbsp;{' '}
					<span
						style={{
							color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
							fontWeight: 500,
						}}
					>
						{profit && '+'}
						{coin?.price_change_percentage_24h?.toFixed(2)}%{' '}
					</span>
				</span>
				<span style={{ fontSize: 22, fontWeight: 500 }}>
					{symbol}
					{numberWithCommas(coin?.current_price.toFixed(2))}
				</span>
			</Link>
		);
	});

	const responsive = {
		0: {
			items: 2,
		},
		512: {
			items: 4,
		},
	};

	// console.log(trending);
	return (
		<div
			style={{
				height: '50%',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<AliceCarousel
				mouseTracking
				infinite
				autoPlayInterval={1000}
				animationDuration={1500}
				disableDotsControls
				responsive={responsive}
				disableButtonsControls
				autoPlay
				items={items}
			/>
		</div>
	);
};

export default Carousel;
