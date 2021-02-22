"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterType = exports.VideoResizeMode = exports.TextTrackType = exports.DRMType = void 0;
var DRMType;
(function (DRMType) {
    DRMType["WIDEVINE"] = "widevine";
    DRMType["PLAYREADY"] = "playready";
    DRMType["CLEARKEY"] = "clearkey";
    DRMType["FAIRPLAY"] = "fairplay";
})(DRMType = exports.DRMType || (exports.DRMType = {}));
var TextTrackType;
(function (TextTrackType) {
    TextTrackType["SRT"] = "application/x-subrip";
    TextTrackType["TTML"] = "application/ttml+xml";
    TextTrackType["VTT"] = "text/vtt";
})(TextTrackType = exports.TextTrackType || (exports.TextTrackType = {}));
var VideoResizeMode;
(function (VideoResizeMode) {
    VideoResizeMode["CONTAIN"] = "contain";
    VideoResizeMode["COVER"] = "cover";
    VideoResizeMode["STRETCH"] = "stretch";
})(VideoResizeMode = exports.VideoResizeMode || (exports.VideoResizeMode = {}));
var FilterType;
(function (FilterType) {
    FilterType["NONE"] = "";
    FilterType["INVERT"] = "CIColorInvert";
    FilterType["MONOCHROME"] = "CIColorMonochrome";
    FilterType["POSTERIZE"] = "CIColorPosterize";
    FilterType["FALSE"] = "CIFalseColor";
    FilterType["MAXIMUMCOMPONENT"] = "CIMaximumComponent";
    FilterType["MINIMUMCOMPONENT"] = "CIMinimumComponent";
    FilterType["CHROME"] = "CIPhotoEffectChrome";
    FilterType["FADE"] = "CIPhotoEffectFade";
    FilterType["INSTANT"] = "CIPhotoEffectInstant";
    FilterType["MONO"] = "CIPhotoEffectMono";
    FilterType["NOIR"] = "CIPhotoEffectNoir";
    FilterType["PROCESS"] = "CIPhotoEffectProcess";
    FilterType["TONAL"] = "CIPhotoEffectTonal";
    FilterType["TRANSFER"] = "CIPhotoEffectTransfer";
    FilterType["SEPIA"] = "CISepiaTone";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
