import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
    // Set the header title on the parent stack navigator depending on the
    // currently active tab. Learn more in the documentation:
    // https://reactnavigation.org/docs/en/screen-options-resolution.html
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Calculator',
                    // changeD the icon=)
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-calculator" />,
                }}
            />
            <BottomTab.Screen
                name="Add"
                component={AddScreen}
                options={{
                    title: 'Add foods',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add-circle-outline" />,
                }}
            />
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state ?.routes[route.state.index] ?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Home':
            return 'Calculator';
        case 'Add':
            return 'Add new food info';
    }
}
