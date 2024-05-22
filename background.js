console.log("BACKGROUND");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.tabs.captureVisibleTab(undefined, { format: "jpeg" }, async (data) => {
    console.log(">> Check | chrome.tabs.captureVisibleTab | data:", data);
    const screenshotImage = new Image();
    screenshotImage.src = data;
    await fetch("http://localhost:3000/question/", {
      method: "post",
      body: screenshotImage,
    });

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message: "start" });
    });
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const captureButton = document.getElementById("capture");
//   const screenshotContainer = document.getElementById("screenshotContainer");
//   captureButton.addEventListener("click", function () {
//     chrome.tabs.captureVisibleTab(function (screenshotDataUrl) {
//       const screenshotImage = new Image();
//       screenshotImage.src = screenshotDataUrl;
//       screenshotContainer.appendChild(screenshotImage);
//     });
//   });
// });
