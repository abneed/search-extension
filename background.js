const urlMap = {
	bing: "https://www.bing.com/search?q=",
	duckduckgo: "https://duckduckgo.com/?q=",
	google: "https://google.com/search?q=",
	yahoo: "https://search.yahoo.com/search?q="
};

const searchForText = (selectedText) => {
	chrome.storage.sync.get(["searchEngine"], (result) => {
		let url;
		if (result.searchEngine) {
			url = `${urlMap[result.searchEngine]}${encodeURIComponent(selectedText)}`;
		} else {
			url = `${urlMap["google"]}${encodeURIComponent(selectedText)}`;
		}

		chrome.tabs.create({
			url,
		});
	});
};

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "search-text-selection",
		title: `Search for "%s"`,
		contexts: ["selection"],
	});

	chrome.contextMenus.onClicked.addListener((info) => {
		const { menuItemId, selectionText } = info;

		if (menuItemId === "search-text-selection" && selectionText) {
			searchForText(selectionText);
		}
	});
});