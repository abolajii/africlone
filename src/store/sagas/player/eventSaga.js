import { call, takeLatest, put } from 'redux-saga/effects';
import { addEvent, removeEvent, modifyEvent } from '../../actions/player/event';
import {
	ADD_EVENT,
	EVENT_ADDED,
	REMOVE_EVENT,
	MODIFY_EVENT,
	EVENT_REMOVED,
	EVENT_MODIFIED,
	CLEAR_EVENT,
	EVENT_CLEARED,
} from '../../actions/types';
import DataBaseApi from '../../../database/DataBaseApi';

const api = new DataBaseApi();

function* addEventAsync(action) {
	const data = yield call(asyncAddOperation, action.payload);
	console.log('data', data);
	const payload = { ...action.payload, id: data };
	yield put({ type: EVENT_ADDED, payload });
}

function* updateEventAsync(action) {
	const data = yield call(asyncUpdateOperation, action.payload);
	yield put({ type: EVENT_MODIFIED, payload: data });
}

function* removeEventAsync(action) {
	const data = yield call(asyncRemoveOperation, action.payload);
	yield put({ type: EVENT_REMOVED, payload: data });
}

function* clearEventAsync(action) {
	const data = yield call(asyncClearEvents);
	yield put({ type: EVENT_CLEARED, payload: data });
}

const asyncAddOperation = async (data) => {
	if (data.type !== 'Goals') return api.addEventREVAMPED(data);

	const events = await api.getEventsREVAMPED();
	if (events && events.length > 0)
		data.assist = events[events.length - 1].player;
	return api.addEventREVAMPED(data);
};

const asyncUpdateOperation = async (data) => {
	return api.updateEventREVAMPED(data);
};

const asyncRemoveOperation = async (data) => {
	return api.removeEventREVAMPED(data);
};

const asyncClearEvents = async () => {
	console.log('asyncClearEvents');
	return api.clearEvent();
};

const eventSaga = [
	takeLatest(ADD_EVENT, addEventAsync),
	takeLatest(REMOVE_EVENT, removeEventAsync),
	takeLatest(MODIFY_EVENT, updateEventAsync),
	takeLatest(CLEAR_EVENT, clearEventAsync),
];

export default eventSaga;
