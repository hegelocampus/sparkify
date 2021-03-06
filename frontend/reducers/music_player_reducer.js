import { 
  SET_CURRENT_SONG, 
  TOGGLE_PLAY, 
  SET_QUEUE, 
  CLEAR_UP_NEXT, 
  ADD_TO_QUEUE 
} from './../actions/music_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

const defaultState = {
  currentSong: {
    track_url: '',
    title: '',
    duration: '0:00'
  },
  playing: false,
  queue: [{
    track_url: '',
    title: ''
  }],
  currentIdx: 0
};

const musicPlayerReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_CURRENT_SONG:
      return { 
        currentSong: action.queueInfo.currentSong,
        playing: true,
        currentIdx: action.queueInfo.currentIdx,
        queue: action.queueInfo.queue,
        queueName: action.queueInfo.queueName
      };
    case TOGGLE_PLAY:
      let newState = Object.assign({},state);
      if (newState.playing === true) {
        newState.playing = false;
      } else {
        newState.playing = true;
      }
      return newState;
    case SET_QUEUE:
      return Object.assign({}, state, { queue: action.queue, currentIdx: action.currentIdx });
    case LOGOUT_CURRENT_USER:
      return defaultState;
    case ADD_TO_QUEUE:
      return Object.assign({}, state, { upNext: action.song });
    case CLEAR_UP_NEXT:
      return Object.assign({}, state, { upNext: null });
    default:
      return state;
  }
};

export default musicPlayerReducer;