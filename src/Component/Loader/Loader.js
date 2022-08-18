import './loader.css';

const Loader = () => {
	return (
		<div className={'loader-container'}>
			<div className={'sk-chase'}>
				<div className={'sk-chase-dot'}></div>
				<div className={'sk-chase-dot'}></div>
				<div className={'sk-chase-dot'}></div>
				<div className={'sk-chase-dot'}></div>
				<div className={'sk-chase-dot'}></div>
				<div className={'sk-chase-dot'}></div>
			</div>
		</div>
	);
};

export default Loader;
