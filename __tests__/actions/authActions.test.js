import { authTypes, persistTypes } from "actions/types.js";

import { createTestStore } from "utils/createTestStore.js";

import { checkSignIn } from "actions/authActions.js";

import authReducer from "reducers/authReducer.js";

describe( "CheckSignInAction", ()=> {
  it("should only call " + authTypes.NOT_SIGNED_IN + " action", async () => {
    const testStore = createTestStore();
    await testStore.dispatch(checkSignIn());
    expect(testStore.actionList.length).toBe(1);
    expect(testStore.actionList[0].type).toBe(authTypes.NOT_SIGNED_IN);
  })

  it("should call " + authTypes.SIGN_IN_SUCESSFULL + "action only", async () => {
    const testStore = await createTestStore({authReducer: {...authReducer(undefined,  {}), persistSignedIn : "Test" }})
    await testStore.dispatch(checkSignIn());
    expect(testStore.actionList.length).toBe(1);
    expect(testStore.actionList[0].type).toBe(authTypes.SIGN_IN_SUCESSFULL);
  })
});
