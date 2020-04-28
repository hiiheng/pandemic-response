import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

const NotificationScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.basic}>
          <Text>Under Construction</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  basic: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationScreen;
