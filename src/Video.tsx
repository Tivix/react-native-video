import React, { useRef, useState } from 'react';
import { StyleSheet, requireNativeComponent, NativeModules, View, ViewPropTypes, Image, Platform, findNodeHandle } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import TextTrackType from './TextTrackType';
import FilterType from './FilterType';
import DRMType from './DRMType';
import VideoResizeMode from './VideoResizeMode.js';
import {VideoProps} from './types';
import {toTypeString, stringsOnlyObject} from './helpers';

export default function Video(props: VideoProps) {
  const video = useRef(null);
  const [showPoster, setShowPoster] = useState<boolean>(props.poster)

  const hidePoster = () => setShowPoster(false);

  const onVideoLoad = (event) => {
    // Need to hide poster here for windows as onReadyForDisplay is not implemented
    if (Platform.OS === 'windows') {
      hidePoster();
    }
    if (props.onLoad) {
      props.onLoad(event.nativeEvent);
    }
  };

  const onGetLicense = (event) => {
    if (props.drm && props.drm.getLicense instanceof Function) {
      const data = event.nativeEvent;
      if (data && data.spcBase64) {
        const getLicenseOverride = props.drm.getLicense(data.spcBase64, data.contentId, data.licenseUrl);
        const getLicensePromise = Promise.resolve(getLicenseOverride); // Handles both scenarios, getLicenseOverride being a promise and not.
        getLicensePromise.then((result => {
          if (result !== undefined) {
            NativeModules.VideoManager.setLicenseResult(result, findNodeHandle(video));
          } else {
            NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError('Empty license result', findNodeHandle(video));
          }
        })).catch((error) => {
          NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError(error, findNodeHandle(video));
        });
      } else {
        NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError("No spc received", findNodeHandle(video));
      }
    }
  }
  const getViewManagerConfig = viewManagerName => {
    if (!NativeModules.UIManager.getViewManagerConfig) {
      return NativeModules.UIManager[viewManagerName];
    }
    return NativeModules.UIManager.getViewManagerConfig(viewManagerName);
  };

    const resizeMode = props.resizeMode;
    const source = resolveAssetSource(props.source) || {};
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
    const RCTVideoInstance = getViewManagerConfig('RCTVideo');

    if (resizeMode === VideoResizeMode.stretch) {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleToFill;
    } else if (resizeMode === VideoResizeMode.contain) {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFit;
    } else if (resizeMode === VideoResizeMode.cover) {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFill;
    } else {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleNone;
    }

    const nativeProps= {
      ...props,
      style: [styles.base, props.style],
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
        onVideoLoad,
      },
      onGetLicense: props.drm && props.drm.getLicense && onGetLicense,
    }

    const posterStyle = {
      ...StyleSheet.absoluteFillObject,
      resizeMode: props.posterResizeMode || 'contain',
    };

    return (
      <View style={nativeProps.style}>
        <RCTVideo
          ref={video}
          {...nativeProps}
          style={StyleSheet.absoluteFill}
        />
        {showPoster && (
          <Image style={posterStyle} source={{ uri: props.poster }} />
        )}
      </View>
    );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});

const RCTVideo = requireNativeComponent('RCTVideo', Video, {
  nativeOnly: {
    src: true,
    seek: true,
    fullscreen: true,
  },
});