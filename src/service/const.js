'use strict';

const CLI_INFO_COMMAND = `--info`;
const CLI_SERVER_COMMAND = `--server`;
const CLI_GENERATE_MOCKS_COMMAND = `--generate-mocks`;
const DEFAULT_CLI_COMMAND = CLI_INFO_COMMAND;
const DEFAULT_BACKEND_PORT = 3000;
const DEFAULT_FRONTEND_PORT = 8080;
const SERVER_API_PREFIX = `/api`;
const DEFAULT_SERVER_URL = `http://localhost:${DEFAULT_BACKEND_PORT}${SERVER_API_PREFIX}`;
const DEFAULT_URL = `http://localhost:${DEFAULT_FRONTEND_PORT}`;
const SERVER_TIMEOUT = 5000;
const PICTURE_ID_LENGTH = 5;

const PHOTOS_DIR_PATH = `./data/photos`;
const COMMENTS_FILE_PATH = `./data/comments.txt`;
const DESCRIPTIONS_FILE_PATH = `./data/descriptions.txt`;
const MOCKS_DIR_PATH = `./mocks`;

const MOCK_USERS = [
  {
    name: `Ivan Ivanov`,
    avatar: `avatar-1.svg`
  },
  {
    name: `Petr Petrov`,
    avatar: `avatar-2.svg`
  },
  {
    name: `Sergey Sergeev`,
    avatar: `avatar-3.svg`
  },
  {
    name: `Dmitry Dmitriev`,
    avatar: `avatar-4.svg`
  },
  {
    name: `Fedor Fedorov`,
    avatar: `avatar-5.svg`
  },
  {
    name: `Alex Alexandrov`,
    avatar: `avatar-6.svg`
  }
];

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const CommentsNum = {
  MIN: 0,
  MAX: 10
};

const LikesNum = {
  MIN: 0,
  MAX: 1000
};

const CommentSentensesNum = {
  MIN: 1,
  MAX: 3
};

module.exports = {
  CLI_INFO_COMMAND,
  CLI_SERVER_COMMAND,
  CLI_GENERATE_MOCKS_COMMAND,
  DEFAULT_CLI_COMMAND,
  DEFAULT_BACKEND_PORT,
  DEFAULT_FRONTEND_PORT,
  DEFAULT_SERVER_URL,
  DEFAULT_URL,
  SERVER_API_PREFIX,
  SERVER_TIMEOUT,
  PICTURE_ID_LENGTH,

  PHOTOS_DIR_PATH,
  COMMENTS_FILE_PATH,
  DESCRIPTIONS_FILE_PATH,
  MOCKS_DIR_PATH,

  MOCK_USERS,

  HttpCode,
  ExitCode,
  CommentsNum,
  LikesNum,
  CommentSentensesNum,
};
