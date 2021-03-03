import React, { Component } from "react";
import { 
  StyleSheet,
  View,
  Dimensions,
  Text,
  Button } from "react-native";

import Util from './Utils';
import Video from 'react-native-video';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
  };

  componentWillMount() {
    this.resizeVideoPlayer();
  };

  render() {
    return <View 
      onLayout={this.onLayout}
      style={styles.container}>
      <Text>Here's some pre-Text</Text>
      <Video
        accessibilityLabel='player'
        ref={p => { this.videoPlayer = p; }}
        source={{
          uri:  "https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4"
        }}
        style={{width: this.state.orientationWidth, height: this.state.orientationHeight }}
        controls={true}
      />
      <Button accessibilityLabel='fullButton' title="full screen" onPress={ this.onPress.bind(this) }></Button>
    </View>
  }

  onPress() {
    //if (this.videoPlayer!=null)
      //this.videoPlayer.presentFullscreenPlayer();
    this.videoPlayer.seek(2);
    console.log(this.videoPlayer.props);
  }

  resizeVideoPlayer() {
    // Always in 16 /9 aspect ratio
    let {width, height} = Dimensions.get('window');

    if (Util.isPortrait()) {
      this.setState({
        orientationWidth: width * 0.8,
        orientationHeight: width * 0.8 * 0.56,
      });
    } else {
      this.setState({
        orientationHeight: height * 0.8,
        orientationWidth: height * 0.8 * 1.77
      });
    }
  }

  onLayout(e) {
    console.log('on layout called');
    this.resizeVideoPlayer();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
