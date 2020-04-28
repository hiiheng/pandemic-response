import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import NotificationScreen from './screens/NotificationScreen';

const Stack = createStackNavigator();

const NotificationFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default NotificationFlow;
