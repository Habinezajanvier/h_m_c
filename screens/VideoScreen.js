import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { changeScreen } from '../redux/actions';

export default function VideoPlayer() {
  const dispatch = useDispatch();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  React.useEffect(() => {
    dispatch(changeScreen('Video'));
  }, []);
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) =>
          setStatus(() => status)
        }
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width * 0.5,
    marginBottom: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
