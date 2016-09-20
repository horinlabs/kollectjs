# CollectJS
A small javascript library strongly based on Laravel's collections (https://laravel.com/docs/collections)

* * *

### all()

Get all of the items in the collection.

**Returns**: `Array`

### avg(callback)

Get the average value of a given key.

**Parameters**

**callback**: `string | function`, Get the average value of a given key.

**Returns**: `*`

### chunk(size)

Chunk the underlying collection array.

**Parameters**

**size**: `int`, Chunk the underlying collection array.

**Returns**: `Collection`

### collapse()

Collapse the collection of items into a single array.

**Returns**: `Collection`

### combine(values)

Create a collection by using this collection for keys and another for its values.

**Parameters**

**values**: `*`, Create a collection by using this collection for keys and another for its values.

**Returns**: `Collection`

### contains(key, value)

Determine if an item exists in the collection.

**Parameters**

**key**: `*`, Determine if an item exists in the collection.

**value**: `*`, Determine if an item exists in the collection.

**Returns**: , bool

### containsStrict(key, value)

Determine if an item exists in the collection using the strict mode.

**Parameters**

**key**: `*`, Determine if an item exists in the collection using the strict mode.

**value**: `*`, Determine if an item exists in the collection using the strict mode.

**Returns**: , bool

### count()

Count the number of items in the collection.

**Returns**: , int

### diff(items)

Get the items in the collection that are not present in the given items.

**Parameters**

**items**: `*`, Get the items in the collection that are not present in the given items.

**Returns**: `Collection`

### each(callback)

Execute a callback over each item.

**Parameters**

**callback**: `function`, Execute a callback over each item.

**Returns**: , this

### every(step, offset)

Create a new collection consisting of every n-th element.

**Parameters**

**step**: `int`, Create a new collection consisting of every n-th element.

**offset**: `int`, Create a new collection consisting of every n-th element.

**Returns**: `Collection`

### except(keys)

Get all items except for those with the specified keys.

**Parameters**

**keys**: `*`, Get all items except for those with the specified keys.

**Returns**: `Collection`

### filter(callback)

Run a filter over each of the items.

**Parameters**

**callback**: `function | null`, Run a filter over each of the items.

**Returns**: `Collection`

### first(callback, default)

Get the first item from the collection.

**Parameters**

**callback**: `function | null`, Get the first item from the collection.

**default**: `*`, Get the first item from the collection.

**Returns**: `*`

### flatten(depth)

Get a flattened array of the items in the collection.

**Parameters**

**depth**: `int`, Get a flattened array of the items in the collection.

**Returns**: `Collection`

### flip()

Flip the items in the collection.

**Returns**: `Collection`

### forget(keys)

Remove an item from the collection by key.

**Parameters**

**keys**: `string | array`, Remove an item from the collection by key.

**Returns**: , this

### forPage(page, perPage)

"Paginate" the collection by slicing it into a smaller collection.

**Parameters**

**page**: `int`, "Paginate" the collection by slicing it into a smaller collection.

**perPage**: `int`, "Paginate" the collection by slicing it into a smaller collection.

**Returns**: `Collection`

### get(key, callback)

Get an item from the collection by key.

**Parameters**

**key**: `int`, Get an item from the collection by key.

**callback**: `*`, Get an item from the collection by key.

**Returns**: `*`

### groupBy(groupBy, preserveKeys)

Group an associative array by a field or using a callback.

**Parameters**

**groupBy**: `function | string`, Group an associative array by a field or using a callback.

**preserveKeys**: `bool`, Group an associative array by a field or using a callback.

**Returns**: `Collection`

### has(key)

Determine if an item exists in the collection by key.

**Parameters**

**key**: `*`, Determine if an item exists in the collection by key.

**Returns**: , bool

### implode(value, glue)

Concatenate values of a given key as a string.

**Parameters**

**value**: `string`, Concatenate values of a given key as a string.

**glue**: `string`, Concatenate values of a given key as a string.

**Returns**: , string

### intersect(items)

Intersect the collection with the given items.

**Parameters**

**items**: `*`, Intersect the collection with the given items.

**Returns**: `Collection`

### isEmpty()

Determine if the collection is empty or not.

**Returns**: , bool

### keyBy(keyBy)

Key an associative array by a field or using a callback.

**Parameters**

**keyBy**: `function | string`, Key an associative array by a field or using a callback.

**Returns**: `Collection`

### keys()

Get the keys of the collection items.

**Returns**: `Collection`

### last(callback, default)

Get the last item from the collection.

**Parameters**

**callback**: `function | null`, Get the last item from the collection.

**default**: `*`, Get the last item from the collection.

**Returns**: `*`

### map(callback)

Run a map over each of the items.

**Parameters**

**callback**: `function`, Run a map over each of the items.

**Returns**: `Collection`

### max(key)

Get the max value of a given key.

**Parameters**

**key**: `string | null`, Get the max value of a given key.

**Returns**: `*`

### median(null)

Get the median of a given key.

**Parameters**

**null**: , key

**Returns**: `*`, |null

### merge(items)

Merge the collection with the given items.

**Parameters**

**items**: `*`, Merge the collection with the given items.

**Returns**: `Collection`

### min(key)

Get the min value of a given key.

**Parameters**

**key**: `string | null`, Get the min value of a given key.

**Returns**: `*`

### mode(key)

Get the mode of a given key.

**Parameters**

**key**: `string | null`, Get the mode of a given key.

**Returns**: `Array`

### pipe(callback)

Pass the collection to the given callback and return the result.

**Parameters**

**callback**: `function`, Pass the collection to the given callback and return the result.

