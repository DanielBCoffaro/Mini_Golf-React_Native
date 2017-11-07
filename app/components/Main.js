import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, AsyncStorage, Modal, TouchableHighlight } from 'react-native';
import Note from './Note.js';
import AddUserModel from './addUserModel.js';

export default class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
            modalVisible: false,
            playerName: '',
        }
        this.loadData();
    }


    render() {

        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val} deleteMethod={ ()=> this.deleteNote(key)}/>
        });


        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        Mini Golf
                    </Text>
                </View>
                <View style={styles.advanceComponent}>

                    <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.leftButton}>
                        <Text style={styles.addButtonText}>B</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.rightButton}>
                        <Text style={styles.addButtonText}>F</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>


                <TouchableOpacity onPress={() => {
                    this.setModalVisible(true)
                }} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>

                <AddUserModel modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible.bind(this)} setModalVisible={this.addNote.bind(this) } />

            </View>
        );
    }

    addNote(name){
        if (this.state.noteText) {
            var d = new Date();
            this.state.noteArray.push({
                'date': d.getFullYear() +
                "/" + (d.getMonth()) +
                "/" + d.getDate(),
                'note': name
            });
            this.setState({noteArray: this.state.noteArray})
            this.setState({noteText: ''});

            AsyncStorage.setItem('noteArray', JSON.stringify(this.state.noteArray))
            this.props.setModalVisible(!this.props.modalVisible )
        }
    }

    loadData = async() =>{
        try {
            let savedData = await AsyncStorage.getItem('noteArray');
            savedData = JSON.parse(savedData);
            this.state.noteArray = savedData;
            this.setState({})

        }catch (error){
            alert(error)
        }
    }

    deleteNote(key){
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray})
        AsyncStorage.setItem('noteArray', JSON.stringify(this.state.noteArray))
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0,
        borderBottomColor: '#ddd',
        height: 100,
    },
    advanceComponent:{
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
    },
    leftButton:{
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
        height: 45,
        borderColor: '#d6d7da',
        borderRadius: 4,
        borderWidth: 0.5,
    },
    rightButton:{
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
        height: 45,
        borderColor: '#d6d7da',
        borderRadius: 4,
        borderWidth: 0.5,
    },
    headerText:{
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer:{
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textInput:{
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    addButton:{
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: 'purple',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText:{
        backgroundColor: 'transparent',
        fontSize: 30,
    },

});