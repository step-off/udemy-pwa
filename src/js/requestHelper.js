function RequestHelperConstructor() {
    this.getData = function (url) {
        return fetch(url).then(function (res) {
            return res.json();
		});
    }

    this.postData = function (url, data) {
        return fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(data)
		});
    }
}

var RequestHelper = new RequestHelperConstructor()