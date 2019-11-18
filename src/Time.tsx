import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {UserMessage} from './types';

export const BubbleDate = ({date}: {date: Date}): React.ReactElement => {
  return (
    <Text style={styles.date}>
      {date.getDate() +
        ' ' +
        MONTHS[date.getMonth()] +
        ' ' +
        date.getFullYear()}
    </Text>
  );
};

interface TimeSpanProps {
  item: UserMessage;
}
export const TimeSpan = (props: TimeSpanProps) => {
  return <Text style={[styles.time]}>{dispalyTime(props.item.timestamp)}</Text>;
};

type ToDate = (date: Date | string) => Date;
export const toDate: ToDate = date => {
  if (date instanceof Date) return date;
  return new Date(date);
};

type GetFullDateProp = (date: Date) => string;
export const getFullDate: GetFullDateProp = date =>
  date.getDate() + '' + date.getMonth() + '' + date.getFullYear();

const styles = StyleSheet.create({
  date: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
    marginVertical: 4,
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 12,
  },
});

export const dispalyTime = (timestamp: Date) => {
  return (
    addZeros(String(timestamp.getHours())) +
    ':' +
    addZeros(String(timestamp.getMinutes()))
  );
};

export const addZeros = (str: string) => {
  if (str.length < 2) return '0' + str;
  else return str;
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
