const activeTabs = chrome.tabs.query({ active: true, currentWindow: true });
if (activeTabs.length === 0) {
  chrome.scripting.executeScript({
    target: { tabId: activeTabs[0].id },
    files: ['content.js'],
  });
}
