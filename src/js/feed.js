;(function () {
	var shareImageButton = document.querySelector('#share-image-button');
	var createPostArea = document.querySelector('#create-post');
	var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
	var sharedMomentsArea = document.querySelector('#shared-moments');
	var createPostForm = createPostArea.querySelector('form');
	var titleInput = createPostForm.querySelector('#title');
	var locationInput = createPostForm.querySelector('#location');
	var POSTS_URL = 'https://pwagram-8fd0d.firebaseio.com/posts.json';
	var dummyImage = 'https://firebasestorage.googleapis.com/v0/b/pwagram-8fd0d.appspot.com/o/sf-boat.jpg?alt=media&token=e193da00-08b3-4879-84fe-8d932a8cea04';

	shareImageButton.addEventListener('click', openCreatePostModal);
	closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
	createPostForm.addEventListener('submit', handleCreatePostFormSubmit)

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

	RequestHelper.getData(POSTS_URL)
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

	function openCreatePostModal() {
		createPostArea.style.display = 'block';
	}

	function closeCreatePostModal() {
		createPostArea.style.display = 'none';
	}

	function handleCreatePostFormSubmit(event) {
		event.preventDefault();
		var titleValue = titleInput.value;
		var locationValue = locationInput.value;

		if (!titleValue || !locationValue) {
			alert('Please provide valid data to create post!');
			return;
		}

		closeCreatePostModal();

		var postData = {
			id: new Date().toISOString(),
			title: titleValue,
			location: locationValue,
			image: dummyImage
		}

		if ('serviceWorker' in navigator && 'SyncManager' in window) {
			registerSyncEvent(postData);
		} else {
			sendPostData(postData);
		}
	}

	function registerSyncEvent(data) {
			navigator.serviceWorker.ready.then(function(sw) {
				IdbHelper
				.writeData('sync-posts', data)
				.then(function() {
					sw.sync.register('sync-new-post');
				})
			});
	}
	function sendPostData(data) {
		RequestHelper.postData(POSTS_URL, data);
	}
})();
