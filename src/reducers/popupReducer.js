const INITIAL_STATE = {
  popupContent: null,
};

export default function reducer(state=INITIAL_STATE , action) {
    switch (action.type) {
      case "SET_POPUP_CONTENT": {
        return {...state, popupContent: action.payload.content };
      }
      case 'persist/REHYDRATE': {
        return {...state, }
      }
    }
    return state;
}

