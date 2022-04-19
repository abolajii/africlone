import { ADD_EVENT, EVENT_ADDED, REMOVE_EVENT, EVENT_REMOVED, MODIFY_EVENT, EVENT_MODIFIED, EVENT_CLEARED, CLEAR_EVENT } from "../../actions/types";

const event = (state = {action:ADD_EVENT, payload:undefined}, { type, payload }) => {
  switch (type) {
    case ADD_EVENT:
      return { ...state, action: ADD_EVENT, payload: payload };
    
    case EVENT_ADDED:
      return { ...state, action: EVENT_ADDED, payload: payload };

      
    case REMOVE_EVENT:
      return { ...state, action: REMOVE_EVENT, payload: payload };

    case EVENT_REMOVED:
      return { ...state, action: EVENT_REMOVED, payload: payload };

    case MODIFY_EVENT:
      return { ...state, action: MODIFY_EVENT, payload: payload };

    case EVENT_MODIFIED:
      return { ...state, action: EVENT_MODIFIED, payload: payload };

    case CLEAR_EVENT:
      return { ...state, action: CLEAR_EVENT, payload: payload };

    case EVENT_CLEARED:
      return { ...state, action: EVENT_CLEARED, payload: payload };

    default:
      return state;
  }
};

export default event;