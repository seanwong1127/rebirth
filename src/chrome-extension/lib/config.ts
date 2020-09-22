// Recorded configuration
export const captureConfig = (width: number, height: number) => ({
  video: true,
  audio: true,
  videoConstraints: {
    mandatory: {
      minWidth: width,
      minHeight: height,
      maxWidth: width,
      maxHeight: height,
      maxFrameRate: 25,
      minFrameRate: 25,
    }
  }
});

// mediaRecorder Config
export const mediaRecorderOptions = {
  audioBitsPerSecond: 128000,
  videoBitsPerSecond: 2500000,
  mimeType: 'video/webm;codecs=h264'
};

// Blob Config
export const blobOptions = {
  type: 'video/webm'
};
