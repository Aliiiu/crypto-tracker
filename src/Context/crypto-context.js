import React, { createContext, useState, useEffect, useContext } from 'react';

const CryptoContext = createContext({
	currency: '',
	symbol: '',
	setCurrency: () => {},
});

export const CrypoContextProvider = ({ children }) => {
	const [currency, setCurrency] = useState('NGN');
	const [symbol, setSymbol] = useState('₦');

	useEffect(() => {
		if (currency === 'NGN') setSymbol('₦');
		else if (currency === 'USD') setSymbol('$');
	}, [currency]);
	return (
		<CryptoContext.Provider
			value={{ currency: currency, setCurrency: setCurrency, symbol: symbol }}
		>
			{children}
		</CryptoContext.Provider>
	);
};

export default CryptoContext;

export const CryptoCtx = () => {
	return useContext(CryptoContext);
};
