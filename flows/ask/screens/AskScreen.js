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

const AskScreen = () => {
  const [] = useContext(GlobalContext);

  const [asksState, setAsksState] = useState([]);

  const onCompleted = data => {
    const {asks} = data;
    setAsksState(asks);
  };

  const [loadAllAsks, {error, loading}] = useLazyQuery(QUERIES.ALL_ASKS, {
    onCompleted,
  });

  useLayoutEffect(() => {
    loadAllAsks();
  }, [loadAllAsks]);

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
            data={asksState}
            ItemSeparatorComponent={Divider}
            renderItem={(ask, askIndex) => {
              return (
                <ListItem
                  title={`${ask.item.userProfile.name} asks ${ask.item.itemCategory} resource`}
                  key={`ask-${askIndex}`}
                  description={`${dateService.format(
                    parseISO(ask.item.createdAt),
                    'LLLL d, yyyy h:mm a',
                  )}`}
                  accessory={() => renderAccessory(ask)}
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
  width100: {
    width: '100%',
  },
});

export default AskScreen;
