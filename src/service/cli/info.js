'use strict';

const {CLI_INFO_COMMAND} = require(`../const`);

const infoMessage = `
  Проект КЕКСТАГРАМ на основе учебного курса от HTML Academy.
  Ознакомьтесь с порядком запуска и работы с приложением в файле Readme.md
`;

module.exports = {
  name: CLI_INFO_COMMAND,
  run: () => console.info(infoMessage)
};
