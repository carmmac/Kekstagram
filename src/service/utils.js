"use strict";

const fs = require(`fs`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const {
  MOCKS_DIR_PATH,
  PHOTOS_DIR_PATH,
  PICTURE_ID_LENGTH,
  COMMENTS_FILE_PATH,
  MOCK_USERS,
  CommentsNum,
  LikesNum,
  CommentSentensesNum,
} = require(`./const.js`);

const getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }
  return someArray;
};

const readTextContent = async (filePath) => {
  try {
    const content = await fs.promises.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const createDirs = (dirpaths) => {
  console.info(`Creating folders...`);
  dirpaths.forEach((dirpath) => {
    console.info(`Creating folder: ${dirpath}`);
    fs.mkdirSync(path.resolve(process.cwd(), dirpath), {
      recursive: true,
    });
  });
  console.info(`Finished. \n`);
};

const copyFiles = async (sourceDir, targetDir) => {
  const files = await fs.promises.readdir(sourceDir);
  console.info(`Copying mock pictures...`);

  for (const file of files) {
    console.info(`Copying file: ${file}`);
    await fs.promises.copyFile(
        path.join(sourceDir, file),
        path.join(targetDir, file)
    );
  }
  console.info(`Finished. \n`);
};

const generateComments = (messages) => {
  const commentsCount = getRandomNum(CommentsNum.MIN, CommentsNum.MAX);

  return Array(commentsCount).fill({}).map(() => {
    const {name, avatar} = MOCK_USERS[getRandomNum(0, MOCK_USERS.length - 1)];

    return {
      avatar,
      name,
      message: shuffle(messages)
        .slice(0, getRandomNum(CommentSentensesNum.MIN, CommentSentensesNum.MAX))
        .join(` `)
    };
  });
};

const generatePicture = (pictureFileName, commentsSentenses) => ({
  id: nanoid(PICTURE_ID_LENGTH),
  url: `${pictureFileName}`,
  likes: getRandomNum(LikesNum.MIN, LikesNum.MAX),
  comments: generateComments(commentsSentenses)
});

const getMockData = async () => {
  console.info(`Generating data...`);

  const mockData = [];

  const [
    picturesFileNames,
    commentsSentenses
  ] = await Promise.all([
    fs.promises.readdir(
        path.resolve(process.cwd(), PHOTOS_DIR_PATH)
    ),
    readTextContent(
        path.resolve(process.cwd(), COMMENTS_FILE_PATH)
    )
  ]);

  for (const pictureFileName of picturesFileNames) {
    // const randomUser = MOCK_USERS[getRandomNum(0, MOCK_USERS.length - 1)];
    mockData.push(
        generatePicture(pictureFileName, commentsSentenses)
    );
  }

  console.info(`Finished. \n`);
  return mockData;
};

const createMockFile = async (data) => {
  console.info(`Writing generated data...`);

  await fs.promises.writeFile(
      `${process.cwd()}/${MOCKS_DIR_PATH}/mocks.json`,
      data
  );
};

module.exports = {
  getRandomNum,
  getMockData,
  createDirs,
  copyFiles,
  createMockFile
};
