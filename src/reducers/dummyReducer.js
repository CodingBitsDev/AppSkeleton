/** Takes a State and an action and changes State acordingly to the action
    and the data given by the action **/

const INITIAL_STATE = {
  textValue: "YESSSSSSS!!! It Works!!!!!!",
  homeWorkState: {
    homeWorkDone : false,
    workHoursNeeded: 2,
  },
    FunStateOnging: true,
};

export default function reducer(state=INITIAL_STATE , action) {

    switch (action.type) {
      case "CHANGE_HOMEWORK_STATE": {
        return {...state, homeWorkState: {...ation.payload} };
      }
    }
    return state;
}
