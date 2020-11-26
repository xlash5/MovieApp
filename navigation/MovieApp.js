import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import PlayerScreen from '../screens/PlayerScreen';
import { Palette } from '../constants/Colors';

const Stack = createStackNavigator();

const defaultOptions = {
    headerStyle: {
        backgroundColor: Palette.primary,
        shadowOpacity: 0,
        elevation: 0,
    },
    headerTitleStyle: { color: Palette.textColor },
    headerTintColor: Palette.textColor,

};

const headerHidden = { headerShown: false };

function MovieApp() {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Home" component={HomeScreen} options={headerHidden} />
                <Stack.Screen name="Details" component={DetailsScreen} options={defaultOptions} />
                <Stack.Screen name="Player" component={PlayerScreen} options={headerHidden} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MovieApp;