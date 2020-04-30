import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AskScreen from './screens/Ask';
import AskDetailScreen from './screens/AskDetail';
import NewAskScreen from './screens/NewAsk';

const Stack = createStackNavigator();

const AskFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Asks" component={AskScreen} />
      <Stack.Screen name="Ask Detail" component={AskDetailScreen} />
      <Stack.Screen name="Ask Form" component={NewAskScreen} />
    </Stack.Navigator>
  );
};

export default AskFlow;
