(() => {
	const searchEngineSelect = document.getElementById("search-engine");

	chrome.storage.sync.get(["searchEngine"], (result) => {
		if (result.searchEngine) {
			searchEngineSelect.value = result.searchEngine;
		}
	});

	searchEngineSelect.addEventListener("change", () => {
		const value = searchEngineSelect.value;

		if (value.length) {
			chrome.storage.sync.set({ searchEngine: value });
		}
	});
})();