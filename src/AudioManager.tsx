import React from 'react';
import {StyleSheet} from 'react-native';
import AudioPlayer, {OnProgressData} from 'react-native-video';
import {BasicAudio} from './types';

interface AudioManagerProps {
  audio?: BasicAudio;
  onBuffer: () => void;
  onEnd: () => void;
  onProgress: (data: OnProgressData) => void;
  onLoad: () => void;
}

export default class AudioManager extends React.Component<AudioManagerProps> {
  audioPlayer: AudioPlayer | null = null;

  onPress = () => {
    
  }

  render() {
    const {audio, onBuffer, onEnd, onProgress, onLoad} = this.props;
    if (!audio) return null;

    return (
      <AudioPlayer
        style={styles.audioPlayer}
        ref={audioPlayer => (this.audioPlayer = audioPlayer)}
        source={{uri: audio.url}}
        paused={audio.isPaused}
        onBuffer={onBuffer}
        onEnd={onEnd}
        onProgress={onProgress}
        onLoad={onLoad}
        audioOnly={true}
        progressUpdateInterval={1000}
      />
    );
  }
}

const styles = StyleSheet.create({
  audioPlayer: {
    height: 0,
  },
});
