document.addEventListener("DOMContentLoaded", function () {
  const codeBlocks = document.querySelectorAll(
    ".markdown-body figure.highlight"
  );

  codeBlocks.forEach(function (codeBlock) {

    if (codeBlock.dataset.foldInitialized === "true") {
      return;
    }

    // 优先通过 .line 统计
    let lineCount = codeBlock.querySelectorAll(".code .line").length;

    // 如果没有 .line，则尝试通过行号统计
    if (lineCount === 0) {
      lineCount = codeBlock.querySelectorAll(".gutter .line").length;
    }

    // 再兜底用文本换行统计
    if (lineCount === 0) {
      const codeElement =
        codeBlock.querySelector("td.code pre") ||
        codeBlock.querySelector("pre");

      if (codeElement) {
        lineCount = codeElement.textContent
          .trimEnd()
          .split("\n")
          .length;
      }
    }

    console.log("代码行数:", lineCount);

    // 8 行及以下不折叠
    if (lineCount <= 8) {
      return;
    }

    // 确定需要折叠后，再标记
    codeBlock.dataset.foldInitialized = "true";

    const wrapper = document.createElement("div");
    wrapper.className = "code-fold-wrapper collapsed";

    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    const button = document.createElement("button");
    button.className = "code-fold-btn";
    button.type = "button";
    button.textContent = "展开代码 ▼";

    wrapper.appendChild(button);

    button.addEventListener("click", function () {
      const collapsed = wrapper.classList.toggle("collapsed");

      button.textContent = collapsed
        ? "展开代码 ▼"
        : "收起代码 ▲";
    });
  });
});