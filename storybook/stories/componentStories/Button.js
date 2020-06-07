import React from 'react';
import { Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';

//Components
import Button from "src/reuse/Button.js";

//Decorators
const Center = ({children}) => { return (<View style={{ flex:1, justifyContent: "center", alignItems: "center" }}>{children}</View>) }

const createButtonStory = ( storyName, button ) => {
  storiesOf('Button', module).add(storyName, () => <Center>{button}</Center>);
}

//Start
storiesOf( "Button", module).add("All", () => (
  <View style={{ flex:1, justifyContent: "space-around", alignItems: "center"  }}>
    <Button title="Regular"/>
    <Button rounded title="Rounded"/>
    <Button full title="Full"/>
    <Button block title="Block"/>
    <Button disabled title="Diabled"/>
    <Button primary title="Primary"/>
    <Button secondary title="Secondary"/>
    <Button info title="Info"/>
    <Button success title="Success"/>
    <Button warning title="Warning"/>
    <Button danger title="Danger"/>
    <Button containerStyle={{ width: 300 }} title="Regular, width:300 "/>
    <Button title={"Linear Gradient"} colors={ ["#c278ed", "#991fe0", "#5c1287",] } textStyle={[{ color: "#FFF" }]} />
    <Button rounded title={"Linear Gradient Rounded"} colors={ ["#c278ed", "#991fe0", "#5c1287",] } textStyle={[{ color: "#FFF" }]} />
  </View>
))
createButtonStory( "Button_Regular", (<Button title="Regular"/>) );
createButtonStory( "Button_Rounded", (<Button rounded title="Rounded"/>) );
createButtonStory( "Button_Full", (<Button full title="Full"/>) );
createButtonStory( "Button_Block", (<Button block title="Block"/>) );

createButtonStory( "Button_Disabled", (<Button disabled title="Diabled"/>) );
createButtonStory( "Button_Primary", (<Button primary title="Primary"/>) );
createButtonStory( "Button_Secundary", (<Button secondary title="Secondary"/>) );
createButtonStory( "Button_Info", (<Button info title="Info"/>) );
createButtonStory( "Button_Success", (<Button success title="Success"/>) );
createButtonStory( "Button_Warning", (<Button warning title="Warning"/>) );
createButtonStory( "Button_Danger", (<Button danger title="Danger"/>) );

createButtonStory( "Button_Regular_Width", (<Button containerStyle={{ width: 300 }} title="Regular, width:300 "/>) );

createButtonStory( "Button_LinearGradient", ( <Button title={"Linear Gradient"} colors={ ["#c278ed", "#991fe0", "#5c1287",] } textStyle={[{ color: "#FFF" }]} />) )
createButtonStory( "Button_LinearGradient_Rounded", ( <Button rounded title={"Linear Gradient Rounded"} colors={ ["#c278ed", "#991fe0", "#5c1287",] } textStyle={[{ color: "#FFF" }]} />) )

