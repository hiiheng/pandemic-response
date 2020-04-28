import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import GiveScreen from './screens/GiveScreen';

const Stack = createStackNavigator();

const GiveFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Gives" component={GiveScreen} />
    </Stack.Navigator>
  );
};

export default GiveFlow;
