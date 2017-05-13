작성중

# Query Selector
이 문서는 UPPERCASE 기반 프로젝트에서 데이터를 가져올 때 사용되는 `filter`를 만들기 위해 필요한 Query Selector에 대해 다룹니다.
```
db.find({
    filter : {
        number : 3
    }
}, (savedDataSet) => {
	console.log('검색된 데이터 목록:', savedDataSet);
});
```

* `$eq` 주어진 값과 같은지 비교합니다.
* `$ne` 주어진 값과 다른지 비교합니다.
* `$gt` 주어진 값보다 큰 지 비교합니다.
* `$gte` 주어진 값보다 크거나 같은지 비교합니다.
* `$lt` 주어진 값보다 작은지 비교합니다.
* `$lte` 주어진 값보다 작거나 같은지 비교합니다.
* `$in` 주어진 배열의 요소 안에 있는지 비교합니다.
* `$nin` 주어진 배열의 요소 안에 없는지 비교합니다.
* `$and` 주어진 `filter`들에 모두 해당하는 경우
* `$or` 주어진 `filter`들 중 하나라도 해당되는 경우


## `$eq`
```javascript
// a가 3인 데이터를 찾습니다.
filter : {
    a : {
        $eq : 3
    }
}
```

## `$ne`
```javascript
// a가 3이 아닌 데이터를 찾습니다.
filter : {
    a : {
        $ne : 3
    }
}
```

## `$and`
```javascript
// a가 3이고, b가 2인 데이터를 찾습니다.
filter : {
    $and : [{
        a : 3
    }, {
        b : 2
    }]
}
```

## `$or`
```javascript
// a가 3이거나, b가 2인 데이터를 찾습니다.
filter : {
    $or : [{
        a : 3
    }, {
        b : 2
    }]
}
```

## `$gt`
```javascript
// a가 3보다 큰 데이터를 찾습니다.
filter : {
    a : {
        $gt : 3
    }
}
```

## `$gte`
```javascript
// a가 3보다 크거나 같은 데이터를 찾습니다.
filter : {
    a : {
        $gte : 3
    }
}
```

## `$lt`
```javascript
// a가 3보다 작은 데이터를 찾습니다.
filter : {
    a : {
        $lt : 3
    }
}
```

## `$lte`
```javascript
// a가 3보다 작거나 같은 데이터를 찾습니다.
filter : {
    a : {
        $lte : 3
    }
}
```

## `$in`
```javascript
// a가 1, 2, 3 중에 하나인 데이터를 찾습니다.
filter : {
    a : {
        $in : [1, 2, 3]
    }
}
```

## `$nin`
```javascript
// a가 1, 2, 3이 아닌 데이터를 찾습니다.
filter : {
    a : {
        $nin : [1, 2, 3]
    }
}
```

## `$and`
```javascript
// a가 3이고, b가 2인 데이터를 찾습니다.
filter : {
    $and : [{
        a : 3
    }, {
        b : 2
    }]
}
```

## `$or`
```javascript
// a가 3이거나, b가 2인 데이터를 찾습니다.
filter : {
    $or : [{
        a : 3
    }, {
        b : 2
    }]
}
```