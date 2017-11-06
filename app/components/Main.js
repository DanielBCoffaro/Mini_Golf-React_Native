import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import Note from './Note.js';

export default class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
        }
        this.loadData();
    }


    render() {

        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val}
                         deleteMethod={ ()=> this.deleteNote(key)}/>
        });

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        --The Notes--
                    </Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(noteText) => this.setState({noteText})}
                        value={this.state.noteText}
                        placeholder='> note'
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'>
                    </TextInput>
                </View>

                <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>

            </View>
        );
    }

    addNote(){
        if (this.state.noteText) {
            var d = new Date();
            this.state.noteArray.push({
                'date': d.getFullYear() +
                "/" + (d.getMonth()) +
                "/" + d.getDate(),
                'note': this.state.noteText
            });
            this.setState({noteArray: this.state.noteArray})
            this.setState({noteText: ''});

            AsyncStorage.setItem('noteArray', JSON.stringify(this.state.noteArray))
            //alert("Hitting here")
        }
    }

    loadData = async() =>{
        try {
            let savedData = await AsyncStorage.getItem('noteArray');
            //this.state.noteArray = JSON.parse(savedData);
            savedData = JSON.parse(savedData);
            this.state.noteArray = savedData;
            // alert("state " + this.state.noteArray)
            // alert("saved data " +savedData)

        }catch (error){
            alert(error)
        }
    }

    deleteNote(key){
        this.state.noteArray.splice(key, 1);
        this.SetState({noteArray: this.state.noteArray})
        AsyncStorage.setItem('noteArray', JSON.stringify(this.state.noteArray))
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
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
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
        backgroundColor: 'purple',
        fontSize: 30,
    },

});