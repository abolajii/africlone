import React, { useEffect } from 'react';
import '../../styles/home.scss';
import { useHistory } from 'react-router-dom';

export default function Home() {
	const history = useHistory();

	const home = () => {
		let data = localStorage.getItem('user');
		if (!data || data.length < 3) history.push('/login');
		history.push('/login');
	};

	useEffect(() => {
		home();
	});

	return <></>;
}
