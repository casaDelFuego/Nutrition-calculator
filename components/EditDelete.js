import * as React from 'react'
import { Component } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, Label } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { removeItem, updateOneItemInListOfFoods, getAllItems, saveUpdatedListOfFoods } from './../storage/Storage'

const generateId = () => {
    return (Math.random() + 1).toString(36).substring(7);
}

export default class EditDelete extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.food.id,
            name: this.props.food.name,
            proteins: this.props.food.proteins,
            fats: this.props.food.fats,
            carbs: this.props.food.carbs
        }

        // this.handleNameChange = this.handleNameChange.bind(this)
        //this.handleProteinsChange = this.handleProteinsChange.bind(this)
        //this.handleFatsChange = this.handleFatsChange.bind(this)
        //this.handleCarbsChange = this.handleCarbsChange.bind(this)
        //this.updateItem = this.updateItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        //this.updateListOfFoods = this.updateListOfFoods.bind(this)
    }


    /* handleNameChange(name) {
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
     }*/

    /*updateListOfFoods(newFoodItem) {
        try {
            let listOfFoods = getAllItems()
            listOfFoods.push(newFoodItem)
            saveUpdatedListOfFoods(listOfFoods)
        } catch (error) {
            console.log('error in updating an item', error);
        }
    }
    updateItem() {
        this.deleteItem(this.state.id)
        this.props.passMsg()
        const updatedFoodItem = {
            ...this.state,
            id: generateId()
        }
        this.updateListOfFoods(updatedFoodItem)
        console.log('our state in update', updatedFoodItem)
        //this.updateOneItemInListOfFoods(updatedFoodItem)
    }*/

    async deleteItem() {
        console.log('we fire delete')
        this.props.passMsg()
        removeItem(this.state.id)
        this.setState({
            id: "",
            name: "",
            proteins: "",
            fats: "",
            carbs: ""
        })
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.deleteButton} onPress={this.deleteItem}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


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
        height: 30,
        fontSize: 20,
        paddingLeft: 40,
        paddingRight: 40
    },
    saveButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 20,
        margin: 5
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#e83a3a',
        padding: 10,
        margin: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        textAlign: 'center'
    }
})


/**
 * <TouchableOpacity style={styles.saveButton} onPress={this.updateItem}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
 */

/*<Text> Edit stuff and submit</Text>
               <Text>Name</Text>
               <TextInput
                   style={styles.textInput}
                   label="Food name"
                   value={this.state.name}
                   onChangeText={this.handleNameChange}
               />

               <Text>Proteins</Text>
               <TextInput
                   style={styles.textInput}
                   label="Proteins"
                   keyboardType={'numeric'}
                   value={this.state.proteins}
                   onChangeText={this.handleProteinsChange}
               />

               <Text>Fats</Text>
               <TextInput
                   style={styles.textInput}
                   label="Fats"
                   keyboardType={'numeric'}
                   value={this.state.fats}
                   onChangeText={this.handleFatsChange}
               />
               <Text>Carbs</Text>

               <TextInput
                   style={styles.textInput}
                   label="Carbs"
                   keyboardType={'numeric'}
                   value={this.state.carbs}
                   onChangeText={this.handleCarbsChange}
               />
               */
