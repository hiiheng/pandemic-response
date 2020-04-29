import React, {useContext, useLayoutEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';

import {
  Button,
  Divider,
  Layout,
  List,
  ListItem,
  Spinner,
} from '@ui-kitten/components';
import {DateFnsService} from '@ui-kitten/date-fns';
import {parseISO} from 'date-fns';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useLazyQuery} from '@apollo/react-hooks';
import QUERIES from '../../../api/queries';

import {Context as GlobalContext} from '../../../contexts/global';

const dateService = new DateFnsService();

const GiveScreen = () => {
  const [] = useContext(GlobalContext);
  const [givesState, setGivesState] = useState([]);

  const onCompleted = data => {
    const {gives} = data;
    setGivesState(gives);
  };

  const [loadAllGives, {error, loading}] = useLazyQuery(QUERIES.ALL_GIVES, {
    onCompleted,
  });

  useLayoutEffect(() => {
    loadAllGives();
  }, [loadAllGives]);

  const renderAccessory = props => {
    let statusColor = '';
    switch (props.item.status) {
      case 'Completed':
        statusColor = 'success';
        break;
      case 'Returned':
        statusColor = 'warning';
        break;
      case 'Verified':
        statusColor = 'success';
        break;
      case 'Reviewing':
        statusColor = 'primary';
        break;
      default:
        statusColor = 'basic';
    }
    return (
      <Button
        appearance={'outline'}
        size="tiny"
        style={styles.minWidth80}
        status={statusColor}>
        {props.item.status}
      </Button>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        {loading && (
          <Layout style={styles.centerSpinner}>
            <Spinner size="medium" />
          </Layout>
        )}
        {!error && (
          <List
            style={styles.width100}
            data={givesState}
            ItemSeparatorComponent={Divider}
            renderItem={(give, giveIndex) => {
              return (
                <ListItem
                  title={`${give.item.userProfile.name} gives ${give.item.itemCategory} resource`}
                  key={`give-${giveIndex}`}
                  description={`${dateService.format(
                    parseISO(give.item.createdAt),
                    'LLLL d, yyyy h:mm a',
                  )}`}
                  accessory={() => renderAccessory(give)}
                />
              );
            }}
          />
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
    minHeight: '100%',
    minWidth: '100%',
  },
  minWidth80: {
    minWidth: 80,
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

export default GiveScreen;
