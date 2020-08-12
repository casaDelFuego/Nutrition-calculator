import { Component } from 'react'
import * as React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { getAllItems, saveUpdatedListOfFoods } from '../storage/Storage'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import ListOfFoods from './../components/ListOfFoods'

const generateId = () => {
    return (Math.random() + 1).toString(36).substring(7);
}

export default class AddScreen extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            proteins: "",
            fats: "",
            carbs: "",
            isEmpty: false
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleProteinsChange = this.handleProteinsChange.bind(this)
        this.handleFatsChange = this.handleFatsChange.bind(this)
        this.handleCarbsChange = this.handleCarbsChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange(name) {
        this.setState({ name })
    }

    handleProteinsChange(proteins) {
        this.setState({ proteins })
    }

    handleFatsChange(fats) {
        this.setState({ fats })
    }

    handleCarbsChange(carbs) {
        this.setState({ carbs })
    }


    async updateListOfFoods(newFoodItem) {
        try {
            let listOfFoods = await getAllItems()
            //console.log('list of foods previous', listOfFoods)
            listOfFoods.push(newFoodItem)
            saveUpdatedListOfFoods(listOfFoods)
        } catch (error) {
            console.log('Error fetching list of foods', error);
        }
    }

    handleSubmit() {
        //defining the object that needs to be stored
        const newFoodItem = {
            ...this.state,
            id: generateId()
        }
        if (newFoodItem.name === "" ||
            newFoodItem.proteins === "" ||
            newFoodItem.fats === "" ||
            newFoodItem.carbs === "") {
            this.setState({ isEmpty: true })
        } else {
            //console.log('this is the ITEM i try to save:', newFoodItem)
            this.updateListOfFoods(newFoodItem)
            this.setState({
                id: "",
                name: "",
                proteins: "",
                fats: "",
                carbs: "",
                isEmpty: false,
                hasAdded: true
            })
        }
        Keyboard.dismiss()
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                <TextInput
                    style={styles.textInput}
                    placeholder="Food name"
                    value={this.state.name}
                    onChangeText={this.handleNameChange}
                />


                <TextInput
                    style={styles.textInput}
                    placeholder="Proteins"
                    keyboardType={'numeric'}
                    value={this.state.proteins}
                    onChangeText={this.handleProteinsChange}
                />


                <TextInput
                    style={styles.textInput}
                    placeholder="Fats"
                    keyboardType={'numeric'}
                    value={this.state.fats}
                    onChangeText={this.handleFatsChange}
                />


                <TextInput
                    style={styles.textInput}
                    placeholder="Carbs"
                    keyboardType={'numeric'}
                    value={this.state.carbs}
                    onChangeText={this.handleCarbsChange}
                />


                <TouchableOpacity style={styles.saveButton} onPress={this.handleSubmit}>
                    <Text style={styles.saveButtonText}>Add</Text>
                </TouchableOpacity>

                {this.state.isEmpty ? <Text>Fill all the fields</Text> : null}

                <ListOfFoods />


            </ScrollView>
        )

    }
}
// at the bottom of this page there is supposed to be a list of all foods sorted by alphabet




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        padding: 15,
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 7
    },
    saveButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        margin: 5
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    }
})

