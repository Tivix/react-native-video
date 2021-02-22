"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const helpers_1 = require("./helpers");
const types_d_1 = require("./types.d");
const styles = react_native_1.StyleSheet.create({
    base: {
        overflow: 'hidden',
    },
});
const RCTVideo = react_native_1.requireNativeComponent('RCTVideo');
class Video extends react_1.Component {
    constructor(props) {
        super(props);
        this._root = react_1.default.createRef();
        this.seek = (time, tolerance = 100) => {
            if (isNaN(time)) {
                throw new Error('Specified time is not a number');
            }
            if (react_native_1.Platform.OS === 'ios') {
                this.setNativeProps({
                    seek: {
                        time,
                        tolerance,
                    },
                });
            }
            else {
                this.setNativeProps({ seek: time });
            }
        };
        this.presentFullscreenPlayer = () => {
            this.setNativeProps({ fullscreen: true });
        };
        this.dismissFullscreenPlayer = () => {
            this.setNativeProps({ fullscreen: false });
        };
        this.save = (options) => __awaiter(this, void 0, void 0, function* () {
            return yield react_native_1.NativeModules.VideoManager.save(options, react_native_1.findNodeHandle(this._root.current));
        });
        this.restoreUserInterfaceForPictureInPictureStopCompleted = (restored) => {
            this.setNativeProps({ restoreUserInterfaceForPIPStopCompletionHandler: restored });
        };
        this._hidePoster = () => {
            if (this.state.showPoster) {
                this.setState({ showPoster: false });
            }
        };
        this._onLoadStart = (event) => {
            if (this.props.onLoadStart) {
                this.props.onLoadStart(event.nativeEvent);
            }
        };
        this._onLoad = (event) => {
            // Need to hide poster here for windows as onReadyForDisplay is not implemented
            if (react_native_1.Platform.OS === 'windows') {
                this._hidePoster();
            }
            if (this.props.onLoad) {
                this.props.onLoad(event.nativeEvent);
            }
        };
        this._onError = (event) => {
            if (this.props.onError) {
                this.props.onError(event.nativeEvent);
            }
        };
        this._onProgress = (event) => {
            if (this.props.onProgress) {
                this.props.onProgress(event.nativeEvent);
            }
        };
        this._onBandwidthUpdate = (event) => {
            if (this.props.onBandwidthUpdate) {
                this.props.onBandwidthUpdate(event.nativeEvent);
            }
        };
        this._onSeek = (event) => {
            if (this.props.onSeek) {
                this.props.onSeek(event.nativeEvent);
            }
        };
        this._onEnd = () => {
            if (this.props.onEnd) {
                this.props.onEnd();
            }
        };
        this._onTimedMetadata = (event) => {
            if (this.props.onTimedMetadata) {
                this.props.onTimedMetadata(event.nativeEvent);
            }
        };
        this._onFullscreenPlayerWillPresent = () => {
            if (this.props.onFullscreenPlayerWillPresent) {
                this.props.onFullscreenPlayerWillPresent();
            }
        };
        this._onFullscreenPlayerDidPresent = () => {
            if (this.props.onFullscreenPlayerDidPresent) {
                this.props.onFullscreenPlayerDidPresent();
            }
        };
        this._onFullscreenPlayerWillDismiss = () => {
            if (this.props.onFullscreenPlayerWillDismiss) {
                this.props.onFullscreenPlayerWillDismiss();
            }
        };
        this._onFullscreenPlayerDidDismiss = () => {
            if (this.props.onFullscreenPlayerDidDismiss) {
                this.props.onFullscreenPlayerDidDismiss();
            }
        };
        this._onReadyForDisplay = () => {
            if (!this.props.audioOnly) {
                this._hidePoster();
            }
            if (this.props.onReadyForDisplay) {
                this.props.onReadyForDisplay();
            }
        };
        this._onPlaybackStalled = () => {
            if (this.props.onPlaybackStalled) {
                this.props.onPlaybackStalled();
            }
        };
        this._onPlaybackResume = (event) => {
            if (this.props.onPlaybackResume) {
                this.props.onPlaybackResume(event.nativeEvent);
            }
        };
        this._onPlaybackRateChange = (event) => {
            if (this.props.onPlaybackRateChange) {
                this.props.onPlaybackRateChange(event.nativeEvent);
            }
        };
        this._onExternalPlaybackChange = (event) => {
            if (this.props.onExternalPlaybackChange) {
                this.props.onExternalPlaybackChange(event.nativeEvent);
            }
        };
        this._onAudioBecomingNoisy = () => {
            if (this.props.onAudioBecomingNoisy) {
                this.props.onAudioBecomingNoisy();
            }
        };
        this._onPictureInPictureStatusChanged = (event) => {
            if (this.props.onPictureInPictureStatusChanged) {
                this.props.onPictureInPictureStatusChanged(event.nativeEvent);
            }
        };
        this._onRestoreUserInterfaceForPictureInPictureStop = () => {
            if (this.props.onRestoreUserInterfaceForPictureInPictureStop) {
                this.props.onRestoreUserInterfaceForPictureInPictureStop();
            }
        };
        this._onAudioFocusChanged = (event) => {
            if (this.props.onAudioFocusChanged) {
                this.props.onAudioFocusChanged(event.nativeEvent);
            }
        };
        this._onBuffer = (event) => {
            if (this.props.onBuffer) {
                this.props.onBuffer(event.nativeEvent);
            }
        };
        this._onGetLicense = (event) => {
            if (this.props.drm && this.props.drm.getLicense instanceof Function) {
                const data = event.nativeEvent;
                if (data && data.spcBase64) {
                    const getLicenseOverride = this.props.drm.getLicense(data.spcBase64, data.contentId, data.licenseUrl);
                    const getLicensePromise = Promise.resolve(getLicenseOverride); // Handles both scenarios, getLicenseOverride being a promise and not.
                    getLicensePromise.then((result => {
                        if (result !== undefined) {
                            react_native_1.NativeModules.VideoManager.setLicenseResult(result, react_native_1.findNodeHandle(this._root.current));
                        }
                        else {
                            react_native_1.NativeModules.VideoManager.setLicenseError && react_native_1.NativeModules.VideoManager.setLicenseError('Empty license result', react_native_1.findNodeHandle(this._root.current));
                        }
                    })).catch((error) => {
                        react_native_1.NativeModules.VideoManager.setLicenseError && react_native_1.NativeModules.VideoManager.setLicenseError(error, react_native_1.findNodeHandle(this._root.current));
                    });
                }
                else {
                    react_native_1.NativeModules.VideoManager.setLicenseError && react_native_1.NativeModules.VideoManager.setLicenseError('No spc received', react_native_1.findNodeHandle(this._root.current));
                }
            }
        };
        this.getViewManagerConfig = viewManagerName => {
            if (!react_native_1.NativeModules.UIManager.getViewManagerConfig) {
                return react_native_1.NativeModules.UIManager[viewManagerName];
            }
            return react_native_1.NativeModules.UIManager.getViewManagerConfig(viewManagerName);
        };
        this.state = {
            showPoster: !!props.poster,
        };
    }
    setNativeProps(nativeProps) {
        this._root.current.setNativeProps(nativeProps);
    }
    render() {
        const resizeMode = this.props.resizeMode;
        const source = (react_native_1.Image.resolveAssetSource(this.props.source) || {});
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
        if (resizeMode === types_d_1.VideoResizeMode.STRETCH) {
            nativeResizeMode = RCTVideoInstance.Constants.ScaleToFill;
        }
        else if (resizeMode === types_d_1.VideoResizeMode.CONTAIN) {
            nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFit;
        }
        else if (resizeMode === types_d_1.VideoResizeMode.COVER) {
            nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFill;
        }
        else {
            nativeResizeMode = RCTVideoInstance.Constants.ScaleNone;
        }
        const nativeProps = Object.assign(Object.assign({}, this.props), { style: [react_native_1.StyleSheet.absoluteFill, styles.base, this.props.style], resizeMode: nativeResizeMode, src: {
                uri,
                isNetwork,
                isAsset,
                shouldCache,
                type: source.type || '',
                mainVer: source.mainVer || 0,
                patchVer: source.patchVer || 0,
                requestHeaders: source.headers ? helpers_1.stringsOnlyObject(source.headers) : {},
            }, onVideoLoadStart: this._onLoadStart, onVideoLoad: this._onLoad, onVideoError: this._onError, onVideoProgress: this._onProgress, onVideoSeek: this._onSeek, onVideoEnd: this._onEnd, onVideoBuffer: this._onBuffer, onVideoBandwidthUpdate: this._onBandwidthUpdate, onTimedMetadata: this._onTimedMetadata, onVideoAudioBecomingNoisy: this._onAudioBecomingNoisy, onVideoExternalPlaybackChange: this._onExternalPlaybackChange, onVideoFullscreenPlayerWillPresent: this._onFullscreenPlayerWillPresent, onVideoFullscreenPlayerDidPresent: this._onFullscreenPlayerDidPresent, onVideoFullscreenPlayerWillDismiss: this._onFullscreenPlayerWillDismiss, onVideoFullscreenPlayerDidDismiss: this._onFullscreenPlayerDidDismiss, onReadyForDisplay: this._onReadyForDisplay, onPlaybackStalled: this._onPlaybackStalled, onPlaybackResume: this._onPlaybackResume, onPlaybackRateChange: this._onPlaybackRateChange, onAudioFocusChanged: this._onAudioFocusChanged, onAudioBecomingNoisy: this._onAudioBecomingNoisy, onGetLicense: this.props.drm && this.props.drm.getLicense && this._onGetLicense, onPictureInPictureStatusChanged: this._onPictureInPictureStatusChanged, onRestoreUserInterfaceForPictureInPictureStop: this._onRestoreUserInterfaceForPictureInPictureStop });
        const posterStyle = Object.assign(Object.assign({}, react_native_1.StyleSheet.absoluteFillObject), { resizeMode: this.props.posterResizeMode || 'contain' });
        return (react_1.default.createElement(react_native_1.View, { style: nativeProps.style },
            react_1.default.createElement(RCTVideo, Object.assign({ ref: this._root }, nativeProps)),
            this.state.showPoster && (react_1.default.createElement(react_native_1.Image, { style: posterStyle, source: { uri: this.props.poster } }))));
    }
}
exports.default = Video;
