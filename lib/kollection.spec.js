var assert = require('assert');
var expect = require('chai').expect;

var kollect = require('./main').kollect;

describe('Kollection', function(){
	describe('#all()', function(){
		it('should return the underlying array represented by the kollection', function(){
			expect(kollect([1, 2, 3]).all()).to.deep.equal([1, 2, 3]);
		});
	});

	describe('#avg()', function(){
		it('should return the average of all items in the kollection', function(){
			expect(kollect([1, 2, 3, 4, 5]).avg()).to.equal(3);
		});

		it('should return the average of a key in the kollection for nested array', function(){
			expect(kollect([
				{ name: 'JavaScript: The Good Parts', pages: 176 },
				{ name: 'JavaScript: The Definitive Guide', pages: 1096 }
			]).avg('pages')).to.equal(636);
		});
	});

	describe('#chunk()', function(){
		it('should break the kollection into multiple, smaller kollections of a given size', function(){
			expect(kollect([1, 2, 3, 4, 5, 6, 7]).chunk(4).all()).to.deep.equal([[1, 2, 3, 4], [5, 6, 7]]);
		});
	});

	describe('#collapse()', function(){
		it('should collapse a kollection of arrays into a single, flat kollection', function(){
			expect(kollect([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).collapse().all()).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		});
	});

	// describe('#combine()', function(){
	// 	it('should combine the keys of the kollection with the values of another array or kollection', function(){
	// 		var kollection = kollect(['name', 'age']);
	// 		var combined = kollection.combine(['George', 29]);
	//
	// 		expect(combined.all()).to.deep.equal({ name: 'George', age: 29 });
	// 	});
	// });

	describe('#contains()', function(){
		it('should determine whether the kollection contains a given item', function(){
			var kollection = kollect(['Desk', 'Chair', 'Wardrobe', 'Bookcase']);

			expect(kollection.contains('Desk')).to.be.true;
			expect(kollection.contains('New York')).to.be.false;
		});

		it('should determine whether the kollection contains a given key/value pair', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200 },
				{ product: 'Chair', price: 100 }
			]);

			expect(kollection.contains('product', 'Desk')).to.be.true;
			expect(kollection.contains('product', 'Bookcase')).to.be.false;
		});

		it('should determine whether the kollection contains a given item passed a callback', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			expect(kollection.contains(function(value, key){
				return value > 5;
			})).to.be.false;

			expect(kollection.contains(function(value, key){
				return value < 5;
			})).to.be.true;
		});
	});

	describe('#count()', function(){
		it('should return the total number of items in the kollection', function(){
			expect(kollect([1, 2, 3, 4]).count()).to.equal(4);
		});
	});

	describe('#diff()', function(){
		it('should return the the diference between array', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);
			var diff = kollection.diff([2, 4, 6, 8]);

			expect(diff.all()).to.deep.equal([1, 3, 5]);
		});
	});

	describe('#each()', function(){
		it('should iterate over the items in the kollection', function(){
			var total = 0;

			kollect([
				{ product: 'Desk', price: 200 },
				{ product: 'Chair', price: 100 }
			]).each(function(item, key){
				total += item.price;
			});

			expect(total).to.be.equal(300);
		});

		it('should stop iterating when the callback return false', function(){
			var total = 0;

			kollect([
				{ product: 'Desk', price: 200 },
				{ product: 'Chair', price: 100 },
				{ product: 'Wardrobe', price: 800 }
			]).each(function(item, key){
				if(key < 2){
					total += item.price;
				} else {
					return false;
				}
			});

			expect(total).to.be.equal(300);
		});
	});

	describe('#every()', function(){
		it('should create a new kollection consisting of every n-th element', function(){
			var kollection = kollect(['a', 'b', 'c', 'd', 'e', 'f']);

			expect(kollection.every(4)).to.deep.equal(['a', 'e']);
		});

		it('should create a new kollection consisting of every n-th element by offset', function(){
			var kollection = kollect(['a', 'b', 'c', 'd', 'e', 'f']);

			expect(kollection.every(4, 1)).to.deep.equal(['b', 'f']);
		});
	});

	// describe('#except()', function(){
	// 	it('should return all the items in the kollection except for those with specified keys', function(){
	// 		var kollection = kollect({ product_id: 1, price: 100, discount: false });
	// 		var filtered = kollection.except(['price', 'discount']);
	//
	// 		expect(filtered.all()).to.deep.equal({ product_id: 1 });
	// 	});
	// });

	describe('#filter()', function(){
		it('should filter the kollection using the given callback', function(){
			var kollection = kollect([1, 2, 3, 4]);
			var filtered = kollection.filter(function(value, key){
				return value > 2;
			});

			expect(filtered.all()).to.deep.equal([3, 4]);
		});
	});

	describe('#first()', function(){
		it('should return the first element in the kollection', function(){
			var kollection = kollect([1, 2, 3, 4]);

			expect(kollection.first()).to.equal(1);
		});

		it('should return the first element in the kollection that passes a given truth test', function(){
			var kollection = kollect([1, 2, 3, 4]);
			var filtered = kollection.first(function(value, key){
				return value > 2;
			});

			expect(filtered).to.equal(3);
		});

		it('should return null in an empty the kollection', function(){
			var kollection = kollect([]);

			expect(kollection.first()).to.be.null;
		});

		it('should return null in the kollection that does not pases a given truth test', function(){
			var kollection = kollect([1, 2, 3, 4]);
			var filtered = kollection.first(function(value, key){
				return value > 5;
			});

			expect(filtered).to.be.null;
		});
	});

	describe('#flatten()', function(){
		it.skip('should flatten a multi-dimensional kollection into a single dimension', function(){
			var kollection = kollect(['taylor', ['php', 'javascript']]);
			var flattened = kollection.flatten();

			expect(flattened.all()).to.deep.equal(['taylor', 'php', 'javascript']);
		});
	});

	describe('#flip()', function(){
		it('should swap the keys of the kollection keys with their corresponding values', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200 },
				{ product: 'Chair', price: 100 },
				{ product: 'Wardrobe', price: 800 }
			]);
			var flipped = kollection.flip();

			expect(flipped.all()).to.deep.equal([
				{ 'Desk': 'product', 200: 'price' },
				{ 'Chair': 'product', 100: 'price' },
				{ 'Wardrobe': 'product', 800: 'price' }
			]);
		});
	});

	describe('#forget()', function(){
		it('should remove an item from the kollection by a key', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200 },
				{ product: 'Chair', price: 100 },
				{ product: 'Wardrobe', price: 800 }
			]);

			kollection.forget('product');

			expect(kollection.all()).to.deep.equal([
				{ price: 200 },
				{ price: 100 },
				{ price: 800 }
			]);
		});

		it('should remove an item from the kollection by the given keys', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' },
				{ product: 'Wardrobe', price: 800, color: 'blue' }
			]);

			kollection.forget(['product', 'color']);

			expect(kollection.all()).to.deep.equal([
				{ price: 200 },
				{ price: 100 },
				{ price: 800 }
			]);
		});
	});

	describe('#forPage()', function(){
		it('should return a new kollection containing the items for a given page', function(){
			var kollection = kollect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
			var chunk = kollection.forPage(4, 3);

			expect(chunk.all()).to.deep.equal([10, 11, 12]);
		});
	});

	describe('#get()', function(){
		it('should return the item at a given key', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' },
				{ product: 'Wardrobe', price: 800, color: 'blue' }
			]);

			expect(kollection.get(1)).to.deep.equal({ product: 'Chair', price: 100, color: 'green' });
		});

		it('should return a default value if the given key does not exist', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' },
				{ product: 'Wardrobe', price: 800, color: 'blue' }
			]);

			expect(kollection.get(5, 'nope')).to.equal('nope');
		});

		it('should return the value returned by the default callback', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' },
				{ product: 'Wardrobe', price: 800, color: 'blue' }
			]);

			expect(kollection.get(5, function(){
				return 6 + 1;
			})).to.equal(7);
		});
	});

	describe('#groupBy()', function(){
		it('should group the items in the kollection by a given key', function(){
			var kollection = kollect([
				{account_id: 'account-x10', product: 'Chair'},
				{account_id: 'account-x10', product: 'Bookcase'},
				{account_id: 'account-x11', product: 'Desk'}
			]);

			expect(kollection.groupBy('account_id')).to.deep.equal({
				'account-x10': [
					{account_id: 'account-x10', product: 'Chair'},
					{account_id: 'account-x10', product: 'Bookcase'}
				],
				'account-x11': [
					{account_id: 'account-x11', product: 'Desk'}
				]
			});
		});

		it('should group the items in the kollection by a given callback', function(){
			var kollection = kollect([
				{account_id: 'account-x10', product: 'Chair'},
				{account_id: 'account-x10', product: 'Bookcase'},
				{account_id: 'account-x11', product: 'Desk'}
			]);

			expect(kollection.groupBy(function(item, key){
				return item.account_id.substring(8);
			})).to.deep.equal({
				'x10': [
					{account_id: 'account-x10', product: 'Chair'},
					{account_id: 'account-x10', product: 'Bookcase'}
				],
				'x11': [
					{account_id: 'account-x11', product: 'Desk'}
				]
			});
		});
	});

	describe('#has()', function(){
		it.skip('should ', function(){

		});
	});

	describe('#implode()', function(){
		it('should join the items in the kollection by a given key', function(){
			var kollection = kollect([
				{account_id: 1, product: 'Desk'},
				{account_id: 2, product: 'Chair'}
			]);

			expect(kollection.implode('product', ', ')).to.be.equal('Desk, Chair');
		});

		it('should join the items in the kollection', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			expect(kollection.implode('-')).to.be.equal('1-2-3-4-5');
		});
	});

	describe('#intersect()', function(){
		it('should remove values that are not on the given array', function(){
			var kollection = kollect(['Desk', 'Sofa', 'Chair']);
			var intersect = kollection.intersect(['Desk', 'Chair', 'Bookcase']);

			expect(intersect.all()).to.deep.equal(['Desk', , 'Chair']);
		});

		it('should remove values that are not on the given kollection', function(){
			var kollection = kollect(['Desk', 'Sofa', 'Chair']);
			var kollection2 = kollect(['Desk', 'Chair', 'Bookcase']);
			var intersect = kollection.intersect(kollection2);

			expect(intersect.all()).to.deep.equal(['Desk', , 'Chair']);
		});
	});

	describe('#isEmpty()', function(){
		it('should return true if the kollection is empty', function(){
			var kollection = kollect([]);

			expect(kollection.isEmpty()).to.be.true;
		});

		it('should return false if the kollection is not empty', function(){
			var kollection = kollect(['Desk', 'Chair', 'Bookcase']);

			expect(kollection.isEmpty()).to.be.false;
		});
	});

	describe('#keyBy()', function(){
		it('should key the kollection by the given key', function(){
			var kollection = kollect([
				{product_id: 'prod-100', name: 'desk'},
				{product_id: 'prod-200', name: 'chair'}
			]);

			expect(kollection.keyBy('product_id')).to.deep.equal({
				'prod-100': {product_id: 'prod-100', name: 'desk'},
				'prod-200': {product_id: 'prod-200', name: 'chair'}
			});
		});

		it('should key the kollection by the given callback', function(){
			var kollection = kollect([
				{product_id: 'prod-100', name: 'desk'},
				{product_id: 'prod-200', name: 'chair'}
			]);

			expect(kollection.keyBy(function(item){
				return item['product_id'].toUpperCase();
			})).to.deep.equal({
				'PROD-100': {product_id: 'prod-100', name: 'desk'},
				'PROD-200': {product_id: 'prod-200', name: 'chair'}
			});
		});
	});

	describe('#keys()', function(){
		it('should return the keys of the kollection', function(){
			var kollection = kollect(['Desk', 'Chair', 'Bookcase']);

			expect(kollection.keys().all()).to.deep.equal([0, 1, 2]);
		});
	});

	describe('#last()', function(){
		it('should return the last element in the kollection', function(){
			var kollection = kollect([1, 2, 3, 4]);

			expect(kollection.last()).to.equal(4);
		});

		it('should return the last element in the kollection that passes a given truth test', function(){
			var kollection = kollect([1, 2, 3, 4]);
			var filtered = kollection.last(function(value, key){
				return value < 3;
			});

			expect(filtered).to.equal(2);
		});

		it('should return null in an empty the kollection', function(){
			var kollection = kollect([]);

			expect(kollection.last()).to.be.null;
		});

		it('should return null in the kollection that does not pases a given truth test', function(){
			var kollection = kollect([1, 2, 3, 4]);
			var filtered = kollection.last(function(value, key){
				return value < 0;
			});

			expect(filtered).to.be.null;
		});
	});

	describe('#map()', function(){
		it('should iterate through the kollection and passes each value to the given callback', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			var multiplied = kollection.map(function(item, key){
				return item * 2;
			});

			expect(multiplied.all()).to.deep.equal([2, 4, 6, 8, 10]);
		});
	});

	describe('#max()', function(){
		it('should return the maximum value of the kollection', function(){
			var kollection = kollect([1, 2, 4, 5, 3]);

			expect(kollection.max()).to.equal(5);
		});

		it('should return the maximum value of a given key', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Wardrobe', price: 800, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' }
			]);

			expect(kollection.max('price')).to.equal(800);
		});
	});

	describe('#median()', function(){
		it('should get the median of the items in the kollection', function(){
			var kollection = kollect([13, 18, 13, 15, 13, 16, 14, 21, 13]);

			expect(kollection.median()).to.equal(14);
		});

		it('should get the median of the items in the kollection by a given key', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Wardrobe', price: 800, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' },
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Wardrobe', price: 300, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' }
			]);

			expect(kollection.median('product')).to.equal('Desk');
			expect(kollection.median('price')).to.equal(200);
			expect(kollection.median('color')).to.equal('blue');
		});
	});

	describe('#merge()', function(){
		it('should merge the given array into the kollection', function(){
			var kollection = kollect(['Desk', 'Chair']);
			var merged = kollection.merge(['Bookcase', 'Door']);

			expect(merged.all()).to.deep.equal(['Desk', 'Chair', 'Bookcase', 'Door']);
		});
	});

	describe('#min()', function(){
		it('should return the minimum value of the kollection', function(){
			var kollection = kollect([6, 1, 2, 4, 5, 3]);

			expect(kollection.min()).to.equal(1);
		});

		it('should return the minimum value of a given key', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' },
				{ product: 'Wardrobe', price: 800, color: 'blue' }
			]);

			expect(kollection.min('price')).to.equal(100);
		});
	});

	describe('#mode()', function(){
		it.skip('should get the mode of the items in the kollection', function(){

		});
	});

	describe('#pipe()', function(){
		it('should pass the kollection to the given callback and returns the result', function(){
			var kollection = kollect([1, 2, 3]);

			var piped = kollection.pipe(function(kollection){
				return kollection.sum();
			});

			expect(piped).to.equal(6);
		});
	});

	describe('#pluck()', function(){
		it('should retrieve all of the values for a given key', function(){
			var kollection = kollect([
				{product_id: 'prod-100', name: 'Desk'},
				{product_id: 'prod-200', name: 'Chair'}
			]);

			var plucked = kollection.pluck('name');

			expect(plucked.all()).to.deep.equal(['Desk', 'Chair']);
		});
	});

	describe('#pop()', function(){
		it('should remove and returns the last item from the kollection', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			expect(kollection.pop()).to.equal(5);
			expect(kollection.all()).to.deep.equal([1, 2, 3, 4]);
		});
	});

	describe('#prepend()', function(){
		it('should add an item to the beginning of the kollection', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			expect(kollection.prepend(0)).to.equal(6);
			expect(kollection.all()).to.deep.equal([0, 1, 2, 3, 4, 5]);
		});
	});

	describe('#pull()', function(){
		it('should remove and returns an item from the kollection by its key', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			expect(kollection.pull(2)).to.equal(3);
			expect(kollection.all()).to.deep.equal([1, 2, 4, 5]);
		});
	});

	describe('#push()', function(){
		it('should append an item to the end of the kollection', function(){
			var kollection = kollect([1, 2, 3, 4]);

			expect(kollection.push(5)).to.equal(5);
			expect(kollection.all()).to.deep.equal([1, 2, 3, 4, 5]);
		});
	});

	describe('#random()', function(){
		it('should return a random item from the kollection', function(){
			var kollection = kollect([1, 2, 3, 4, 5, 6, 7]);
			var random = kollection.random();

			expect(kollection.contains(random)).to.be.true;
		});

		it('should return n random items from the kollection', function(){
			var kollection = kollect([1, 2, 3, 4, 5, 6, 7]);
			var random = kollection.random(3).all();

			expect(random.length).to.equal(3);
		});
	});

	describe('#reduce()', function(){
		it('should reduce the kollection to a single value', function(){
			var kollection = kollect([1, 2, 3]);

			var total = kollection.reduce(function(carry, item){
				return carry + item;
			});

			expect(total).to.equal(6);
		});

		it('should reduce the kollection to a single value, given a initial value', function(){
			var kollection = kollect([1, 2, 3]);

			var total = kollection.reduce(function(carry, item){
				return carry + item;
			}, 4);

			expect(total).to.equal(10);
		});
	});

	describe('#reject()', function(){
		it('should remove the kollection using the given callback', function(){
			var kollection = kollect([1, 2, 3, 4]);

			var filtered = kollection.reject(function(value, key){
				return value > 2;
			});

			expect(filtered.all()).to.deep.equal([1, 2]);
		});
	});

	describe('#reverse()', function(){
		it('should reverse the order of the items in the kollection', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			var reversed = kollection.reverse();

			expect(reversed.all()).to.deep.equal([5, 4, 3, 2, 1]);
		});
	});

	describe('#search()', function(){
		it('should search the kollection for the given value and returns its key if found', function(){
			var kollection = kollect([2, 4, 6, 8]);

			expect(kollection.search(4)).to.equal(1);
		});

		it('should search the kollection in strict mode', function(){
			var kollection = kollect([2, 4, 6, 8]);

			expect(kollection.search('4')).to.equal(1);
			expect(kollection.search('4', true)).to.be.false;
		});

		it('should search the kollection given a callback', function(){
			var kollection = kollect([2, 4, 6, 8]);

			expect(kollection.search(function(item){
				return item > 5;
			})).to.equal(2);
		});
	});

	describe('#shift()', function(){
		it('should remove and returns the first item from the kollection', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			expect(kollection.shift()).to.equal(1);
			expect(kollection.all()).to.deep.equal([2, 3, 4, 5]);
		});
	});

	describe('#shuffle()', function(){
		it('should randomly shuffle the items in the kollection', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			var shuffled = kollection.shuffle();

			expect(shuffled.all()).to.have.length(kollection.count());
		});
	});

	describe('#slice()', function(){
		it('should return a slice of the kollection starting at the given index', function(){
			var kollection = kollect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

			var slice = kollection.slice(4);

			expect(slice.all()).to.deep.equal([5, 6, 7, 8, 9, 10]);
		});

		it('should slice the kollection by a give index and limit', function(){
			var kollection = kollect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

			var slice = kollection.slice(4, 2);

			expect(slice.all()).to.deep.equal([5, 6]);
		});
	});

	describe('#sort()', function(){
		it('should sort the kollection', function(){
			var kollection = kollect([5, 3, 1, 2, 4]);

			var sorted = kollection.sort();

			expect(sorted.all()).to.deep.equal([1, 2, 3, 4, 5]);
		});
	});

	describe('#sortBy()', function(){
		it('should sort the kollection by a given key', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Wardrobe', price: 800, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' }
			]);

			var sorted = kollection.sortBy('price');

			expect(sorted.all()).to.deep.equal([
				{ product: 'Chair', price: 100, color: 'green' },
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Wardrobe', price: 800, color: 'blue' }
			]);
		});

		it('should sort the kollection by a given callback', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, colors: ['Black', 'Mahogany'] },
				{ product: 'Wardrobe', price: 800, colors: ['Black'] },
				{ product: 'Chair', price: 100, colors: ['Red', 'Beige', 'Brown'] }
			]);

			var sorted = kollection.sortBy(function(item, key){
				return item.colors.length;
			});

			expect(sorted.all()).to.deep.equal([
				{ product: 'Wardrobe', price: 800, colors: ['Black'] },
				{ product: 'Desk', price: 200, colors: ['Black', 'Mahogany'] },
				{ product: 'Chair', price: 100, colors: ['Red', 'Beige', 'Brown'] }
			]);
		});
	});

	describe('#sortByDesc()', function(){
		it('should sort the kollection by a given key', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Wardrobe', price: 800, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' }
			]);

			var sorted = kollection.sortByDesc('price');

			expect(sorted.all()).to.deep.equal([
				{ product: 'Wardrobe', price: 800, color: 'blue' },
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' }
			]);
		});

		it('should sort the kollection by a given callback', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, colors: ['Black', 'Mahogany'] },
				{ product: 'Wardrobe', price: 800, colors: ['Black'] },
				{ product: 'Chair', price: 100, colors: ['Red', 'Beige', 'Brown'] }
			]);

			var sorted = kollection.sortByDesc(function(item, key){
				return item.colors.length;
			});

			expect(sorted.all()).to.deep.equal([
				{ product: 'Chair', price: 100, colors: ['Red', 'Beige', 'Brown'] },
				{ product: 'Desk', price: 200, colors: ['Black', 'Mahogany'] },
				{ product: 'Wardrobe', price: 800, colors: ['Black'] }
			]);
		});
	});

	describe('#splice()', function(){
		it('should remove and return a slice of items starting at a given index', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			var chunk = kollection.splice(2);

			expect(chunk.all()).to.deep.equal([3, 4, 5]);
			expect(kollection.all()).to.deep.equal([1, 2]);
		});

		it('should remove and return a slice of items starting at a given index and limit', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			var chunk = kollection.splice(2, 1);

			expect(chunk.all()).to.deep.equal([3]);
			expect(kollection.all()).to.deep.equal([1, 2, 4, 5]);
		});

		it('should remove, return a slice of items starting at a given index and replace them by a given array', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			var chunk = kollection.splice(2, 1, [10, 11]);

			expect(chunk.all()).to.deep.equal([3]);
			expect(kollection.all()).to.deep.equal([1, 2, 10, 11, 4, 5]);
		});
	});

	describe('#sum()', function(){
		it('should return the sum of all items in the kollection', function(){
			expect(kollect([1, 2, 3, 4, 5]).sum()).to.equal(15);
		});

		it('should return the sum of all items in the kollection by a given key', function(){
			var kollection = kollect([
				{name: 'JavaScript: The Good Parts', pages: 176},
				{name: 'JavaScript: The Definitive Guide', pages: 1096}
			]);

			expect(kollection.sum('pages')).to.equal(1272);
		});

		it('should return the sum of all items in the kollection by a given callback', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, colors: ['Black', 'Mahogany'] },
				{ product: 'Wardrobe', price: 800, colors: ['Black'] },
				{ product: 'Chair', price: 100, colors: ['Red', 'Beige', 'Brown'] }
			]);

			expect(kollection.sum(function(item, index){
				return item.colors.length;
			})).to.equal(6);
		});
	});

	describe('#take()', function(){
		it('should return a new kollection with a specified number of items', function(){
			var kollection = kollect([0, 1, 2, 3, 4, 5]);

			var chunk = kollection.take(3);

			expect(chunk.all()).to.deep.equal([0, 1, 2]);
		});

		it('should return a new kollection with a specified number of items by a negative index', function(){
			var kollection = kollect([0, 1, 2, 3, 4, 5]);

			var chunk = kollection.take(-2);

			expect(chunk.all()).to.deep.equal([4, 5]);
		});
	});

	describe('#toString()', function(){
		it('should stringify the kollection', function(){
			var kollection = kollect([0, 1, 2, 3, 4, 5]);

			expect(kollection.toString()).to.equal('[0,1,2,3,4,5]');
			expect(`${kollection}`).to.equal('[0,1,2,3,4,5]');
		});
	});

	describe('#transform()', function(){
		it('should iterate each item and transform them by a given callback', function(){
			var kollection = kollect([1, 2, 3, 4, 5]);

			kollection.transform(function(item, key){
				return item * 2;
			});

			expect(kollection.all()).to.deep.equal([2, 4, 6, 8, 10]);
		});

		it('should iterate each item and transform them by a given callback', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, colors: ['Black', 'Mahogany'] },
				{ product: 'Wardrobe', price: 800, colors: ['Black'] },
				{ product: 'Chair', price: 100, colors: ['Red', 'Beige', 'Brown'] }
			]);

			kollection.transform(function(item, key){
				item.colorCount = item.colors.length;

				return item;
			});

			expect(kollection.all()).to.deep.equal([
				{ product: 'Desk', price: 200, colors: ['Black', 'Mahogany'], colorCount: 2 },
				{ product: 'Wardrobe', price: 800, colors: ['Black'], colorCount: 1 },
				{ product: 'Chair', price: 100, colors: ['Red', 'Beige', 'Brown'], colorCount: 3 }
			]);
		});
	});

	describe('#union()', function(){
		it('should adds the given array to the kollection', function(){
			var kollection = kollect([
				{name: 'iPhone 6', brand: 'Apple', type: 'phone'},
				{name: 'iPhone 5', brand: 'Apple', type: 'phone'},
				{name: 'Apple Watch', brand: 'Apple', type: 'watch'}
			]);

			var union = kollection.union([
				{name: 'Galaxy S6', brand: 'Samsung', type: 'phone'},
				{name: 'iPhone 5', brand: 'Apple', type: 'phone'},
				{name: 'Galaxy Gear', brand: 'Samsung', type: 'watch'}
			]);

			expect(union.all()).to.deep.equal([
				{name: 'iPhone 6', brand: 'Apple', type: 'phone'},
				{name: 'iPhone 5', brand: 'Apple', type: 'phone'},
				{name: 'Apple Watch', brand: 'Apple', type: 'watch'},
				{name: 'Galaxy S6', brand: 'Samsung', type: 'phone'},
				{name: 'Galaxy Gear', brand: 'Samsung', type: 'watch'}
			]);
		});
	});

	describe('#unique()', function(){
		it('should return all of the unique value in the kollection', function(){
			var kollection = kollect([1, 1, 2, 2, 3, 4, 2]);

			var unique = kollection.unique();

			expect(unique.all()).to.deep.equal([1, 2, 3, 4]);
		});

		it('should return all of the unique value in the kollection by a given key', function(){
			var kollection = kollect([
				{name: 'iPhone 6', brand: 'Apple', type: 'phone'},
				{name: 'iPhone 5', brand: 'Apple', type: 'phone'},
				{name: 'Apple Watch', brand: 'Apple', type: 'watch'},
				{name: 'Galaxy S6', brand: 'Samsung', type: 'phone'},
				{name: 'Galaxy Gear', brand: 'Samsung', type: 'watch'}
			]);

			var unique = kollection.unique('brand');

			expect(unique.all()).to.deep.equal([
				{name: 'iPhone 6', brand: 'Apple', type: 'phone'},
				{name: 'Galaxy S6', brand: 'Samsung', type: 'phone'}
			]);
		});

		it('should return all of the unique value in the kollection by a given callback', function(){
			var kollection = kollect([
				{name: 'iPhone 6', brand: 'Apple', type: 'phone'},
				{name: 'iPhone 5', brand: 'Apple', type: 'phone'},
				{name: 'Apple Watch', brand: 'Apple', type: 'watch'},
				{name: 'Galaxy S6', brand: 'Samsung', type: 'phone'},
				{name: 'Galaxy Gear', brand: 'Samsung', type: 'watch'}
			]);

			var unique = kollection.unique(function(item){
				return item.brand + item.type;
			});

			expect(unique.all()).to.deep.equal([
				{name: 'iPhone 6', brand: 'Apple', type: 'phone'},
				{name: 'Apple Watch', brand: 'Apple', type: 'watch'},
				{name: 'Galaxy S6', brand: 'Samsung', type: 'phone'},
				{name: 'Galaxy Gear', brand: 'Samsung', type: 'watch'}
			]);
		});
	});

	describe('#values()', function(){
		it('should return a new kollection with the keys reset', function(){
			var kollection = kollect([1, , , 3, , 4, 2]);

			expect(kollection.values().all()).to.deep.equal([1, 3, 4, 2]);
		});
	});

	describe('#where()', function(){
		it('should filter the kollection by a given key / value pair', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Wardrobe', price: 100, color: 'blue' },
				{ product: 'Door', price: 150, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' }
			]);

			var filtered = kollection.where('price', 100);

			expect(filtered.all()).to.deep.equal([
				{ product: 'Wardrobe', price: 100, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' }
			]);
		});

		it('should filter the kollection by a given key / value pair and operator', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Wardrobe', price: 100, color: 'blue' },
				{ product: 'Door', price: 150, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' }
			]);

			var filtered = kollection.where('price', '>', 100);

			expect(filtered.all()).to.deep.equal([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Door', price: 150, color: 'blue' }
			]);
		});

		it('should filter the kollection by a given key / value pair and like operator', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Wardrobe', price: 100, color: 'blue' },
				{ product: 'Door', price: 150, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' },
				{ product: 'Charizard', price: Infinity, color: 'red' }
			]);

			var filtered = kollection.where('product', 'like', 'Cha');

			expect(filtered.all()).to.deep.equal([
				{ product: 'Chair', price: 100, color: 'green' },
				{ product: 'Charizard', price: Infinity, color: 'red' }
			]);
		});
	});

	describe('#whereStrict()', function(){
		it('should filter the kollection by a given key / value pair in strict mode', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Wardrobe', price: '100', color: 'blue' },
				{ product: 'Door', price: 150, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' }
			]);

			var filtered = kollection.whereStrict('price', 100);

			expect(filtered.all()).to.deep.equal([
				{ product: 'Chair', price: 100, color: 'green' }
			]);
		});
	});

	describe('#whereIn()', function(){
		it('should filter the kollection by a given key and values in array', function(){
			var kollection = kollect([
				{ product: 'Desk', price: 200, color: 'blue' },
				{ product: 'Wardrobe', price: 100, color: 'red' },
				{ product: 'Door', price: 150, color: 'blue' },
				{ product: 'Chair', price: 100, color: 'green' }
			]);

			var filtered = kollection.whereIn('color', ['green', 'red']);

			expect(filtered.all()).to.deep.equal([
				{ product: 'Wardrobe', price: 100, color: 'red' },
				{ product: 'Chair', price: 100, color: 'green' }
			]);
		});
	});

	describe('#whereDate()', function(){
		it('should filter the kollection by a given key date pair', function(){
			var kollection = kollect([
				{ name: 'Charmander', color: 'red', captured: new Date('2016-09-19') },
				{ name: 'Squirtle', color: 'blue', captured: new Date('2016-09-20') },
				{ name: 'Bulbasaur', color: 'green', captured: new Date('2016-09-23') },
				{ name: 'Pikachu', color: 'yellow', captured: new Date('2016-09-19') }
			]);

			var filtered = kollection.whereDate('captured', new Date('2016-09-19'));

			expect(filtered.all()).to.deep.equal([
				{ name: 'Charmander', color: 'red', captured: new Date('2016-09-19') },
				{ name: 'Pikachu', color: 'yellow', captured: new Date('2016-09-19') }
			]);
		});
	});

	describe('#whereDateBetween()', function(){
		it('should ', function(){
			var kollection = kollect([
				{ name: 'Charmander', color: 'red', captured: new Date('2016-09-19') },
				{ name: 'Squirtle', color: 'blue', captured: new Date('2016-09-20') },
				{ name: 'Bulbasaur', color: 'green', captured: new Date('2016-09-23') },
				{ name: 'Pikachu', color: 'yellow', captured: new Date('2016-09-19') }
			]);

			var filtered = kollection.whereDateBetween('captured', new Date('2016-09-18'), new Date('2016-09-21'));

			expect(filtered.all()).to.deep.equal([
				{ name: 'Charmander', color: 'red', captured: new Date('2016-09-19') },
				{ name: 'Squirtle', color: 'blue', captured: new Date('2016-09-20') },
				{ name: 'Pikachu', color: 'yellow', captured: new Date('2016-09-19') }
			]);
		});
	});

	describe('#zip()', function(){
		it('should merge together the values of the given array', function(){
			var kollection = kollect(['Chair', 'Desk']);

			var zipped = kollection.zip([100, 200]);

			expect(zipped.all()).to.deep.equal([['Chair', 100], ['Desk', 200]]);
		});
	});
});
