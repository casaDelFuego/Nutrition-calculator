import AsyncStorage from '@react-native-community/async-storage'

const STORAGE_KEY = 'FOODITEMS2'

const DEFAULT_FOODITEM = [{
    id: "",
    name: "",
    proteins: "",
    fats: "",
    carbs: ""
}];

//save one item
export const saveFoodItem = async (foodItem) => {
    try {
        const jsonValue = JSON.stringify(foodItem)
        console.log('this is new food item i try to safe after it stringified in the storage func save item', jsonValue)
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch (e) {
        console.log('Error saving this food item', error)
    }
}

//retrieve - parse - push - stringify - send
export const saveUpdatedListOfFoods = async (updatedList) => {
    try {
        //console.log('string saving', STORAGE_KEY, updatedList)
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList))
    } catch (e) {
        console.log('Error saving this food item', e)
    }
}

//get one item
export const getFoodItem = async () => {
    try {
        let foodItem = await AsyncStorage.getItem(STORAGE_KEY)
        console.log(foodItem, 'this is a food item retrieved from storage')
        return foodItem ? JSON.parse(foodItem) : DEFAULT_FOODITEM
    } catch (error) {
        console.log('Error loading this food item', error);
    }
}

// get list of all items
export const getAllItems = async () => {
    try {
        let allItems = await AsyncStorage.getItem(STORAGE_KEY)
        //console.log('get all items, not raw value', JSON.parse(allItems))
        if (!allItems) return []
        allItems = JSON.parse(allItems)
        if (!Array.isArray(allItems)) return []
        return allItems
    } catch (error) {
        console.log('Error fetching all iems of food', error);
    }

}

//remove one item
export const removeItem = async (id) => {
    try {
        //console.log('we are in delete')
        let allItems = await AsyncStorage.getItem(STORAGE_KEY)
        allItems = JSON.parse(allItems)
        //filter the list and set the new one
        let newAllItems = allItems.filter(item => item.id !== id)
        saveUpdatedListOfFoods(newAllItems)
        //console.log('we save new list:', newAllItems)

    }
    catch (error) {
        console.log('Error deleting the item', error);
    }
}

//update only one item
/*export const updateOneItemInListOfFoods = async (item) => {
    try {
        const retrieveList = getAllItems()
        console.log('these are retrieved items', retrieveList)
        const soonUpdatedItem = retrieveList.find(e => e.id===item.id)
        soonUpdatedItem.name = item.name
        soonUpdatedItem.proteins = item.proteins
        soonUpdatedItem.fats = item.fats
        soonUpdatedItem.carbs = item.carbs

    }
    catch (error) {
        console.log('Error updating the one item', error);
    }
}*/

