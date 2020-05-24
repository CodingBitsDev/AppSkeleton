//Libraries
import React, {useEffect} from 'react';
import { connect } from "react-redux"; 
import PropTypes from 'prop-types';

//Components
import { View, Text,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from "reuse/Button.js";
import MessageBoxPopup from "../screens/Popups/MessageBoxPopup.js";

//Actions
import { signOut } from "../actions/authActions.js";

//Hooks
import useNavActions from "hooks/useNavActions.js";
import useOpenPopup from "hooks/useOpenPopup.js";


//HelperFunctions
import getTheme from "theme/index.js";

function HomeScreen(props) {
  let { colors, styles: defaultStyles, icons, fonts, images } = getTheme();

  let navigate = useNavActions();
  let openPopup = useOpenPopup();

  useEffect( () => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <Button
            onPress={ () => { props.dispatch(signOut()) }}
            title={ props.processedWithoutAccount ? "Auth" : "SignOut" } 
            danger
            transparent
            containerStyle={{
              marginHorizontal: 20,
            }}
            textStyle={{
              //fontWeight: "bold",
              fontSize: 18,
            }}
          />
        )
      },
    });
  }, [])

  return (
    <SafeAreaView style={{backgroundColor: colors.background , flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        onPress={ () => { navigate("HomeScreen2") } }
        title="Open Home Screen 2"
        primary
      />
      <Button
        onPress={ () => { openPopup( <MessageBoxPopup />, {closeOnBackPress : true, closeOnOutsidePress: true}) } }
        title="Open Popup"
        warning
      />
    </SafeAreaView>
  );
}

HomeScreen.propTypes = {
  processedWithoutAccount: PropTypes.bool,
  dispatch: PropTypes.func,
  navigation: PropTypes.object,
}

export default connect((store) => {
  return {
    processedWithoutAccount: store.authReducer.processedWithoutAccount,
  };
})(HomeScreen);
