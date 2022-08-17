import {
	AppBar,
	Container,
	createTheme,
	MenuItem,
	Select,
	ThemeProvider,
	Toolbar,
	Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoCtx } from '../../Context/crypto-context';
import './header.css';

const Header = () => {
	const history = useNavigate();
	const { currency, setCurrency } = CryptoCtx();

	const handleChange = (event) => {
		setCurrency(event.target.value);
	};
	const darkTheme = createTheme({
		palette: {
			primary: {
				main: '#fff',
			},
			mode: 'dark',
		},
	});
	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar color='transparent' position='static'>
				<Container>
					<Toolbar>
						<Typography onClick={() => history('/')} className='title'>
							Crypto Hunter
						</Typography>
						{/* <InputLabel id='select-id-label'>Currency</InputLabel> */}
						<Select
							variant='outlined'
							value={currency}
							onChange={handleChange}
							style={{
								width: 100,
								height: 40,
								marginRight: 15,
							}}
						>
							<MenuItem value={'NGN'}>NGN</MenuItem>
							<MenuItem value={'USD'}>USD</MenuItem>
						</Select>
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
};

export default Header;
