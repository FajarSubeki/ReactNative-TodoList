'use strict';
import {
    AppRegistry,
    AsyncStorage,
    View,
    ToolbarAndroid,
    ActivityIndicator
} from 'react-native';
import { Header, Container, Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import React, { Component } from 'react';
import Signup from './Signup';
import Account from './Main'
import styles from '../styles/mainstyle.js';

// create a component
class Login extends Component {

    constructor(props) {
        super(props);
        // We have the same props as in our signup.js file and they serve the same purposes.
        this.state = {
            loading: false,
            email: '',
            password: ''
        }
    }

    render() {
        const content = this.state.loading ?
            <View style={styles.body}>
                <ActivityIndicator size="large" />
            </View> :
            <Content>
                <List>
                    <ListItem>
                        <InputGroup>
                            <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                            <Input
                                onChangeText={(text) => this.setState({ email: text })}
                                value={this.state.email}
                                placeholder={"Email Address"} />
                        </InputGroup>
                    </ListItem>
                    <ListItem>
                        <InputGroup>
                            <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                            <Input
                                onChangeText={(text) => this.setState({ password: text })}
                                value={this.state.password}
                                secureTextEntry={true}
                                placeholder={"Password"} />
                        </InputGroup>
                    </ListItem>
                </List>
                <Button style={styles.primaryButton} onPress={this.login.bind(this)}>
                    <Text>Login</Text>
                  </Button>
                <Button onPress={this.goToSignup.bind(this)} style={styles.primaryButton}>
                    <Text> New Here?</Text>
                  </Button>
            </Content>
            ;
        return (
            <Container>
                <Header>
                <Title style={styles.headerText2}>Login</Title>
                </Header>
                {content}
            </Container>
        )
    }

    login() {
        this.setState({
            loading: true
        });
        // Log in and display an alert to tell the user what happened.
        this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password
        ).then((userData) => {
            this.setState({
                loading: false
            });
            AsyncStorage.setItem('userData', JSON.stringify(userData));
            this.props.navigator.push({
                component: Account
            });
        }
        ).catch((error) => {
            this.setState({
                loading: false
            });
            alert('Login Failed. Please try again' + error);
        });
    }

    // Go to the signup page
    goToSignup() {
        this.props.navigator.push({
            component: Signup
        });
    }

}
//make this component available to the app
export default Login;
