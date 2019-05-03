'use strict';
import {
    ActivityIndicator,
    AsyncStorage,
    TextInput,
    KeyboardAvoidingView,
    StatusBar,
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import React, { Component } from 'react';
import { Header, Container, Title, Content, Icon, Card, Left, Right, Fab, Footer, Body } from 'native-base';

//Pages and styles
import Login from './Login';
import ListItem from '../components/ListItem.js';
import styles from '../styles/mainstyle.js';

// create a component
class Account extends Component {

    constructor(props) {
        super(props);
        this.tasksRef = this.props.firebaseApp.database().ref();
        this.state = {
            user: null,
            loading: true,
            newTask: ""
        }
    }

    componentDidMount() {
        // start listening for firebase updates
        this.listenForTasks(this.tasksRef);
    }

    //listener to get data from firebase and update listview accordingly
    listenForTasks(tasksRef) {
        tasksRef.on('value', (dataSnapshot) => {
            var tasks = [];
            dataSnapshot.forEach((child) => {
                tasks.push({
                    name: child.val().name,
                    _key: child.key
                });
            });

            this.setState({
                tasks: tasks
            });
        });
    }

    componentWillMount() {
        // get the current user from firebase
        // const userData = this.props.firebaseApp.auth().currentUser;
        AsyncStorage.getItem('userData').then((user_data_json) => {
            let userData = JSON.parse(user_data_json);
            this.setState({
                user: userData,
                loading: false,
                active: 'true',
                tasks: []
            });
        });

    }

    render() {

        const MyStatusBar = ({ backgroundColor, ...props }) => (
            <View style={[styles.statusBar, { backgroundColor }]}>
                <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            </View>
        );

        const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
        const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

        const styles = StyleSheet.create({
            container: {
                flex: 1,
            },
            statusBar: {
                height: STATUSBAR_HEIGHT,
            },
            appBar: {
                backgroundColor: '#3a455c',
                height: APPBAR_HEIGHT,
            },
        });

        // console.log("tasks value",this.state.tasks);
        // If we are loading then we display the indicator, if the account is null and we are not loading
        // Then we display nothing. If the account is not null then we display the account info.
        const content = this.state.loading ?
            <ActivityIndicator size="large" /> :
            this.state.user &&
            <Content>
                <Card dataArray={this.state.tasks}
                    renderRow={(task) => this._renderItem(task)} >
                </Card>
            </Content>
            ;
        // console.log("loading user",this.state.user,this.state.loading);
        return (
            <Container>
                <MyStatusBar backgroundColor="#3a455c" barStyle="light-content" />
                <Header
                    style={styles.headerText}>
                    <Left style={{ flex: 1 }}>
                        <Icon name='ios-arrow-back' onPress={() => this.logout()}/>
                    </Left>
                    <Body style={{ flex: 3, justifyContent: 'center' }}>
                        <Title style={{ alignSelf: 'center' }}>Todo List</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Icon name='ios-menu' />
                    </Right>
                </Header>
                {content}
                <KeyboardAvoidingView behavior="padding">
                <Footer style={styles.footer}>
                    <TextInput
                        value={this.state.newTask}
                        onChangeText={(text) => this.setState({ newTask: text })}
                        placeholder="New Task"
                    />
                    <Fab
                        active={this.state.active}
                        containerStyle={{ marginRight: 0, width: 20 }}
                        style={styles.floatButton}
                        position="bottomRight"
                        onPress={() => this._addTask()}
                    >
                        <Icon name="md-add" />
                    </Fab>

                </Footer>
                </KeyboardAvoidingView>

            </Container>
        );
    }

    //render ListItems as per our needs
    _renderItem(task) {
        // console.log("task",task._key);
        const onTaskCompletion = () => {
            // console.log("clickrecived",this.tasksRef.child(task._key).remove());
            this.tasksRef.child(task._key).remove().then(
                function () {
                    // fulfillment
                    alert("The task " + task.name + " has been completed successfully");
                },
                function () {
                    // fulfillment
                    alert("The task " + task.name + " has not been removed successfully");
                });
        }
        return (
            <ListItem task={task} onTaskCompletion={onTaskCompletion} />
        );
    }

    logout() {
        // logout, once that is complete, return the user to the login screen.
        AsyncStorage.removeItem('userData').then(() => {
            this.props.firebaseApp.auth().signOut().then(() => {
                this.props.navigator.push({
                    component: Login
                });
            });
        });

    }

    //add a new task to firebase app
    _addTask() {
        // console.log("task value",this.state.newTask);
        if (this.state.newTask === "") {
            return;
        }
        this.tasksRef.push({ name: this.state.newTask });
        this.setState({ newTask: "" });
        alert("Task added successfully");
    }

}
//make this component available to the app
export default Account;
