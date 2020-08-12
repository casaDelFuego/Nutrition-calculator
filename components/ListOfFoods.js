import * as React from 'react'
import { Component } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { getAllItems } from './../storage/Storage'
import EditDelete from './../components/EditDelete'

export default class ListOfFoods extends Component {

    constructor(props) {
        super(props)

        this.state = {
            foods: [],
            openedItemId: null
        }
        this.openOneFoodItem = this.openOneFoodItem.bind(this)
        this.closeEditingField = this.closeEditingField.bind(this)
        this.refresh = this.refresh.bind(this)

    }

    refresh() {
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

    openOneFoodItem = (id) => {
        { this.setState({ openedItemId: id }) }
    }

    closeEditingField() {
        this.setState({ openedItemId: null })
        console.log('parent got the msgs')

    }

    render() {
        this.refresh()
        const items = this.state.foods
            //.sort((a, b) => a.name.localeCompare(b.name))
            .map(food =>
                (<TouchableOpacity key={food.id} style={styles.listItem} onPress={() => this.openOneFoodItem(food.id)}>
                    <Text style={styles.text}>{food.name}
                    </Text>
                    {this.state.openedItemId === food.id ? <EditDelete food={food} passMsg={this.closeEditingField} /> : null}
                </TouchableOpacity>
                ))
        return (
            <View style={styles.container}>
                <Text style={styles.title}>List of existing foods:</Text>
                {items}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#fafafa',
    },
    listItem: {
        //height: 50,
        margin: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: '#ededed',

    },
    text: {
        fontSize: 20,
        margin: 5
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 5
    }
})