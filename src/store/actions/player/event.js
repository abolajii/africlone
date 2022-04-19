import { ADD_EVENT, CLEAR_EVENT, MODIFY_EVENT, REMOVE_EVENT } from '../types/';

const addEvent = ({ data }) => ({
	type: ADD_EVENT,
	payload: data,
});

const modifyEvent = ({ data }) => {
	console.log(data);
	return { type: MODIFY_EVENT, payload: data };
};

const removeEvent = ({ data }) => ({
	type: REMOVE_EVENT,
	payload: data,
});

const clearEvent = ({ data }) => ({
	type: CLEAR_EVENT,
	payload: data,
});

export { addEvent, modifyEvent, removeEvent, clearEvent };
