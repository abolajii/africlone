import axios from 'axios';

// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmY3MTQwMmYyZDJhZDQzYTkwNDg1ZjgiLCJpYXQiOjE2MzYzODA3NTV9.cGA0jOgZE4ozN86kTNgnZEphAskwwn4cTv32e2YXSw0`;

const getToken = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: null;
const token = getToken?.token;

const instance = axios.create({
	baseURL: 'https://tagging-panel.herokuapp.com',
	// timeout: 10000,
	headers: {
		Authorization: `Bearer ${token ? token : ''}`,
	},
});

export default instance;
