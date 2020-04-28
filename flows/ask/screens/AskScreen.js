import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useLazyQuery} from '@apollo/react-hooks';
import QUERIES from '../../../api/queries';

import {Context as GlobalContext} from '../../../contexts/global';

const AskScreen = () => {
  const [{uuid}] = useContext(GlobalContext);

  const [asksState, setAsksState] = useState([]);

  const onCompleted = data => {
    const {asks} = data;
    setAsksState(asks);
  };

  const [loadAllAsks, {error}] = useLazyQuery(QUERIES.ALL_ASKS, {
    onCompleted,
  });

  useLayoutEffect(() => {
    loadAllAsks();
  }, [loadAllAsks]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollView}>
          {!error &&
            asksState.map((ask, askIndex) => {
              const entry = Object.entries(ask);

              return (
                <React.Fragment key={`ask-${askIndex}`}>
                  <View>
                    {entry.map((keyValue, index) => {
                      return (
                        <Text key={index}>
                          {keyValue[0]}:
                          {typeof keyValue[1] === 'object'
                            ? JSON.stringify(keyValue[1])
                            : keyValue[1]}
                        </Text>
                      );
                    })}
                  </View>
                  <View style={styles.divider} />
                </React.Fragment>
              );
            })}
          {error && <Text>Unable to get data at this time.</Text>}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    borderColor: '#aaa',
    borderWidth: 0.5,
    marginBottom: 5,
    width: '100%',
  },
  safeAreaView: {
    alignItems: 'center',
    backgroundColor: Colors.lighter,
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AskScreen;
