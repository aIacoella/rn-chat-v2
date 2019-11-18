import React from 'react';
import {View, Text} from 'react-native';
import {UserMessage, BubbleProps} from './types';
import Bubble from './Bubble';


const BubbleContainer = (props: BubbleProps) => {
  return (
    <View>
      <Bubble {...props} />
    </View>
  );
};

export default BubbleContainer;
