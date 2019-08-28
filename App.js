import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import {Text, View, StyleSheet, Image, StatusBar} from 'react-native';
import { Button, Header, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';




import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <View>
//         <View style={{backgroundColor: "blue", flexDirection: "column", alignItems: "center"}}>
//           <View >
//             <Text style={{fontSize: 100, alignItems: "center", color: "red"}}>Number</Text>
//           </View>
//           <Text>1</Text>
//         </View>
//         <View>
//           <Button title="hello"/>
//         </View>
//       </View>
//     )
//   }
// };


// ......................................

// export default class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {amount: 200, spend: 0}
//   }

//   handleClick = () => {
//     this.setState({amount: this.state.amount - +this.state.spend})
//   }

//   handleInput = (amount) => {
//     this.setState({spend: +amount})
//   }
//   render() {
//     return (
      
//       <View style={styles.container}>
//         <Header placement="center"
//           leftComponent={{ icon: 'menu', color: '#fff' }}
//           centerComponent={{ text: `Current Cash: $${this.state.amount}`, style: { color: '#fff' } }}
//           rightComponent={{ icon: 'home', color: '#fff'}}
//         />
//           <Input leftIcon={<Icon
//       name='user'
//       size={24}
//       color='black'
//     />} placeholder="amount spend" onChangeText={(val) => this.handleInput(val)}/>
//           <Button title="click" onPress={this.handleClick} style={{backgroundColor: "red"}}/>
//           {/* <View> */}
//         {/* <DocumentScanner
//           useBase64
//           onPictureTaken={data => this.setState({
//             image: data.croppedImage,
//             initialImage: data.initialImage,
//             rectangleCoordinates: data.rectangleCoordinates,
//           })}
//           overlayColor="rgba(255,130,0, 0.7)"
//           enableTorch={false}
//           brightness={0.3}
//           saturation={1}
//           contrast={1.1}
//           quality={0.5}
//           onRectangleDetect={({ stableCounter, lastDetectionType }) => this.setState({ stableCounter, lastDetectionType })}
//           detectionCountBeforeCapture={5}
//           detectionRefreshRateInMS={50}
//         />
//         <Image source={{ uri: `data:image/jpeg;base64,${this.state.image}`}} resizeMode="contain" />
//       </View>   */}
//       </View>
//     );
//   }
// }

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
