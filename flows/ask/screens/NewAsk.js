import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

import {Button, Input, Layout, Select} from '@ui-kitten/components';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useMutation} from '@apollo/react-hooks';
import MUTATIONS from '../../../api/mutations';

const NewAskScreen = () => {
  const [askState, setAskState] = useState({
    userProfile: {
      name: null,
    },
    comments: null,
    itemCategory: null,
  });

  const [selectedOption, setSelectedOption] = useState(0);

  const navigation = useNavigation();
  const [makeAsk] = useMutation(MUTATIONS.CREATE_ASK);

  useEffect(() => {
    if (askState && askState.itemCategory) {
      let selectedOption = null;
      // todo hook in data
      switch (askState.itemCategory) {
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
  }, [askState]);

  const onSubmit = () => {
    const variables = {
      ...askState,
      // id, todo
      itemCategory: selectedOption.text,
    };
    makeAsk({variables})
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
        {askState && (
          <Layout style={[styles.containerPadding, styles.safeFull]}>
            <Input
              value={askState.userProfile.name}
              label="Asker"
              placeholder="Who's asking?"
              onChange={event =>
                setAskState({
                  ...askState,
                  userProfile: {
                    ...askState.userProfile,
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
              value={askState.comments}
              multiline={true}
              label={'Comments'}
              textStyle={styles.minHeight64}
              placeholder="Have anything specific to ask?"
              onChange={event =>
                setAskState({...askState, comments: event.nativeEvent.text})
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

export default NewAskScreen;
