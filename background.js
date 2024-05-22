console.log("BACKGROUND");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.tabs.captureVisibleTab(
    undefined,
    { format: "jpeg", quality: 50 },
    async (data) => {
      await fetch("https://smart-guy.vercel.app/question/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      });

      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { message: "start" });
      });
    }
  );
});
