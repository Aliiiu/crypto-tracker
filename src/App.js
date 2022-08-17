import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import Header from './Component/Header/Header';
import Home from './Pages/Home';
import './App.css';
import CryptoProject from './Pages/CryptoProject';

function App() {
	return (
		<StyledEngineProvider injectFirst>
			<BrowserRouter>
				<div className='root'>
					<Header />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/coin/:id' element={<CryptoProject />} />
					</Routes>
				</div>
			</BrowserRouter>
		</StyledEngineProvider>
	);
}

export default App;
