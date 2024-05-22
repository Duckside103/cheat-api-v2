console.log("CONTENT");

document.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "Enter":
      console.log("oodsad");
      chrome.runtime.sendMessage({
        msg: "Signal for send question",
      });
      break;

    case "+":
      renderAnswers();
      break;
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(">> Check | request:", request);
});

const renderAnswers = async () => {
  const answers = await getAnswer();

  const target = document.querySelector(
    ".container3d.relative a.default_t_color"
  );
  const targetParent = document.querySelector(".container3d.relative");
  target?.parentNode?.removeChild(target);

  const badge = document.createElement("a");
  badge.classList.add("default_t_color");

  if (currentIndex === answers.length || answers?.length === 0) {
    currentIndex = 0;
  }
  if (answers[currentIndex]) {
    badge.textContent = `My Dashboard ${answers[currentIndex].number}:${answers[currentIndex].answer}`;

    targetParent?.insertBefore(badge, targetParent.firstChild);
  }
};

const getAnswers = async () => {
  const { result } = await fetch("http://localhost:3000/answer/").json();

  return result || "";
};
