import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, MovieDetail, Search} from '../screen';
import navigationString from '../Constant/navigationString';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={navigationString.HOME} component={Home} />
        <Stack.Screen
          name={navigationString.MOVIE_DETAIL}
          component={MovieDetail}
        />
        <Stack.Screen
          name={navigationString.SEARCH_SCREEN}
          component={Search}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
