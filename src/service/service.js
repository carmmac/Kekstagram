'use strict';

const {Cli} = require(`./cli`);
const {DEFAULT_CLI_COMMAND} = require(`./const`);

const USER_ARGV_INDEX = 2;

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_CLI_COMMAND].run();
  process.exit();
}

Cli[userCommand].run(userArguments.slice(1));
