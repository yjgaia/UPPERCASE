# `CLASS` NODE
DOM 트리 구조를 정의하기 위한 NODE 클래스

## Parameters
* `OPTIONAL` *params*
* `OPTIONAL` *params.style* 스타일
* `OPTIONAL` *params.c* 자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
* `OPTIONAL` *params.on* 이벤트

## Public Members

### `getWrapperDom()`

### `getContentDom()`

### `getWrapperEl()`

### `getContentEl()`

### `append(node)`
#### Parameters
* `REQUIRED` *node*

### `appendTo(node)`
#### Parameters
* `REQUIRED` *node*

### `prepend(node)`
#### Parameters
* `REQUIRED` *node*

### `prependTo(node)`
#### Parameters
* `REQUIRED` *node*

### `after(node)`
#### Parameters
* `REQUIRED` *node*

### `insertAfter(node)`
#### Parameters
* `REQUIRED` *node*

### `before(node)`
#### Parameters
* `REQUIRED` *node*

### `insertBefore(node)`
#### Parameters
* `REQUIRED` *node*

### `getChildren()`

### `setParent(node)`
#### Parameters
* `OPTIONAL` *node*

### `getParent()`

### `empty()`

### `remove()`

### `checkIsRemoved()`

### `on(eventName, eventHandler)`
#### Parameters
* `REQUIRED` *eventName*
* `REQUIRED` *eventHandler*

### `off(eventName, eventHandler)`
#### Parameters
* `REQUIRED` *eventName*
* `OPTIONAL` *eventHandler*

### `fireEvent(nameOrParams)`
#### Parameters
* `REQUIRED` *nameOrParams*
* `REQUIRED` *nameOrParams.name* 이벤트 이름
* `OPTIONAL` *nameOrParams.e*

### `addStyle(style)`
#### Parameters
* `REQUIRED` *style*

### `getStyle(name)`
#### Parameters
* `REQUIRED` *name*

### `getWidth()`

### `getInnerWidth()`

### `getHeight()`

### `getInnerHeight()`

### `getLeft()`

### `getTop()`

### `hide()`

### `show()`

### `checkIsHiding()`

### `checkIsShowing()`

### `scrollTo(params)`
#### Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.left*
* `OPTIONAL` *params.top*

### `getScrollLeft()`

### `getScrollTop()`

### `getScrollWidth()`

### `getScrollHeight()`

### `setData(data)`
#### Parameters
* `REQUIRED` *_data*

### `getData()`
