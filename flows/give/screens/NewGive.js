import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

import {Button, Input, Layout, Select} from '@ui-kitten/components';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useMutation} from '@apollo/react-hooks';
import MUTATIONS from '../../../api/mutations';

const NewGiveScreen = () => {
  const [giveState, setGiveState] = useState({
    userProfile: {
      name: null,
    },
    comments: null,
    itemCategory: null,
  });

  const [selectedOption, setSelectedOption] = useState(0);

  const navigation = useNavigation();
  const [makeGive] = useMutation(MUTATIONS.CREATE_GIVE);

  useEffect(() => {
    if (giveState && giveState.itemCategory) {
      let selectedOption = null;
      // todo hook in data
      switch (giveState.itemCategory) {
        case 'Household':
          selectedOption = {text: 'Household'};
          break;
        case 'Meals':
          selectedOption = {text: 'Meals'};
          break;
        case 'Medical':
          selectedOption = {text: 'Medical'};
          break;
      }
      setSelectedOption(selectedOption);
    }
  }, [giveState]);

  const onSubmit = () => {
    const variables = {
      ...giveState,
      // id, todo
      itemCategory: selectedOption.text,
    };
    makeGive({variables})
      .then(success => {
        console.log('Submission was successful!');
      })
      .catch(error => {
        console.warn('Submission failed!');
      })
      .finally(() => {
        navigation.dispatch(StackActions.popToTop());
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        {giveState && (
          <Layout style={[styles.containerPadding, styles.safeFull]}>
            <Input
              value={giveState.userProfile.name}
              label="Giver"
              placeholder="Who's giving?"
              onChange={event =>
                setGiveState({
                  ...giveState,
                  userProfile: {
                    ...giveState.userProfile,
                    name: event.nativeEvent.text,
                  },
                })
              }
            />
            <Select
              // todo hook in data
              data={[{text: 'Household'}, {text: 'Meals'}, {text: 'Medical'}]}
              label={'Category'}
              selectedOption={selectedOption}
              onSelect={index => setSelectedOption(index)}
            />
            <Input
              value={giveState.comments}
              multiline={true}
              label={'Comments'}
              textStyle={styles.minHeight64}
              placeholder="Have anything specific to give?"
              onChange={event =>
                setGiveState({...giveState, comments: event.nativeEvent.text})
              }
            />
            <Button onPress={onSubmit}>Submit</Button>
          </Layout>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  centerSpinner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPadding: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  minHeight64: {
    minHeight: 64,
  },
  minWidth80: {
    minWidth: 80,
  },
  safeFull: {
    minHeight: '100%',
    minWidth: '100%',
  },
  safeAreaView: {
    alignItems: 'center',
    backgroundColor: Colors.lighter,
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  width100: {
    width: '100%',
  },
});

export default NewGiveScreen;
