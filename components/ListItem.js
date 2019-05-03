//import liraries
import React, { Component } from 'react';
import { CardItem, Icon, Text, Right } from 'native-base'
// create a component
class ListItem extends Component {
    render() {
        return (
           <CardItem>
               <Icon name='md-create' style={{ flex: 1, }}/>
               <Text style={{ flex: 8, }}>{this.props.task.name}</Text>
               <Icon style={{ flex: 1, }} name='md-checkmark' onPress={() => this.props.onTaskCompletion()} />
               
           </CardItem>
        );
    }
}

module.exports = ListItem