**Returns**: `*`

### pluck(value)

Get the values of a given key.

**Parameters**

**value**: `string`, Get the values of a given key.

**Returns**: `Collection`

### pop()

Get and remove the last item from the collection.

**Returns**: `*`

### prepend(value, key)

Push an item onto the beginning of the collection.

**Parameters**

**value**: `*`, Push an item onto the beginning of the collection.

**key**: `*`, Push an item onto the beginning of the collection.

**Returns**: , this

### pull(key)

Get and remove an item from the collection.

**Parameters**

**key**: `*`, Get and remove an item from the collection.

**Returns**: , this

### push(value)

Push an item onto the end of the collection.

**Parameters**

**value**: `*`, Push an item onto the end of the collection.

**Returns**: , this

### random(amount)

Get one or more items randomly from the collection.

**Parameters**

**amount**: `int`, Get one or more items randomly from the collection.

**Returns**: `*`

### reduce(callback, initial)

Reduce the collection to a single value.

**Parameters**

**callback**: `function`, Reduce the collection to a single value.

**initial**: `*`, Reduce the collection to a single value.

**Returns**: `*`

### reject(callback)

Create a collection of all elements that do not pass a given truth test.

**Parameters**

**callback**: `function`, Create a collection of all elements that do not pass a given truth test.

**Returns**: `Collection`

### reverse()

Reverse items order.

**Returns**: `Collection`

### search(value, strict)

Search the collection for a given value and return the corresponding key if successful.

**Parameters**

**value**: `*`, Search the collection for a given value and return the corresponding key if successful.

**strict**: `bool`, Search the collection for a given value and return the corresponding key if successful.

**Returns**: `*`

### shift()

Get and remove the first item from the collection.

**Returns**: `*`

### shuffle()

Shuffle the items in the collection.

**Returns**: `Collection`

### slice(offset, length)

Slice the underlying collection array.

**Parameters**

**offset**: `int`, Slice the underlying collection array.

**length**: `int`, Slice the underlying collection array.

**Returns**: `Collection`

### sort(callback)

Sort through each item with a callback.

**Parameters**

**callback**: `function | null`, Sort through each item with a callback.

**Returns**: `Collection`

### sortBy(callback, options, descending)

Sort the collection using the given callback.

**Parameters**

**callback**: `function | string`, Sort the collection using the given callback.

**options**: `int`, Sort the collection using the given callback.

**descending**: `bool`, Sort the collection using the given callback.

**Returns**: `Collection`

### sortByDesc(callback, options)

Sort the collection in descending order using the given callback.

**Parameters**

**callback**: `function | string`, Sort the collection in descending order using the given callback.

**options**: `int`, Sort the collection in descending order using the given callback.

**Returns**: `Collection`

### splice(offset, length, replacement)

Splice a portion of the underlying collection array.

**Parameters**

**offset**: `int`, Splice a portion of the underlying collection array.

**length**: `int | null`, Splice a portion of the underlying collection array.

**replacement**: `*`, Splice a portion of the underlying collection array.

**Returns**: `Collection`

### sum(callback)

Get the sum of the given values.

**Parameters**

**callback**: `function | string | null`, Get the sum of the given values.

**Returns**: `*`

### take(limit)

Take the first or last {$limit} items.

**Parameters**

**limit**: `int`, Take the first or last {$limit} items.

**Returns**: `Collection`

### toString(limit)

Converts the items in a string.

**Parameters**

**limit**: `int`, Converts the items in a string.

**Returns**: `Collection`

### transform(callback)

Transform each item in the collection using a callback.

**Parameters**

**callback**: `function`, Transform each item in the collection using a callback.

**Returns**: , this

### union(items)

Union the collection with the given items.

**Parameters**

**items**: `*`, Union the collection with the given items.

**Returns**: `Collection`

### unique(key, strict)

Return only unique items from the collection array.

**Parameters**

**key**: `string | function | null`, Return only unique items from the collection array.

**strict**: `bool`, Return only unique items from the collection array.

**Returns**: `Collection`

### values()

Reset the keys on the underlying array.

**Returns**: `Collection`

### where(key, operator, value)

Filter items by the given key value pair.

**Parameters**

**key**: `string`, Filter items by the given key value pair.

**operator**: `*`, Filter items by the given key value pair.

**value**: `*`, Filter items by the given key value pair.

**Returns**: `Collection`

### whereIn(key, values, strict)

Filter items by the given key value pair.

**Parameters**

**key**: `string`, Filter items by the given key value pair.

**values**: `*`, Filter items by the given key value pair.

**strict**: `bool`, Filter items by the given key value pair.

**Returns**: `Collection`

### whereInStrict(key, values)

Filter items by the given key value pair using strict comparison.

**Parameters**

**key**: `string`, Filter items by the given key value pair using strict comparison.

**values**: `*`, Filter items by the given key value pair using strict comparison.

**Returns**: `Collection`

### whereStrict(key, value)

Filter items by the given key value pair using strict comparison.

**Parameters**

**key**: `string`, Filter items by the given key value pair using strict comparison.

**value**: `*`, Filter items by the given key value pair using strict comparison.

**Returns**: `Collection`

### zip(items)

Zip the collection together with one or more arrays.

e.g. new Collection([1, 2, 3])->zip([4, 5, 6]);
  => [[1, 4], [2, 5], [3, 6]]

**Parameters**

**items**: `array`, Zip the collection together with one or more arrays.

e.g. new Collection([1, 2, 3])->zip([4, 5, 6]);
  => [[1, 4], [2, 5], [3, 6]]

**Returns**: `Collection`



* * *
