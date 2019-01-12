
function IdbHelperConstructor() {
	var idbPromise = idb.open('posts-store', 1, function (db) {
		if (!db.objectStoreNames.contains('posts')) {
			db.createObjectStore('posts', {keyPath: 'id'});
		}
		if (!db.objectStoreNames.contains('sync-posts')) {
			db.createObjectStore('sync-posts', {keyPath: 'id'});
		}
	});

	this.writeData = function (storeName, data) {
		return idbPromise.then(function (db) {
			var transaction = db.transaction(storeName, 'readwrite');
			var store = transaction.objectStore(storeName);

			store.put(data);

			return transaction.complete;
		});
	};

	this.readData = function (storeName) {
		return idbPromise.then(function (db) {
			var transaction = db.transaction(storeName, 'readonly');
			var store = transaction.objectStore(storeName);

			return store.getAll();
		})
	};

	this.clearStore = function (storeName) {
		return idbPromise.then(function (db) {
			var transaction = db.transaction(storeName, 'readwrite');
			var store = transaction.objectStore(storeName);

			store.clear();

			return transaction.complete;
		})
	};

	this.deleteItem = function (storeName, id) {
		return idbPromise.then(function (db) {
			var transaction = db.transaction(storeName, 'readwrite');
			var store = transaction.objectStore(storeName);

			store.delete(id);

			return transaction.complete;
		})
	}
}

var IdbHelper = new IdbHelperConstructor();