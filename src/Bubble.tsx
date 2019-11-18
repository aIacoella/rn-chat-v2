import React, {Fragment} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  StyleProp,
  TextStyle,
} from 'react-native';
import {BubbleProps, GenericAttachment, AttachmentType} from './types';
import ParsedText from 'react-native-parsed-text';
import {dispalyTime, TimeSpan} from './Time';
import Image from 'react-native-fast-image';
import Video from 'react-native-video';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Audio from './Audio';

const videoA = require('../video.mp4');

const Bubble = ({
  item,
  showDate,
  continuation,
  userMade,
  audioPlayer,
}: BubbleProps) => {
  let video;
  const renderAttachment = (attachment: GenericAttachment) => {
    switch (attachment.type) {
      case AttachmentType.IMAGE:
        return (
          <Image
            style={styles.image}
            source={{
              uri: attachment.url,
            }}
            resizeMode={Image.resizeMode.cover}
          />
        );
      case AttachmentType.VIDEO:
        return (
          <Video
            source={videoA}
            style={styles.fullScreen}
            ref={(ref: Video) => {
              video = ref;
            }}
          />
        );
      case AttachmentType.AUDIO:
        return <Audio audio={attachment} audioPlayer={audioPlayer} />;
      default:
        break;
    }
  };

  return (
    <View
      style={[
        styles.container,
        userMade ? styles.right : styles.left,
        !continuation ? styles.newMessage : null,
      ]}>
      <Fragment>
        {item.attachment && renderAttachment(item.attachment)}
        {item.text !== null && item.text !== undefined && (
          <MessageText style={[styles.content]}>{item.text}</MessageText>
        )}
        <TimeSpan item={item} />
      </Fragment>
    </View>
  );
};

export default Bubble;

interface MessageTextProps {
  children: React.ReactNode;
  style: StyleProp<TextStyle>;
}
export const MessageText = ({children, ...rest}: MessageTextProps) => {
  return (
    <ParsedText {...rest} parse={MESSAGE_PARSER}>
      {children}
    </ParsedText>
  );
};

const OTHER_BACKGROUND_COLOR = '#FFFFFF';
const USER_BACKGROUND_COLOR = '#B2F195';

const styles = StyleSheet.create({
  fullScreen: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  container: {
    minWidth: 100,
    maxWidth: 300,
    padding: 8,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 4,
  },
  left: {
    alignSelf: 'flex-start',
    backgroundColor: OTHER_BACKGROUND_COLOR,
  },
  right: {
    alignSelf: 'flex-end',
    backgroundColor: USER_BACKGROUND_COLOR,
  },
  pressed: {
    backgroundColor: '#D1FCFF',
  },
  content: {
    fontSize: 15,
    paddingBottom: 4,
  },
  newMessage: {
    marginTop: 15,
    //backgroundColor: 'red',
  },

  link: {
    color: '#0645AD',
    textDecorationLine: 'underline',
  },
  image: {
    width: 300 - 8 * 2,
    height: 300 - 8 * 2,
    borderRadius: 4,
  },
});

const handleLinkPress = (link: string) => Alert.alert(`${link} pressed!`);

const MESSAGE_PARSER = [
  {type: 'url', style: styles.link, onPress: handleLinkPress},
  {type: 'phone', style: styles.link, onPress: handleLinkPress},
  {type: 'email', style: styles.link, onPress: handleLinkPress},
  {pattern: /#(\w+)/, style: styles.link, onPress: handleLinkPress},
];
