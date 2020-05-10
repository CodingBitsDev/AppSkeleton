import logger, { createLogger } from "redux-logger"; // Loggs the states, to see the previous state.

//MODIFY This If you want reduced logging
const reducedLogger = createLogger({
  //diff: true,
  //stateTransformer: (state) => {
    //let loadedUserData = state.userProfilesReducer.loaded_user_data;

    //for (let i = 0, len = Object.keys(loadedUserData || {}).length; i < len; i++) {
      //let userData = loadedUserData[Object.keys(loadedUserData)[i]]
      //if (userData && userData.displayName == "Nils"){
        //return userData.pic_urls;
      //}

    //}

    //return {};
  //}
  stateTransformer: () => {return {};},
})

export default function getMiddlewareList() {
  let middlewareList = [
    //reducedLogger,
    logger,
  ]
  return middlewareList;
}
