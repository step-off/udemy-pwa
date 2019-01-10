;(function () {
	var shareImageButton = document.querySelector('#share-image-button');
	var createPostArea = document.querySelector('#create-post');
	var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
	var sharedMomentsArea = document.querySelector('#shared-moments');

	function openCreatePostModal() {
		createPostArea.style.display = 'block';
	}

	function closeCreatePostModal() {
		createPostArea.style.display = 'none';
	}

	shareImageButton.addEventListener('click', openCreatePostModal);

	closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

	function createCard(cardData) {
		var cardWrapper = document.createElement('div');
		cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
		var cardTitle = document.createElement('div');
		cardTitle.className = 'mdl-card__title';
		cardTitle.style.backgroundImage = 'url(' + cardData.image + ')';
		cardTitle.style.backgroundSize = 'cover';
		cardTitle.style.height = '180px';
		cardWrapper.appendChild(cardTitle);
		var cardTitleTextElement = document.createElement('h2');
		cardTitleTextElement.className = 'mdl-card__title-text';
		cardTitleTextElement.textContent = cardData.title;
		cardTitle.appendChild(cardTitleTextElement);
		var cardSupportingText = document.createElement('div');
		cardSupportingText.className = 'mdl-card__supporting-text';
		cardSupportingText.textContent = cardData.location;
		cardSupportingText.style.textAlign = 'center';
		cardWrapper.appendChild(cardSupportingText);
		componentHandler.upgradeElement(cardWrapper);
		sharedMomentsArea.appendChild(cardWrapper);
	}

	fetch('https://pwagram-8fd0d.firebaseio.com/posts.json')
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			updateUi(normalizeData(data));
		})
		.catch(function () {
			fetchPostsFromDB().then(function (data) {
				updateUi(data);
			})
		});

	function updateUi(data) {
		for (const cardData of data) {
			createCard(cardData);
		}
	}

	function normalizeData(dataObject) {
		const arrayData = [];

		for (const key in dataObject) {
			if (dataObject.hasOwnProperty(key)) {
				const element = dataObject[key];

				arrayData.push(element);
			}
		}

		return arrayData;
	}

	function fetchPostsFromDB() {
		if ('indexedDB' in window) {
			return IdbHelper.readData('posts')
		} else {
			return Promise.resolve([]);
		}
	}
})();
