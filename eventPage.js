let contextMainMenuItem = {
    id: "ravin_ai",
    title: "Ravin-AI",
    contexts: ["selection"]
};

let contextSubMenuItem1 = {
    id: "convert_to_json",
    title: "Convert to JSON",
    contexts: ["selection"],
    parentId: "ravin_ai"
}

chrome.contextMenus.create(contextMainMenuItem);
chrome.contextMenus.create(contextSubMenuItem1);

chrome.contextMenus.onClicked.addListener((clickedData => {
    if (clickedData.selectionText) {
        if (clickedData.menuItemId === 'convert_to_json') {
            chrome.tabs.create({'url': chrome.extension.getURL(`popup.html?str=${encodeURI(clickedData.selectionText)}`)}, function (tab) {
            });
        }
    }
}))