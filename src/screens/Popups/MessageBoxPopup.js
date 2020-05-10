import React from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { StyleSheet, View, ScrollView, Text, Button, Dimensions, Switch, TouchableOpacity } from 'react-native';

function getButtons(props) {
  let goBack = ( props.navigation && props.navigation.goBack ) || (() => {console.warn("No Navigation Set")});

  return (
    <Button
      onPress={ () => { goBack()  } }
      title="OK"
      color="#00F"
    />
  )
}


let MessageBoxPopup = (props) => {
  return (
    <View style={[{justifyContent:"center", alignItems:"center", backgroundColor:"white", width: 300, height: 300, maxWidth: Dimensions.get('window').width * 0.8}]}>
      <Text selectable style={[{}]}>{ "Titel" }</Text>
      <View style={[{}]}>
        <Text selectable style={[{}]}>{"Some infrmationText"}</Text>
      </View>
      {getButtons(props)}
    </View>
  );
}

export default connect((store) => {
  return {
  };
})(MessageBoxPopup);
