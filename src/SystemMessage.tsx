import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SystemMessage = ({text}: {text: string}) => {
  return <Text style={[styles.systemMessage]}>{text}</Text>;
};

export default SystemMessage;

const styles = StyleSheet.create({
  systemMessage: {
    textAlign: 'center',
    fontSize: 13,
    color: '#303030',
    alignSelf: 'center',
    marginVertical: 5,
  },
});
