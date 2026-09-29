document.addEventListener("DOMContentLoaded", function () {
  const codeBlocks = document.querySelectorAll("figure.highlight");

  codeBlocks.forEach(function (codeBlock) {

    // 防止重复初始化
    if (codeBlock.dataset.foldInitialized === "true") {
      return;
    }

    codeBlock.dataset.foldInitialized = "true";

    // 代码行数
    const lineCount = codeBlock.querySelectorAll(".code .line").length;

    // 8 行及以下不折叠
    if (lineCount <= 8) {
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "code-fold-wrapper collapsed";

    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    const button = document.createElement("button");
    button.className = "code-fold-btn";
    button.type = "button";
    button.innerHTML = "展开代码 ▼";

    wrapper.appendChild(button);

    button.addEventListener("click", function () {
      const collapsed = wrapper.classList.toggle("collapsed");

      button.innerHTML = collapsed
        ? "展开代码 ▼"
        : "收起代码 ▲";
    });
  });
});