import rootReducer from "reducers/index.js";
import { applyMiddleware, createStore } from "redux";
import {middleWareArgsTesting} from "src/configs/store.js";

export const createTestStore = (initalState) => {
  const middleware = applyMiddleware(...middleWareArgsTesting);
  const store = createStore(rootReducer, initalState, middleware);

  const makeUpdateActionList = ( testStore ) => {
    return ( action ) => {
      testStore.actionList.push(action);
    }
  };

  let testStore = {
    ...store,
    actionList: [],
  };
  testStore.dispatch = getCustomDispatch(store, makeUpdateActionList(testStore));

  return testStore;
};

const getCustomDispatch = ( store, updateActionList ) => {
  const dispatch = async ( action ) => {
    let calledAction = action;
    if (isPromise(action)){
      calledAction = await action;
    }

    if (typeof calledAction === 'object' && !isPromise(calledAction)){
      updateActionList(calledAction);
      store.dispatch(calledAction);
    }
    else {
      await calledAction(dispatch, store.getState);
    }
  }
  return dispatch;
}

const isPromise =  (object) => {
  if(Promise && Promise.resolve){
    return Promise.resolve(object) == object;
  }else{
    throw "Promise not supported in your environment"
  }
}
