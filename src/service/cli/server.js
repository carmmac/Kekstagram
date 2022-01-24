'use strict';

const express = require(`express`);
const routes = require(`../api`);

const {
  DEFAULT_BACKEND_PORT,
  SERVER_API_PREFIX,
  CLI_SERVER_COMMAND,
  ExitCode,
} = require(`../const`);

const app = express();
app.use(express.json());

app.use(SERVER_API_PREFIX, routes);

module.exports = {
  name: CLI_SERVER_COMMAND,
  async run(args) {

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_BACKEND_PORT;

    try {
      app.listen(port, (error) => {
        if (error) {
          return console.error(`Ошибка при создании сервера`, error);
        }
        return console.info(`Ожидаю соединений на ${port}`);
      });
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
      process.exit(ExitCode.ERROR);
    }
  }
};
