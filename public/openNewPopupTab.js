chrome.action.onClicked.addListener(() => {
    chrome.windows.create({
        url: "index.html",
        focused: true,
        type: "popup",
        height: 800,
        width: 900,
    });
});
