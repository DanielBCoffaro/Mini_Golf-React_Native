import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity,TextInput,Modal,TouchableHighlight } from 'react-native';

export default class AddUserModel extends React.Component {
    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={{marginTop: 22}}>
                        <View>

                            <TextInput
                                style={styles.playerInput}
                                placeholder='Player Name'
                                placeholderTextColor='black'
                                underlineColorAndroid='transparent'
                                onChangeText={(playerName) => this.setState({playerName})}
                            >
                            </TextInput>


                            <TouchableOpacity onPress={() => {
                                this.props.setModalVisible(!this.props.modalVisible )
                            }} style={styles.addButton1}>
                                <Text style={styles.addButtonText1}>Save Player</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
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
    playerInput:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    noteDeleteText:{
        color: 'white',
    },
    addButton1:{
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
        height: 45,
        borderColor: 'black',
        borderRadius: 4,
        borderWidth: 0.5,
    },
    addButtonText1:{
        backgroundColor: 'transparent',
        fontSize: 30,
    },
});
