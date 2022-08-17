import React, { useState, useEffect } from 'react';
import { HistoricalChart } from '../../config/api';
import { CryptoCtx } from '../../Context/crypto-context';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { chartDays } from '../../config/dummy-data';
import SelectButton from '../SelectButton';
import './coininfo.css';

Chart.register(...registerables);
const CoinInfo = ({ coin }) => {
	const [historicData, setHistoricData] = useState();
	const [days, setDays] = useState();

	const { currency } = CryptoCtx();

	const fetchHistoricalData = async () => {
		// const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
		fetch(HistoricalChart(coin.id, days, currency))
			.then((res) => res.json())
			.then((data) => setHistoricData(data.prices));
		// setHistoricData(data.prices);
	};

	useEffect(() => {
		fetchHistoricalData();
	}, [currency, days]);

	const darkTheme = createTheme({
		palette: {
			primary: {
				main: '#fff',
			},
			mode: 'dark',
		},
	});

	const labels =
		historicData &&
		historicData.map((coin) => {
			let date = new Date(coin[0]);
			let time =
				date.getHours() > 12
					? `${date.getHours() - 12}:${date.getMinutes()} PM`
					: `${date.getHours()}:${date.getMinutes()} AM`;

			return days === 1 ? time : date.toLocaleDateString();
		});

	const data = {
		labels,
		datasets: [
			{
				data: historicData?.map((coin) => coin[1]),
				label: `Price ( Past ${days} Days ) in ${currency}`,
				borderColor: '#eebc1d',
			},
		],
	};

	const options = {
		elements: {
			point: {
				radius: 1,
			},
		},
	};
	return (
		<ThemeProvider theme={darkTheme}>
			<div className='coin-container'>
				{!historicData ? (
					<CircularProgress
						style={{ color: 'gold' }}
						size={250}
						thickness={2}
					/>
				) : (
					<>
						<Line data={data} options={options} />
						<div
							style={{
								display: 'flex',
								marginTop: 20,
								justifyContent: 'space-around',
								width: '100%',
							}}
						>
							{chartDays.map((day) => (
								<SelectButton
									key={day.value}
									selected={day.value === days}
									onClick={() => setDays(day.value)}
								>
									{day.label}
								</SelectButton>
							))}
						</div>
					</>
				)}
			</div>
		</ThemeProvider>
	);
};

export default CoinInfo;
