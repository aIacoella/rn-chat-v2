import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AudioAttachment, BasicAudio, AudioPlayer} from './types';

interface AudioProps {
  audioPlayer: AudioPlayer;
  audio: AudioAttachment;
}

const AudioLineWidth = 200;
const Audio = ({
  audioPlayer: {playAudio, focusedAudio, pauseAudio, time},
  audio,
}: AudioProps) => {
  return (
    <View style={styles.container}>
      {!focusedAudio ||
      focusedAudio.id !== audio.id ||
      focusedAudio.isPaused ? (
        <TouchableOpacity onPress={() => playAudio(audio)}>
          <Text>Play</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={pauseAudio}>
          <Text>Pause</Text>
        </TouchableOpacity>
      )}
      <AudioLine value={time * AudioLineWidth} />
    </View>
  );
};

export default Audio;

const AudioLine = ({value}: {value: number}) => {
  return (
    <View style={styles.audioLineContainer}>
      <View style={styles.audioLine}>
        <View style={styles.backgroundLine} />
        <View style={[styles.activeLine, {width: value}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  audioLineContainer: {
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioLine: {
    position: 'relative',
    width: AudioLineWidth,
    height: 2,
  },
  backgroundLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#c4c4c4',
  },
  activeLine: {
    position: 'absolute',
    left: 0,
    height: 2,
    backgroundColor: '#405345',
  },
});
