import React, {useState, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useLazyQuery} from '@apollo/react-hooks';
import QUERIES from '../../api/queries';

const GiveScreen = () => {
  const [givesState, setGivesState] = useState([]);

  const onCompleted = data => {
    const {gives} = data;
    setGivesState(gives);
  };

  const [loadAllGives, {error}] = useLazyQuery(QUERIES.ALL_GIVES, {
    onCompleted,
  });

  useLayoutEffect(() => {
    loadAllGives();
  }, [loadAllGives]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <Text>Gives</Text>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollView}>
          {!error &&
            givesState.map((give, giveIndex) => {
              const entry = Object.entries(give);
              return (
                <React.Fragment key={`give-${giveIndex}`}>
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

export default GiveScreen;
