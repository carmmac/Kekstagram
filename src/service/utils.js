"use strict";

const fs = require(`fs`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const {MOCKS_DIR_PATH, PHOTOS_DIR_PATH} = require(`./const.js`);

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

const generateMockPicture = (pictureFileName) => {
  return {
    id: nanoid(5),
    url: `${pictureFileName}`,
  };
};

const getMockData = async () => {
  console.info(`Generating data...`);
  console.log(22222222);

  const mockData = [];
  const picturesFileNames = await fs.promises.readdir(
      path.resolve(process.cwd(), PHOTOS_DIR_PATH)
  );

  for (const pictureFileName of picturesFileNames) {
    mockData.push(generateMockPicture(pictureFileName));
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
  getMockData,
  createDirs,
  copyFiles,
  createMockFile
};
