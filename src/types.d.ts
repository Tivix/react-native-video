import { ViewProps, ImageResizeMode } from 'react-native';

export enum DRMType {
  WIDEVINE = 'widevine',
  PLAYREADY = 'playready',
  CLEARKEY = 'clearkey',
  FAIRPLAY = 'fairplay'
}

export enum FilterType {
  NONE = '',
  INVERT = 'CIColorInvert',
  MONOCHROME = 'CIColorMonochrome',
  POSTERIZE = 'CIColorPosterize',
  FALSE = 'CIFalseColor',
  MAXIMUMCOMPONENT = 'CIMaximumComponent',
  MINIMUMCOMPONENT = 'CIMinimumComponent',
  CHROME = 'CIPhotoEffectChrome',
  FADE = 'CIPhotoEffectFade',
  INSTANT = 'CIPhotoEffectInstant',
  MONO = 'CIPhotoEffectMono',
  NOIR = 'CIPhotoEffectNoir',
  PROCESS = 'CIPhotoEffectProcess',
  TONAL = 'CIPhotoEffectTonal',
  TRANSFER = 'CIPhotoEffectTransfer',
  SEPIA = 'CISepiaTone',
}

export enum TextTrackType {
  SRT = 'application/x-subrip',
  TTML = 'application/ttml+xml',
  VTT = 'text/vtt',
}

export enum VideoResizeMode {
  CONTAIN = 'contain',
  COVER = 'cover',
  STRETCH = 'stretch',
}

export interface VideoProps extends ViewProps {
    filter?: FilterType;
    filterEnabled?: boolean;

    /* Native only */
    src?: object;
    seek?: number | object;
    fullscreen?: boolean;
    onVideoLoadStart?: () => void;
    onVideoLoad?: () => void;
    onVideoBuffer?: () => void;
    onVideoError?: () => void;
    onVideoProgress?: () => void;
    onVideoBandwidthUpdate?: () => void;
    onVideoSeek?: () => void;
    onVideoEnd?: () => void;
    onTimedMetadata?: () => void;
    onVideoAudioBecomingNoisy?: () => void;
    onVideoExternalPlaybackChange?: () => void;
    onVideoFullscreenPlayerWillPresent?: () => void;
    onVideoFullscreenPlayerDidPresent?: () => void;
    onVideoFullscreenPlayerWillDismiss?: () => void;
    onVideoFullscreenPlayerDidDismiss?: () => void;
  
    /* Wrapper component */
    source?: 
      {
        uri?: string;
      } |
      // Opaque type returned by require('./video.mp4')
      number;
    drm?: {
      type?: DRMType;
      licenseServer?: string;
      headers?: {};
      base64Certificate?: boolean;
      certificateUrl?: string;
      getLicense?: () => void;
    };
    minLoadRetryCount?: number;
    maxBitRate?: number;
    resizeMode?: string;
    poster?: string;
    posterResizeMode?: ImageResizeMode;
    repeat?: boolean;
    automaticallyWaitsToMinimizeStalling?: boolean;
    allowsExternalPlayback?: boolean;
    selectedAudioTrack?: {
      type: string;
      value: string| number;
    };
    selectedVideoTrack?: {
      type: string;
      value: string | number
    };
    selectedTextTrack?: {
      type: string;
      value: string | number
    };
    textTracks?: {
        title?: string;
        uri: string;
        type?: TextTrackType;
        language: string;
      }[];
    paused?: boolean;
    muted?: boolean;
    volume?: number
    bufferConfig?: {
      minBufferMs?: number
      maxBufferMs?: number
      bufferForPlaybackMs?: number
      bufferForPlaybackAfterRebufferMs?: number
    };
    stereoPan?: number
    rate?: number
    pictureInPicture?: boolean;
    playInBackground?: boolean;
    preferredForwardBufferDuration?: number
    playWhenInactive?: boolean;
    ignoreSilentSwitch?: 'ignore' |'obey';
    reportBandwidth?: boolean;
    disableFocus?: boolean;
    controls?: boolean;
    audioOnly?: boolean;
    currentTime?: number
    fullscreenAutorotate?: boolean;
    fullscreenOrientation?: 'all'|'landscape'| 'portrait';
    progressUpdateInterval?: number
    useTextureView?: boolean;
    hideShutterView?: boolean;
    onLoadStart?: () => void;
    onLoad?: () => void;
    onBuffer?: () => void;
    onError?: () => void;
    onProgress?: () => void;
    onBandwidthUpdate?: () => void;
    onSeek?: () => void;
    onEnd?: () => void;
    onFullscreenPlayerWillPresent?: () => void;
    onFullscreenPlayerDidPresent?: () => void;
    onFullscreenPlayerWillDismiss?: () => void;
    onFullscreenPlayerDidDismiss?: () => void;
    onReadyForDisplay?: () => void;
    onPlaybackStalled?: () => void;
    onPlaybackResume?: () => void;
    onPlaybackRateChange?: () => void;
    onAudioFocusChanged?: () => void;
    onAudioBecomingNoisy?: () => void;
    onPictureInPictureStatusChanged?: () => void;
    needsToRestoreUserInterfaceForPictureInPictureStop?: () => void;
    onExternalPlaybackChange?: () => void;
  }
