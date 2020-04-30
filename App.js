import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/react-hooks';
import PushNotification from 'react-native-push-notification';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import 'react-native-gesture-handler';

import {senderId as senderID} from './app.json';
import {client} from './api/client';
import TabBar from './components/TabBar';
import env from './env';
import AirNotifier from './rest/airnotifier';

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

const {postUserDeviceToken} = AirNotifier;

const Stack = createStackNavigator();

const App = () => {
  const [{uuid}, dispatchUserInfoState] = useContext(GlobalContext);

  const [deviceToken, setDeviceToken] = useState(false);

  const onRegister = ({token: registerToken}) => {
    setDeviceToken(registerToken);
  };

  const onNotification = notification => {
    Alert.alert(notification.title, notification.message);
  };

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
    // retrieve device token
    PushNotification.configure({
      onRegister,
      onNotification,
      requestPermissions: true,
      senderID,
    });
  }, [dispatchUserInfoState]);

  useEffect(() => {
    if (deviceToken && uuid) {
      // upload token and uuid
      postUserDeviceToken(
        // eslint-disable-next-line no-undef
        new Headers({
          'Content-Type': 'application/json',
          'X-AN-APP-NAME': env.services.readAirNotifier.appName,
          'X-AN-APP-KEY': env.services.readAirNotifier.accessToken,
        }),
        JSON.stringify({
          device: Platform.OS === 'android' ? 'fcm' : 'apn',
          token: deviceToken,
          channel: 'default',
          user: uuid,
        }),
      );
    }
  }, [deviceToken, uuid]);

  return (
    <>
      <ApolloProvider client={client}>
        <ApplicationProvider {...eva} theme={eva.light}>
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
        </ApplicationProvider>
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
