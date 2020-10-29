"use strict";

(() => {

  window.showMessage = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `
      z-index: 100;
      position: fixed;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 5px;
      text-align: center;
      background-color: #ff0000;
      font-size: 18px;
      font-weight: bold;`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
})();
