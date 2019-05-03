import React, { Component } from 'react';
import { 
  AppRegistry,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid
 } from 'react-native';
 //Pages
import Signup from './pages/Login'
import Login from './pages/Signup'
import Account from './pages/Main'
import styles from './styles/mainstyle'
import { Navigator } from 'react-native-deprecated-custom-components';
import * as firebase from "firebase"

var fireBaseconfig = {
  apiKey: "AIzaSyDDt13U6mHxlbhrluMdb-WAMIxb-xc0qfk",
  authDomain: "todolistreact-4b037.firebaseapp.com",
  databaseURL: "https://todolistreact-4b037.firebaseio.com",
  projectId: "todolistreact-4b037",
  storageBucket: "todolistreact-4b037.appspot.com",
  messagingSenderId: "649414351051"
  };
const firebaseApp = firebase.initializeApp(fireBaseconfig);

export class App extends Component {
  constructor(props){
    super(props);
    this.state={
      openingPage: null,
      loading: true
    }
  }
  async componentWillMount(){
    //Check if userData is stored on device else open Login
    await Expo.Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({ loading: false });
    AsyncStorage.getItem('userData').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      let openingPage = {openingPage: Login};
      if(user_data != null){
        this.setState({openingPage:Account});
      }else{
        this.setState(openingPage);
      }
    })
  }


  render() {
    if(this.state.openingPage){
      return(
        <Navigator 
          initialRoute={{component: this.state.openingPage}}
          configureScene={() => {
            return Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator, firebaseApp })
            }
          }}
        />
      )
    }else{
      return(
        <View style={styles.container}>
          <ToolbarAndroid title="Login" />
          <View style={styles.body}>
            <ActivityIndicator size="large" />
          </View>
        </View>
      )
    }
  }
}

export default App