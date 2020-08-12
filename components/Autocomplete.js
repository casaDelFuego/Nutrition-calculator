import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Component } from 'react'
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import { getAllItems } from '../storage/Storage'
import Autocomplete from 'react-native-autocomplete-input'
import { bold } from 'ansi-colors';

export default class AutocompleteComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            foods: [],
            query: ''
        }
    }
    componentDidMount() {
        getAllItems().then(result => {
            //console.log('the result from retrieving shit', result);
            let list = []
            result.forEach(res => {
                list.push(res);
            })
            return this.setState({
                foods: list
            })
        },
            error => {
                console.log(error)
            })
    }

    findFood(query) {
        //method called everytime when we change the value of the input
        if (query === '') {
            //if the query is null then return blank
            return [];
        }

        const { foods } = this.state
        //making a case insensitive regular expression to get similar value from the film json
        const regex = new RegExp(`${query.trim()}`, 'i');
        //return the filtered film array according the query from the input
        return foods.filter(food => food.name.search(regex) >= 0);
    }



    render() {
        const { query } = this.state
        const foods = this.findFood(query)
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim()
        //console.log('this is state query', this.state.query)
        return (
            <View>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={styles.autocompleteContainer}
                    //data to show in suggestion
                    data={foods.length === 1 && comp(query, foods[0].name) ? [] : foods}
                    //default value if you want to set something in input
                    defaultValue={query}
                    /*onchange of the text changing the state of the query which will trigger
                    the findFilm method to show the suggestions*/
                    onChangeText={text => this.setState({ query: text })}
                    placeholder="Enter the food name"
                    renderItem={({ item }) => (
                        //you can change the view you want to show in suggestion from here
                        <TouchableOpacity onPress={() => {
                            this.setState({ query: item.name })
                            this.props.setSelectedItem(item.name)
                        }}>
                            <Text style={styles.itemText}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
                <View style={styles.descriptionContainer}>
                    {foods.length > 0 ? (
                        <Text style={styles.infoText}>{this.state.query}</Text>
                    ) : (
                            <Text style={styles.infoText}>Enter The Food Name</Text>
                        )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 40,
    },
    autocompleteContainer: {
        flex: 1,
        marginHorizontal: 30
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 20,
        paddingBottom: 5,
        margin: 2,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 20,
        margin: 10

    },
});