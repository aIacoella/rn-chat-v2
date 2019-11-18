import React from 'react';
import RNChat from './src/RNChat';
import {View, SafeAreaView} from 'react-native';
import Composer from './src/Composer';
import {
  GenericMessage,
  GenericUser,
  AttachmentType,
  VideoAttachment,
  ImageAttachment,
  AudioAttachment,
} from './src/types';
import uuid from 'uuid';
import update from 'immutability-helper';
import Video from 'react-native-video';

export default class App extends React.Component<
  {},
  {messages: GenericMessage[]; value: string}
> {
  state = {
    messages: generateMessages(1000, '2019-08-10', '2019-08-18'),
    value: '',
  };

  onChangeText = (text: string) => {
    this.setState({
      value: text,
    });
  };

  onSend = () => {
    this.setState(prevState =>
      update(prevState, {
        messages: {
          $unshift: [this.createMessage(prevState.value)],
        },
        value: {$set: ''},
      }),
    );
  };

  createMessage = (text: string) => ({
    id: uuid.v4(),
    timestamp: new Date().toString(),
    text,
    //text: getFullDate(timestamp),
    user: user,
  });

  render() {
    const {messages, value} = this.state;

    return (
      <View style={{flex: 1}}>
        <RNChat messages={messages} user={user} />
        <Composer
          onSend={this.onSend}
          onChangeText={this.onChangeText}
          value={value}
        />
      </View>
    );
  }
}

const user: GenericUser = {
  username: 'me',
  id: '1',
};

const receiver: GenericUser = {
  username: 'tu',
  id: '2',
};

export const generateMessages = (
  numMessages: number,
  from: string,
  to: string,
): GenericMessage[] => {
  let messages = [];
  const firstDay = new Date(from);
  const lastDay = new Date(to);

  for (let i = 1; i <= numMessages; i++) {
    const timestamp = new Date(
      firstDay.getTime() +
        (lastDay.getTime() - firstDay.getTime()) * (i / numMessages),
    );

    messages.unshift({
      id: uuid.v4(),
      timestamp: timestamp.toString(),
      text: LOREM.substring(Math.floor(Math.random() * LOREM.length)),
      //text: getFullDate(timestamp),
      user: Math.random() > 0.5 ? user : receiver,
    });

    if (i % 10 == 0)
      messages.unshift({
        id: uuid.v4(),
        timestamp: timestamp.toString(),
        text: LOREM.substring(Math.floor(Math.random() * 10), 25),
        system: true,
      });

    if (i % 3 == 0) {
      const video: VideoAttachment = {
        url:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        type: AttachmentType.VIDEO,
      };

      const image: ImageAttachment = {
        type: AttachmentType.IMAGE,
        url: randomImages[Math.floor(Math.random() * randomImages.length)],
      };

      const audio: AudioAttachment = {
        type: AttachmentType.AUDIO,
        url: randomAudios[Math.floor(Math.random() * randomAudios.length)],
        id: uuid.v4(),
      };

      messages.unshift({
        id: uuid.v4(),
        timestamp: timestamp.toString(),
        text: null,
        user: Math.random() > 0.5 ? user : receiver,
        attachment: audio,
      });
      messages.unshift({
        id: uuid.v4(),
        timestamp: timestamp.toString(),
        text: LOREM.substring(Math.floor(Math.random() * 10), 25),
        user: Math.random() > 0.5 ? user : receiver,
        attachment: image,
      });
    }
  }
  return messages;
};

const LOREM =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium asperiores doloribus soluta sequi perferendis repudiandae quasi in quaerat consequuntur? Voluptatum, iure? Nostrum quos corrupti quae maiores est dicta quo! Dolorum.';

const randomImages = [
  'https://images.unsplash.com/photo-1573845021869-c3b6fb5cbd23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1339&q=80',
  'https://images.unsplash.com/photo-1573844346500-abf6f6ea4ad5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80',
  'https://images.unsplash.com/flagged/photo-1573803625411-9edf9a6ae3b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
  'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1399&q=80',
  'https://images.unsplash.com/photo-1573824716346-c965cef53b67?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=554&q=80',
  'https://images.unsplash.com/photo-1573848166084-ce51f6d59675?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
];

const randomAudios = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
];
