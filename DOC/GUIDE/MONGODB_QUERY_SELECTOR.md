작성중

# MongoDB의 Query Selector

* `$and`
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

* `$or`
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

* `$gt`
```javascript
// a가 3보다 큰 데이터를 찾습니다.
filter : {
    a : {
        $gt : 3
    }
}
```

* `$gte`
```javascript
// a가 3보다 크거나 같은 데이터를 찾습니다.
filter : {
    a : {
        $gte : 3
    }
}
```

* `$lt`
```javascript
// a가 3보다 작은 데이터를 찾습니다.
filter : {
    a : {
        $lt : 3
    }
}
```

* `$lte`
```javascript
// a가 3보다 작거나 같은 데이터를 찾습니다.
filter : {
    a : {
        $lte : 3
    }
}
```

* `$ne`
```javascript
// a가 3이 아닌 데이터를 찾습니다.
filter : {
    a : {
        $ne : 3
    }
}
```

[MongoDB의 Query Selector](https://docs.mongodb.com/manual/reference/operator/query/#query-selectors)