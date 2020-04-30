import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';

import {Input, Layout, Select, Spinner} from '@ui-kitten/components';
import {DateFnsService} from '@ui-kitten/date-fns';
import {parseISO} from 'date-fns';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useLazyQuery} from '@apollo/react-hooks';
import QUERIES from '../../../api/queries';

const dateService = new DateFnsService();

const AskDetailScreen = props => {
  const [askState, setAskState] = useState(null);
  const {id} = props.route.params;
  const [selectedOption, setSelectedOption] = useState(0);

  const [load, {error, loading}] = useLazyQuery(QUERIES.ONE_ASK, {
    onCompleted: ({ask}) => setAskState(ask),
  });

  useEffect(() => {
    if (id) {
      load({variables: {id}});
    }
  }, [id, load]);

  useEffect(() => {
    if (askState && askState.itemCategory) {
      let selectedOption = null;
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

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        {loading && (
          <Layout style={[styles.centerSpinner, styles.safeFull]}>
            <Spinner size="medium" />
          </Layout>
        )}
        {askState && (
          <Layout style={[styles.containerPadding, styles.safeFull]}>
            <Input
              value={askState.userProfile.name}
              label="Asker"
              placeholder="Who's asking?"
              disabled={true}
            />
            <Select
              data={[{text: 'Household'}, {text: 'Meals'}, {text: 'Medical'}]}
              disabled={true}
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
              disabled={true}
            />
            <Text>
              Ask date:
              {` ${dateService.format(
                parseISO(askState.createdAt),
                'LLLL d, yyyy h:mm a',
              )}`}
            </Text>
          </Layout>
        )}
        {error && <Text>Unable to get data at this time.</Text>}
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

export default AskDetailScreen;
