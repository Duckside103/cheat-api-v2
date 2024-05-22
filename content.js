console.log("CONTENT");
let currentIndex = -1;

document.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "Enter":
      chrome.runtime.sendMessage({
        msg: "Signal for send question",
      });
      break;

    case "+":
    case "=":
      currentIndex = currentIndex + 1;
      renderAnswers();
      break;
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(">> Check | request:", request);
});

const renderAnswers = async () => {
  const answers = await getAnswers();

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

  async function getAnswers() {
    const data = await fetch("https://smart-guy.vercel.app/answer/");
    const { result = [] } = await data.json();

    return result;
  }
};
