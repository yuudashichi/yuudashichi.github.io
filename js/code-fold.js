document.addEventListener("DOMContentLoaded", function () {

  const codeBlocks = document.querySelectorAll(
    "figure.highlight, pre.highlight, .markdown-body pre"
  );

  codeBlocks.forEach(function (codeBlock) {

    if (codeBlock.parentElement.classList.contains("code-fold-wrapper")) {
      return;
    }

    // 获取代码内容
    const code = codeBlock.innerText;

    // 不超过 8 行，不折叠
    const lineCount = code.split("\n").length;

    if (lineCount <= 8) {
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "code-fold-wrapper collapsed";

    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    const button = document.createElement("button");
    button.className = "code-fold-btn";
    button.innerText = "展开代码 ▼";

    wrapper.appendChild(button);

    button.addEventListener("click", function () {

      const collapsed = wrapper.classList.toggle("collapsed");

      button.innerText = collapsed
        ? "展开代码 ▼"
        : "收起代码 ▲";

    });

  });

});