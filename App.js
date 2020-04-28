import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/react-hooks';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {client} from './api/client';

import TabBar from './components/TabBar';

import GiveComponent from './flows/give';
import AskComponent from './flows/ask';
import NotificationComponent from './flows/notification';

import {
  Context as GlobalContext,
  Provider as GlobalProvider,
} from './contexts/global';

import Constants from './constants';

const uuidv4 = require('uuid/v4');

// Which is better, TopNav or Bottom?
const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const App = () => {
  const [{uuid}, dispatchUserInfoState] = useContext(GlobalContext);

  useLayoutEffect(() => {
    // Retrieve user uuid if exists, generate otherwise
    AsyncStorage.getItem(Constants.uuid)
      .then(retrievedUuid => {
        if (retrievedUuid) {
          dispatchUserInfoState({
            key: Constants.uuid,
            value: retrievedUuid,
          });
        } else {
          const newUuid = uuidv4();
          AsyncStorage.setItem(Constants.uuid, newUuid)
            .then(() =>
              dispatchUserInfoState({
                key: Constants.uuid,
                value: newUuid,
              }),
            )
            .catch(error => console.log('Unable to save uuid', error));
        }
      })
      .catch(error => console.log('Unable to retrieve', error));
  }, [dispatchUserInfoState]);

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
              <Stack.Screen name="Give" component={GiveComponent} />
              <Stack.Screen name="Ask" component={AskComponent} />
              <Stack.Screen
                name="Notifications"
                component={NotificationComponent}
              />
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

const AppWrapper = () => (
  <GlobalProvider>
    <App />
  </GlobalProvider>
);

export default AppWrapper;
