import {
	ThemeProvider,
	createTheme,
	Container,
	Typography,
	TextField,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Pagination,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../../config/api';
import { CryptoCtx } from '../../Context/crypto-context';
import { numberWithCommas } from '../Banner/Carousel';

const CoinsTable = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const { currency, symbol } = CryptoCtx();
	const history = useNavigate();

	const fetchCoins = () => {
		setLoading(true);
		fetch(CoinList(currency), {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((data) => {
				setCoins(data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchCoins();
	}, [currency]);

	// console.log(coins);

	const darkTheme = createTheme({
		palette: {
			primary: {
				main: '#fff',
			},
			mode: 'dark',
		},
	});

	const handleSearch = () => {
		return coins.filter(
			(coin) =>
				coin.name.toLowerCase().includes(search) ||
				coin.symbol.toLowerCase().includes(search)
		);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<Container style={{ textAlign: 'center' }}>
				<Typography
					variant='h4'
					style={{ margin: 18, fontFamily: 'Montserrat' }}
				>
					Cryptocurrency Prices By Market Cap
				</Typography>
				<TextField
					label='Search your cryto coin'
					variant='outlined'
					onChange={(e) => setSearch(e.target.value)}
					style={{ marginBottom: 20, width: '100%' }}
				/>
				<TableContainer>
					{loading ? (
						'Loading....'
					) : (
						<Table>
							<TableHead style={{ backgroundColor: '#EEBC1D' }}>
								<TableRow>
									{['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
										<TableCell
											key={head}
											align={head === 'Coin' ? '' : 'right'}
											style={{
												color: 'black',
												fontWeight: '700',
												fontFamily: 'Montserrat',
											}}
										>
											{head}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{handleSearch()
									.slice((page - 1) * 10, (page - 1) * 10 + 10)
									.map((row) => {
										const profit = row.price_change_percentage_24h > 0;
										return (
											<TableRow
												style={{
													backgroundColor: '#16171a',
													cursor: 'pointer',
													'&:hover': {
														backgroundColor: '#131111',
													},
													fontFamily: 'Montserrat',
												}}
												key={row.name}
												onClick={() => history(`/coin/${row.id}`)}
											>
												<TableCell
													component='th'
													scope='row'
													style={{ display: 'flex', gap: 15 }}
												>
													<img
														src={row?.image}
														alt={row.name}
														height='50'
														style={{ marginBottom: 10 }}
													/>
													<div
														style={{ display: 'flex', flexDirection: 'column' }}
													>
														<span
															style={{
																textTransform: 'uppercase',
																fontSize: 22,
															}}
														>
															{row.symbol}
														</span>
														<span style={{ color: 'darkgrey' }}>
															{row.name}
														</span>
													</div>
												</TableCell>
												<TableCell align='right'>
													{symbol}
													{numberWithCommas(row.current_price.toFixed(2))}
												</TableCell>
												<TableCell
													align='right'
													style={{
														color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
														fontWeight: 500,
													}}
												>
													{profit && '+'}
													{row.price_change_percentage_24h.toFixed(2)}
												</TableCell>
												<TableCell align='right'>
													{symbol}
													{numberWithCommas(
														row.market_cap.toString().slice(0, -6)
													)}
													M
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					)}
				</TableContainer>
				<Pagination
					style={{
						display: 'flex',
						justifyContent: 'center',
						width: '100%',
						padding: '20px 0',
					}}
					onChange={(_, value) => {
						setPage(value);
						window.scroll(0, 450);
					}}
					count={(handleSearch()?.length / 10).toFixed(0)}
				/>
			</Container>
		</ThemeProvider>
	);
};

export default CoinsTable;
