import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, ListRenderItem} from 'react-native';
import {
  GenericMessage,
  GenericUser,
  UserMessage,
  AudioAttachment,
  BasicAudio,
  AttachmentType,
} from './types';
import {getFullDate, toDate, BubbleDate} from './Time';
import update from 'immutability-helper';
import SystemMessage from './SystemMessage';
import BubbleContainer from './BubbleContainer';
import uuid from 'uuid';
import AudioManager from './AudioManager';
import {OnProgressData} from 'react-native-video';

export interface RNChatProps {
  messages: GenericMessage[];
  user: GenericUser;
}

export interface RNChatState {
  audio?: BasicAudio;
  audioTimelines: {[key: string]: number};
}

export default class RNChat extends Component<RNChatProps, RNChatState> {
  audioManager: AudioManager | null = null;

  state = {
    audio: undefined,
    audioTimelines: {},
  };

  renderItem: ListRenderItem<GenericMessage> = ({item, index}) => {
    const {user: owner, messages} = this.props;

    const timestamp = toDate(item.timestamp);
    const nextMessage = messages[index + 1];
    //const system = item.system;

    let showDate = index == messages.length - 1;

    if (!showDate) {
      const nextTimestamp = toDate(nextMessage.timestamp);
      const currentDate = getFullDate(timestamp);
      const nextDate = getFullDate(nextTimestamp);
      //console.log(currentDate, nextDate);
      showDate = currentDate !== nextDate;
      //if (showDate) console.log(showDate);
    }

    const author = item.user;

    const continuation =
      nextMessage &&
      author &&
      nextMessage.user &&
      nextMessage.user.id === author.id &&
      !showDate;

    if (item.system) {
      return (
        <View>
          {showDate && <BubbleDate date={timestamp} />}
          <SystemMessage text={item.text} />
        </View>
      );
    }

    const userMessage = getUserMessage(item, timestamp);
    const {audioTimelines} = this.state;

    return (
      <View>
        {showDate && <BubbleDate date={timestamp} />}
        {item.system ? (
          <SystemMessage text={item.text} />
        ) : (
          <BubbleContainer
            item={userMessage}
            showDate={showDate}
            continuation={!!continuation}
            userMade={!!(author && owner.id === author.id)}
            //onLongPress: this.onLongPress,
            //renderTime: this.props.renderTime,
            //renderDate: this.props.renderDate,
            audioPlayer={
              item.attachment && item.attachment.type === AttachmentType.AUDIO
                ? {
                    playAudio: this.playAudio,
                    focusedAudio: this.state.audio,
                    pauseAudio: this.pauseAudio,
                    time: audioTimelines[item.attachment.id] || 0,
                  }
                : undefined
            }
          />
        )}
      </View>
    );
  };

  //AUDIO

  playAudio = (audio: AudioAttachment) => {
    console.log(audio);

    this.setState(state =>
      update(state, {
        audio: {
          $set: {
            id: audio.id,
            url: audio.url,
            isPaused: false,
          },
        },
        audioTimelines: {
          [audio.id]: {
            $apply: audioTrack => (audioTrack ? audioTrack : 0),
          },
        },
      }),
    );
  };

  pauseAudio = () => {
    this.setState(state =>
      update(state, {
        audio: {
          isPaused: {$set: true},
        },
      }),
    );
  };

  onAudioManagerLoad = () => {
    console.log('Manager loaded');
    this.setState(state =>
      update(state, {
        audio: {
          isPaused: {$set: false},
        },
      }),
    );
  };
  onAudioManagerBuffer = () => {
    console.log('Manager buffering');
  };
  onAudioManagerEnd = () => {
    console.log('Manager end');
  };
  onAudioManagerProgress = (data: OnProgressData) => {
    const percentage = data.currentTime / data.seekableDuration;
    this.setState(state => {
      if (!state.audio) return state;
      return update(state, {
        audioTimelines: {
          [state.audio.id]: {
            $set: percentage,
          },
        },
      });
    });
  };

  //Render

  render() {
    const {messages} = this.props;
    const {audio, audioTimelines} = this.state;

    return (
      <View style={styles.container}>
        <AudioManager
          ref={audioManager => (this.audioManager = audioManager)}
          audio={audio}
          onProgress={this.onAudioManagerProgress}
          onBuffer={this.onAudioManagerBuffer}
          onEnd={this.onAudioManagerEnd}
          onLoad={this.onAudioManagerLoad}
        />
        <FlatList
          data={messages}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          inverted
          removeClippedSubviews={true}
          windowSize={31}
          maxToRenderPerBatch={30}
          extraData={{audio, audioTimelines}}
        />
      </View>
    );
  }

  keyExtractor = (item: GenericMessage) => item.id;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  audioPlayer: {
    height: 0,
  },
});

const getUserMessage = (item: GenericMessage, timestamp: Date): UserMessage => {
  if (item.user)
    return {
      ...item,
      timestamp,
      user: item.user,
    };
  else
    return {
      ...item,
      timestamp,
      user: {
        id: uuid.v4(),
      },
    };
};
