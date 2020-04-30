import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import GiveScreen from './screens/Give';
import GiveDetailScreen from './screens/GiveDetail';
import NewGiveScreen from './screens/NewGive';

const Stack = createStackNavigator();

const GiveFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Gives" component={GiveScreen} />
      <Stack.Screen name="Give Detail" component={GiveDetailScreen} />
      <Stack.Screen name="Give Form" component={NewGiveScreen} />
    </Stack.Navigator>
  );
};

export default GiveFlow;
