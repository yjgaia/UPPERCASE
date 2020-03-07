# `CLASS` SOUND
사운드 파일을 재생하는 SOUND 클래스

## Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.ogg*
* `OPTIONAL` *params.mp3*
* `OPTIONAL` *params.wav*
* `OPTIONAL` *params.isLoop*
* `OPTIONAL` *params.volume*
* `OPTIONAL` *onEndHandler*

## Public Members

### `play(at)`
#### Parameters
* `OPTIONAL` *at*

### `checkIsPlaying()`

### `getStartAt()`

### `pause()`

### `stop()`

### `setVolume(volume)`
#### Parameters
* `REQUIRED` *volume*

### `getVolume()`

### `setPlaybackRate(playbackRate)`
#### Parameters
* `REQUIRED` *playbackRate*

### `fadeIn(seconds)`
#### Parameters
* `REQUIRED` *seconds*

### `fadeOut(seconds)`
#### Parameters
* `REQUIRED` *seconds*

### `getDuration()`

### `on(eventName, eventHandler)`
#### Parameters
* `REQUIRED` *eventName*
* `REQUIRED` *eventHandler*

### `checkIsEventExists(eventName)`
#### Parameters
* `REQUIRED` *eventName*

### `off(eventName, eventHandler)`
#### Parameters
* `REQUIRED` *eventName*
* `OPTIONAL` *eventHandler*

### `fireEvent(eventNameOrParams)`
#### Parameters
* `REQUIRED` *eventNameOrParams*
* `REQUIRED` *eventNameOrParams.eventName*
* `OPTIONAL` *eventNameOrParams.e*
