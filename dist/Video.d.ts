import React, { Component } from 'react';
import { View } from 'react-native';
import { VideoProps, VideoState } from './types';
export default class Video extends Component<VideoProps, VideoState> {
    _root: React.RefObject<View>;
    constructor(props: any);
    setNativeProps(nativeProps: any): void;
    seek: (time: any, tolerance?: number) => void;
    presentFullscreenPlayer: () => void;
    dismissFullscreenPlayer: () => void;
    save: (options: any) => Promise<any>;
    restoreUserInterfaceForPictureInPictureStopCompleted: (restored: any) => void;
    _hidePoster: () => void;
    _onLoadStart: (event: any) => void;
    _onLoad: (event: any) => void;
    _onError: (event: any) => void;
    _onProgress: (event: any) => void;
    _onBandwidthUpdate: (event: any) => void;
    _onSeek: (event: any) => void;
    _onEnd: () => void;
    _onTimedMetadata: (event: any) => void;
    _onFullscreenPlayerWillPresent: () => void;
    _onFullscreenPlayerDidPresent: () => void;
    _onFullscreenPlayerWillDismiss: () => void;
    _onFullscreenPlayerDidDismiss: () => void;
    _onReadyForDisplay: () => void;
    _onPlaybackStalled: () => void;
    _onPlaybackResume: (event: any) => void;
    _onPlaybackRateChange: (event: any) => void;
    _onExternalPlaybackChange: (event: any) => void;
    _onAudioBecomingNoisy: () => void;
    _onPictureInPictureStatusChanged: (event: any) => void;
    _onRestoreUserInterfaceForPictureInPictureStop: () => void;
    _onAudioFocusChanged: (event: any) => void;
    _onBuffer: (event: any) => void;
    _onGetLicense: (event: any) => void;
    getViewManagerConfig: (viewManagerName: any) => any;
    render(): JSX.Element;
}
