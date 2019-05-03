'use strict';
import React, {
  StyleSheet,
  Platform,
  StatusBar
} from 'react-native';
import { ActionSheet } from 'native-base';

module.exports = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1
  },
  body: {
    flex: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  primaryButton: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 25,
    padding: 15,
    alignSelf: 'center',
    backgroundColor: "blue",
    width: 300,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textEdit: {
    bottom: 0,
    flex: 1,
    width: 300,
  },
  floatButton: {
    flex: 1,
    top: 5,
    right: 4,
    alignSelf: 'center',
    backgroundColor: '#34A34F'
  },
  footer: {
    justifyContent:'center',
  },
  headerText:{
    marginTop: StatusBar.currentHeight,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: '#3a455c'
  },
  headerText2:{
    marginTop: StatusBar.currentHeight,
  },
});
