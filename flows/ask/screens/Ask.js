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
import {useNavigation} from '@react-navigation/native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useLazyQuery} from '@apollo/react-hooks';
import QUERIES from '../../../api/queries';

import {Context as GlobalContext} from '../../../contexts/global';
import createdAtOrderBy from '../../../constants/enum/created-at';

const dateService = new DateFnsService();

const AskScreen = () => {
  const [] = useContext(GlobalContext);

  const [asksState, setAsksState] = useState([]);

  const navigation = useNavigation();

  const onCompleted = ({asksConnection}) => {
    const asks = asksConnection.edges;
    setAsksState(asks);
  };

  const [loadAllAsks, {error, loading}] = useLazyQuery(QUERIES.VariableAsks, {
    onCompleted,
  });

  useLayoutEffect(() => {
    loadAllAsks({variables: {orderBy: createdAtOrderBy.Desc}});
  }, [loadAllAsks]);

  const renderAccessory = props => {
    let statusColor = '';
    switch (props.status) {
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
        {props.status}
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
            renderItem={(edge, edgeIndex) => {
              const ask = edge.item.node;
              return (
                <ListItem
                  title={`${ask.userProfile.name} asks ${ask.itemCategory} resource`}
                  key={`ask-${edgeIndex}`}
                  description={`${dateService.format(
                    parseISO(ask.createdAt),
                    'LLLL d, yyyy h:mm a',
                  )}`}
                  accessory={() => renderAccessory(ask)}
                  onPress={() =>
                    navigation.navigate('Ask Detail', {id: ask.id})
                  }
                />
              );
            }}
          />
        )}
        {error && <Text>Unable to get data at this time.</Text>}
        <Button
          style={styles.actionButton}
          onPress={() => navigation.navigate('Ask Form')}>
          I want to ask
        </Button>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    width: '85%',
    marginBottom: 10,
  },
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
    height: '100%',
    justifyContent: 'space-between',
  },
  width100: {
    width: '100%',
  },
});

export default AskScreen;
