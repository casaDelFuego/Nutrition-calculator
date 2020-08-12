import * as WebBrowser from 'expo-web-browser';
import { Component } from 'react'
import * as React from 'react';
import { Image, VirtualizedList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { getAllItems } from '../storage/Storage'
import AutocompleteComponent from './../components/Autocomplete'


export default class HomeScreen extends Component {
    constructor() {
        super()

        this.state = {
            name: "",
            gramms: "",
            totalNumberOfProteins: "",
            totalNumberOfFats: "",
            totalNumberOfCarbs: ""
        }

        //this.handleNameChange = this.handleNameChange.bind(this)
        this.handleGrammsChange = this.handleGrammsChange.bind(this)
        this.calculate = this.calculate.bind(this)
        this.setSelectedItem = this.setSelectedItem.bind(this)
    }

    /*handleNameChange(name) {
        this.setState({ name })
    }*/

    handleGrammsChange(gramms) {
        this.setState({ gramms })
    }

    setSelectedItem(item) {
        console.log('this is our selected item', item)
        this.setState({ name: item })
    }


    async calculate() {
        console.log('these are things that are going to calc', this.state)
        const particularFoodObject = await getAllItems().then(result => {
            let list = []
            result.forEach(res => {
                list.push(res);
            })
            const neededFood = list.find(e => e.name === this.state.name)
            console.log('our needed food', neededFood)
            return neededFood
        },
            error => {
                console.log(error)
            })
        console.log('part obj', particularFoodObject)
        const procentageOfGramms = parseFloat(this.state.gramms) / 100
        console.log('procentageOfGramms', procentageOfGramms)
        const parsedProtein = parseFloat(particularFoodObject.proteins)
        const parsedFat = parseFloat(particularFoodObject.fats)
        const parsedCarb = parseFloat(particularFoodObject.carbs)
        console.log('you parsed some shit', parsedProtein, parsedCarb, parsedFat)

        this.setState({
            totalNumberOfProteins: parsedProtein * procentageOfGramms,
            totalNumberOfFats: parsedFat * procentageOfGramms,
            totalNumberOfCarbs: parsedCarb * procentageOfGramms
        })

    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <AutocompleteComponent setSelectedItem={this.setSelectedItem} />

                <TextInput
                    style={styles.textInput}
                    placeholder="How much"
                    keyboardType={'numeric'}
                    value={this.state.gramms}
                    onChangeText={this.handleGrammsChange}
                />
                <Text style={styles.title}>{this.state.gramms}</Text>

                <TouchableOpacity style={styles.calculateButton} onPress={this.calculate}>
                    <Text style={styles.calculateButtonText}>Calculate</Text>
                </TouchableOpacity>

                <View style={styles.getStartedContainer}>
                    <Text style={styles.title}>Result</Text>
                    <Text style={styles.text}>Protein: {this.state.totalNumberOfProteins}</Text>
                    <Text style={styles.text}>Fat: {this.state.totalNumberOfFats}</Text>
                    <Text style={styles.text}>Carbs: {this.state.totalNumberOfCarbs}</Text>

                </View>
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 10,
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderWidth: 1,
        height: 40,
        fontSize: 15,
        paddingLeft: 5,
        marginLeft: 30,
        marginRight: 30
    },
    calculateButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        marginHorizontal: 30
    },
    calculateButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    },
    text: {
        marginLeft: 30,
        fontSize: 25,
        marginTop: 8

    },
    title: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center'
    }
})

/**
 *  <TextInput
                        style={styles.textInput}
                        placeholder="what"
                        value={this.state.name}
                        onChangeText={this.handleNameChange}
                    />
 */