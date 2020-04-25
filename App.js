import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/react-hooks';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {client} from './api/client';

import GiveScreen from './screens/give';
import AskScreen from './screens/ask';
import NotificationScreen from './screens/notification';

import TabBar from './components/TabBar';

// Which is better, TopNav or Bottom?
const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <SafeAreaView style={styles.flex}>
            <Tab.Navigator
              tabBar={props => <TabBar {...props} />}
              tabBarOptions={{
                activeTintColor: '#e91e63',
              }}>
              <Tab.Screen name="Give" component={GiveScreen} />
              <Tab.Screen name="Ask" component={AskScreen} />
              <Tab.Screen name="Notifications" component={NotificationScreen} />
            </Tab.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default App;
