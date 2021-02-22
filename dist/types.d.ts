import { ViewProps, ImageResizeMode, ImageResolvedAssetSource } from 'react-native';
export declare enum DRMType {
    WIDEVINE = "widevine",
    PLAYREADY = "playready",
    CLEARKEY = "clearkey",
    FAIRPLAY = "fairplay"
}
export declare enum TextTrackType {
    SRT = "application/x-subrip",
    TTML = "application/ttml+xml",
    VTT = "text/vtt"
}
export declare enum VideoResizeMode {
    CONTAIN = "contain",
    COVER = "cover",
    STRETCH = "stretch"
}
export declare enum FilterType {
    NONE = "",
    INVERT = "CIColorInvert",
    MONOCHROME = "CIColorMonochrome",
    POSTERIZE = "CIColorPosterize",
    FALSE = "CIFalseColor",
    MAXIMUMCOMPONENT = "CIMaximumComponent",
    MINIMUMCOMPONENT = "CIMinimumComponent",
    CHROME = "CIPhotoEffectChrome",
    FADE = "CIPhotoEffectFade",
    INSTANT = "CIPhotoEffectInstant",
    MONO = "CIPhotoEffectMono",
    NOIR = "CIPhotoEffectNoir",
    PROCESS = "CIPhotoEffectProcess",
    TONAL = "CIPhotoEffectTonal",
    TRANSFER = "CIPhotoEffectTransfer",
    SEPIA = "CISepiaTone"
}
export interface DRM {
    type: DRMType;
    licenseServer: string;
    headers: Record<string, string>;
    getLicense?: (spcBase64: string, contentId: string, licenseUrl: string) => Promise<string | undefined>;
}
export interface ResolvedAssetSource extends ImageResolvedAssetSource {
    type?: string;
    mainVer?: number;
    patchVer?: string;
    headers?: Record<string, string>;
    __packager_asset?: boolean;
}
export interface TimedMetadata {
    value: string;
    identifier: string;
}
export interface OnSeekData {
    currentTime: number;
    seekTime: number;
    target?: number;
}
export interface OnLoadData {
    canPlayFastForward: boolean;
    canPlayReverse: boolean;
    canPlaySlowForward: boolean;
    canPlaySlowReverse: boolean;
    canStepBackward: boolean;
    canStepForward: boolean;
    currentTime: number;
    duration: number;
    naturalSize: {
        height: number;
        width: number;
        orientation: 'portrait' | 'landscape';
    };
}
export interface OnProgressData {
    currentTime: number;
    playableDuration: number;
    seekableDuration: number;
}
export interface OnBandwidthUpdateData {
    bitrate: number;
}
export interface LoadError {
    error: {
        '': string;
        errorString: string;
    };
}
export interface OnSeekData {
    currentTime: number;
    seekTime: number;
    target?: number;
}
export interface OnPlaybackRateData {
    playbackRate: number;
}
export interface OnPictureInPictureStatusData {
    isActive: boolean;
}
export interface OnExternalPlaybackChangeData {
    isExternalPlaybackActive: boolean;
}
export interface OnBufferData {
    isBuffering: boolean;
}
export interface OnTimedMetadataData {
    metadata: TimedMetadata[];
}
export interface BaseVideoProps extends ViewProps {
    src?: any;
    drm?: DRM;
    seek?: number;
    fullscreen?: boolean;
    fullscreenOrientation?: 'all' | 'landscape' | 'portrait';
    fullscreenAutorotate?: boolean;
    source: {
        uri?: string;
        headers?: {
            [key: string]: string;
        };
    } | number;
    minLoadRetryCount?: number;
    maxBitRate?: number;
    resizeMode?: ImageResizeMode;
    repeat?: boolean;
    automaticallyWaitsToMinimizeStalling?: boolean;
    paused?: boolean;
    muted?: boolean;
    volume?: number;
    bufferConfig?: {
        minBufferMs?: number;
        maxBufferMs?: number;
        bufferForPlaybackMs?: number;
        bufferForPlaybackAfterRebufferMs?: number;
    };
    ignoreSilentSwitch?: 'ignore' | 'obey';
    controls?: boolean;
    currentTime?: number;
    progressUpdateInterval?: number;
    allowsExternalPlayback?: boolean;
    preventsDisplaySleepDuringVideoPlayback?: boolean;
    onLoadStart?(src: {
        uri: string;
        type: string;
        isNetwork: boolean;
    }): void;
    onLoad?(data: OnLoadData): void;
    onBuffer?(data: OnBufferData): void;
    onError?(error: LoadError): void;
    onProgress?(data: OnProgressData): void;
    onBandwidthUpdate?(data: OnBandwidthUpdateData): void;
    onSeek?(data: OnSeekData): void;
    onEnd?(): void;
    onFullscreenPlayerWillPresent?(): void;
    onFullscreenPlayerDidPresent?(): void;
    onFullscreenPlayerWillDismiss?(): void;
    onFullscreenPlayerDidDismiss?(): void;
    onReadyForDisplay?(): void;
    onPlaybackResume?(data: OnPlaybackRateData): void;
    onPlaybackRateChange?(data: OnPlaybackRateData): void;
    onExternalPlaybackChange?(data: OnExternalPlaybackChangeData): void;
    onTimedMetadata?(data: OnTimedMetadataData): void;
    selectedAudioTrack?: {
        type: 'system' | 'disabled' | 'title' | 'language' | 'index';
        value?: string | number;
    };
    selectedTextTrack?: {
        type: 'system' | 'disabled' | 'title' | 'language' | 'index';
        value?: string | number;
    };
    selectedVideoTrack?: {
        type: 'auto' | 'disabled' | 'resolution' | 'index';
        value?: string | number;
    };
    textTracks?: Array<{
        title?: string;
        language?: string;
        type: 'application/x-subrip' | 'application/ttml+xml' | 'text/vtt';
        uri: string;
    }>;
    scaleX?: number;
    scaleY?: number;
    translateX?: number;
    translateY?: number;
    rotation?: number;
}
export interface VideoProps extends BaseVideoProps {
    filter?: FilterType;
    filterEnable?: boolean;
    stereoPan?: number;
    rate?: number;
    pictureInPicture?: boolean;
    playInBackground?: boolean;
    useTextureView?: boolean;
    audioOnly?: boolean;
    onPlaybackStalled?(): void;
    onAudioFocusChanged?(event: {
        hasAudioFocus: boolean;
    }): void;
    onAudioBecomingNoisy?(): void;
    onPictureInPictureStatusChanged?(data: OnPictureInPictureStatusData): void;
    onRestoreUserInterfaceForPictureInPictureStop?(): void;
    posterResizeMode?: ImageResizeMode;
    poster?: string;
    playWhenInactive?: boolean;
    reportBandwidth?: boolean;
    disableFocus?: boolean;
    hideShutterView?: boolean;
}
export interface VideoState {
    showPoster: boolean;
}
