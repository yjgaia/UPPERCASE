# UPPERCASE-CORE
UPPERCASE-CORE는 UPPERCASE의 가장 근간을 되는 기능들을 담고 있습니다. UPPERCASE의 모든 기능들은 이를 기반으로 합니다.

## `METHOD` `CLASS` `OBJECT` - 하나의 파일에 하나의 메소드/클래스/실글톤 객체를 저장합니다.
UPPERCASE를 기반으로 프로젝트를 구성할 때는 하나의 파일에 하나의 기능을 저장하는 것을 원칙으로 합니다. 기능이란 메소드, 클래스, 실글톤 객체로 구현될 수 있습니다. 각 문서를 참고하시기 바랍니다.

* [METHOD](UPPERCASE-CORE/METHOD.md) - UPPERCASE 기반 메소드를 생성합니다.
* [CLASS](UPPERCASE-CORE/CLASS.md) - UPPERCASE 기반 클래스를 생성합니다.
* [OBJECT](UPPERCASE-CORE/OBJECT.md) - UPPERCASE 기반 실글톤 객체를 생성합니다.

## `TO_DELETE` - UPPERCASE에서는 `null`을 사용하지 않습니다.
[UPPERCASE 코드 컨벤션 규칙](CONVENTION.md)에서 밝힌 바와 같이 UPPERCASE에서는 `null`을 사용하지 않습니다. 그러나 유일하게 `null` 값을 갖고 있는 변수가 있는데, 바로 `TO_DELETE`입니다.
[MongoDB](http://www.mongodb.org)와 같은 시스템에서는 `update` 명령을 수행할 때, `null`을 대입하면 해당 값을 삭제하는 기능을 제공합니다. 이런 경우에 **삭제될 값**을 표현하는데 있어 `null` 보다는 `TO_DELETE`와 같은 변수를 사용하는것이 더욱 명시적인 코드가 될것이라 판단하어 만들어진 변수입니다.
따라서 이런 경우에도 [UPPERCASE 코드 컨벤션 규칙](CONVENTION.md)과 동일하게 `null`을 사용하지 말고, `TO_DELETE`를 사용하시기 바랍니다.

## API
[API 문서](../API/UPPERCASE-CORE/README.md)

## 
```
$ npm install uppercase-core
```

```javascript
require('uppercase-core')
```