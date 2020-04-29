import React from 'react';
import {SafeAreaView} from 'react-native';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';

export default ({state, descriptors, navigation}) => {
  const onSelect = index => {
    navigation.navigate(state.routeNames[index]);
  };
  return (
    <SafeAreaView>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        {state.routes.map(route => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          return <BottomNavigationTab key={`${label}`} title={label} />;
        })}
      </BottomNavigation>
    </SafeAreaView>
  );
};
