import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity,TextInput } from 'react-native';

export default class Note extends React.Component {
    render() {
        return (
            <View key={this.props.keyval} style={styles.note}>
                <Text style={styles.noteText}>{this.props.val.date}</Text>
                <Text style={styles.noteText}>{this.props.val.note}</Text>

                <TextInput
                    style={styles.noteDelete}
                    //onChangeText={(noteText) => this.setState({noteText})}
                    keyboardType = 'numeric'
                    //value={this.state.noteText}
                    //placeholder='> note'
                    //placeholderTextColor='white'
                    //underlineColorAndroid='transparent'
                    >
                </TextInput>
            </View>




        );
    }
}

const styles = StyleSheet.create({
    note:{
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    noteText:{
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63',
    },
    noteDelete:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'purple',
        padding: 10,
        top: 10,
        right: 10,
        bottom: 10,
    },
    noteDeleteText:{
        color: 'white',
    },
});
