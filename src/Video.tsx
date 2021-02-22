import React, { Component } from 'react';
import { StyleSheet, requireNativeComponent, NativeModules, View, Image, Platform, findNodeHandle } from 'react-native';
import { stringsOnlyObject } from './helpers';
import { ResolvedAssetSource, VideoProps, VideoResizeMode, VideoState } from './types.d';

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});

const RCTVideo = requireNativeComponent('RCTVideo');

export default class Video extends Component<VideoProps, VideoState> {
  _root = React.createRef<View>();

  constructor(props) {
    super(props);

    this.state = {
      showPoster: !!props.poster,
    };
  }

  setNativeProps(nativeProps) {
    this._root.current.setNativeProps(nativeProps);
  }

  seek = (time, tolerance = 100) => {
    if (isNaN(time)) { throw new Error('Specified time is not a number'); }

    if (Platform.OS === 'ios') {
      this.setNativeProps({
        seek: {
          time,
          tolerance,
        },
      });
    } else {
      this.setNativeProps({ seek: time });
    }
  };

  presentFullscreenPlayer = () => {
    this.setNativeProps({ fullscreen: true });
  };

  dismissFullscreenPlayer = () => {
    this.setNativeProps({ fullscreen: false });
  };

  save = async (options) => {
    return await NativeModules.VideoManager.save(options, findNodeHandle(this._root.current));
  }

  restoreUserInterfaceForPictureInPictureStopCompleted = (restored) => {
    this.setNativeProps({ restoreUserInterfaceForPIPStopCompletionHandler: restored });
  };

  _hidePoster = () => {
    if (this.state.showPoster) {
      this.setState({ showPoster: false });
    }
  }

  _onLoadStart = (event) => {
    if (this.props.onLoadStart) {
      this.props.onLoadStart(event.nativeEvent);
    }
  };

  _onLoad = (event) => {
    // Need to hide poster here for windows as onReadyForDisplay is not implemented
    if (Platform.OS === 'windows') {
      this._hidePoster();
    }
    if (this.props.onLoad) {
      this.props.onLoad(event.nativeEvent);
    }
  };

  _onError = (event) => {
    if (this.props.onError) {
      this.props.onError(event.nativeEvent);
    }
  };

  _onProgress = (event) => {
    if (this.props.onProgress) {
      this.props.onProgress(event.nativeEvent);
    }
  };

  _onBandwidthUpdate = (event) => {
    if (this.props.onBandwidthUpdate) {
      this.props.onBandwidthUpdate(event.nativeEvent);
    }
  };

  _onSeek = (event) => {
    if (this.props.onSeek) {
      this.props.onSeek(event.nativeEvent);
    }
  };

  _onEnd = () => {
    if (this.props.onEnd) {
      this.props.onEnd();
    }
  };

  _onTimedMetadata = (event) => {
    if (this.props.onTimedMetadata) {
      this.props.onTimedMetadata(event.nativeEvent);
    }
  };

  _onFullscreenPlayerWillPresent = () => {
    if (this.props.onFullscreenPlayerWillPresent) {
      this.props.onFullscreenPlayerWillPresent();
    }
  };

  _onFullscreenPlayerDidPresent = () => {
    if (this.props.onFullscreenPlayerDidPresent) {
      this.props.onFullscreenPlayerDidPresent();
    }
  };

  _onFullscreenPlayerWillDismiss = () => {
    if (this.props.onFullscreenPlayerWillDismiss) {
      this.props.onFullscreenPlayerWillDismiss();
    }
  };

  _onFullscreenPlayerDidDismiss = () => {
    if (this.props.onFullscreenPlayerDidDismiss) {
      this.props.onFullscreenPlayerDidDismiss();
    }
  };

  _onReadyForDisplay = () => {
    if (!this.props.audioOnly) {
      this._hidePoster();
    }

    if (this.props.onReadyForDisplay) {
      this.props.onReadyForDisplay();
    }
  };

  _onPlaybackStalled = () => {
    if (this.props.onPlaybackStalled) {
      this.props.onPlaybackStalled();
    }
  };

  _onPlaybackResume = (event) => {
    if (this.props.onPlaybackResume) {
      this.props.onPlaybackResume(event.nativeEvent);
    }
  };

  _onPlaybackRateChange = (event) => {
    if (this.props.onPlaybackRateChange) {
      this.props.onPlaybackRateChange(event.nativeEvent);
    }
  };

  _onExternalPlaybackChange = (event) => {
    if (this.props.onExternalPlaybackChange) {
      this.props.onExternalPlaybackChange(event.nativeEvent);
    }
  }

  _onAudioBecomingNoisy = () => {
    if (this.props.onAudioBecomingNoisy) {
      this.props.onAudioBecomingNoisy();
    }
  };

  _onPictureInPictureStatusChanged = (event) => {
    if (this.props.onPictureInPictureStatusChanged) {
      this.props.onPictureInPictureStatusChanged(event.nativeEvent);
    }
  };

  _onRestoreUserInterfaceForPictureInPictureStop = () => {
    if (this.props.onRestoreUserInterfaceForPictureInPictureStop) {
      this.props.onRestoreUserInterfaceForPictureInPictureStop();
    }
  };

