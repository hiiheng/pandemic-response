import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AskScreen from './screens/AskScreen';

const Stack = createStackNavigator();

const AskFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Asks" component={AskScreen} />
    </Stack.Navigator>
  );
};

export default AskFlow;