  _onAudioFocusChanged = (event) => {
    if (this.props.onAudioFocusChanged) {
      this.props.onAudioFocusChanged(event.nativeEvent);
    }
  };

  _onBuffer = (event) => {
    if (this.props.onBuffer) {
      this.props.onBuffer(event.nativeEvent);
    }
  };

  _onGetLicense = (event) => {
    if (this.props.drm && this.props.drm.getLicense instanceof Function) {
      const data = event.nativeEvent;
      if (data && data.spcBase64) {
        const getLicenseOverride = this.props.drm.getLicense(data.spcBase64, data.contentId, data.licenseUrl);
        const getLicensePromise = Promise.resolve(getLicenseOverride); // Handles both scenarios, getLicenseOverride being a promise and not.
        getLicensePromise.then((result => {
          if (result !== undefined) {
            NativeModules.VideoManager.setLicenseResult(result, findNodeHandle(this._root.current));
          } else {
            NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError('Empty license result', findNodeHandle(this._root.current));
          }
        })).catch((error) => {
          NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError(error, findNodeHandle(this._root.current));
        });
      } else {
        NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError('No spc received', findNodeHandle(this._root.current));
      }
    }
  }
  getViewManagerConfig = viewManagerName => {
    if (!NativeModules.UIManager.getViewManagerConfig) {
      return NativeModules.UIManager[viewManagerName];
    }
    return NativeModules.UIManager.getViewManagerConfig(viewManagerName);
  };

  render() {
    const resizeMode = this.props.resizeMode;
    const source = (Image.resolveAssetSource(this.props.source) || {}) as ResolvedAssetSource;
    const shouldCache = !source.__packager_asset;

    let uri = source.uri || '';
    if (uri && uri.match(/^\//)) {
      uri = `file://${uri}`;
    }

    if (!uri) {
      console.warn('Trying to load empty source.');
    }

    const isNetwork = !!(uri && uri.match(/^https?:/));
    const isAsset = !!(uri && uri.match(/^(assets-library|ipod-library|file|content|ms-appx|ms-appdata):/));

    let nativeResizeMode;
    const RCTVideoInstance = this.getViewManagerConfig('RCTVideo');

    if (resizeMode === VideoResizeMode.STRETCH) {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleToFill;
    } else if (resizeMode === VideoResizeMode.CONTAIN) {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFit;
    } else if (resizeMode === VideoResizeMode.COVER) {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFill;
    } else {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleNone;
    }

    const nativeProps = {
      ...this.props,
      style: [StyleSheet.absoluteFill, styles.base, this.props.style],
      resizeMode: nativeResizeMode,
      src: {
        uri,
        isNetwork,
        isAsset,
        shouldCache,
        type: source.type || '',
        mainVer: source.mainVer || 0,
        patchVer: source.patchVer || 0,
        requestHeaders: source.headers ? stringsOnlyObject(source.headers) : {},
      },
      onVideoLoadStart: this._onLoadStart,
      onVideoLoad: this._onLoad,
      onVideoError: this._onError,
      onVideoProgress: this._onProgress,
      onVideoSeek: this._onSeek,
      onVideoEnd: this._onEnd,
      onVideoBuffer: this._onBuffer,
      onVideoBandwidthUpdate: this._onBandwidthUpdate,
      onTimedMetadata: this._onTimedMetadata,
      onVideoAudioBecomingNoisy: this._onAudioBecomingNoisy,
      onVideoExternalPlaybackChange: this._onExternalPlaybackChange,
      onVideoFullscreenPlayerWillPresent: this._onFullscreenPlayerWillPresent,
      onVideoFullscreenPlayerDidPresent: this._onFullscreenPlayerDidPresent,
      onVideoFullscreenPlayerWillDismiss: this._onFullscreenPlayerWillDismiss,
      onVideoFullscreenPlayerDidDismiss: this._onFullscreenPlayerDidDismiss,
      onReadyForDisplay: this._onReadyForDisplay,
      onPlaybackStalled: this._onPlaybackStalled,
      onPlaybackResume: this._onPlaybackResume,
      onPlaybackRateChange: this._onPlaybackRateChange,
      onAudioFocusChanged: this._onAudioFocusChanged,
      onAudioBecomingNoisy: this._onAudioBecomingNoisy,
      onGetLicense: this.props.drm && this.props.drm.getLicense && this._onGetLicense,
      onPictureInPictureStatusChanged: this._onPictureInPictureStatusChanged,
      onRestoreUserInterfaceForPictureInPictureStop: this._onRestoreUserInterfaceForPictureInPictureStop,
    };

    const posterStyle = {
      ...StyleSheet.absoluteFillObject,
      resizeMode: this.props.posterResizeMode || 'contain',
    };

    return (
      <View style={nativeProps.style}>
        <RCTVideo
          ref={this._root}
          {...nativeProps}
        />
        {this.state.showPoster && (
          <Image style={posterStyle} source={{ uri: this.props.poster }} />
        )}
      </View>
    );
  }
}
