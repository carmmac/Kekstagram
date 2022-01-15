'use strict';

const path = require(`path`);

const {
  MOCKS_DIR_PATH,
  CLI_GENERATE_MOCKS_COMMAND,
  PHOTOS_DIR_PATH,
  ExitCode,
} = require(`./const`);

const {
  getMockData,
  createDirs,
  copyFiles,
  createMockFile,
} = require(`./utils`);

const PHOTOS_UPLOAD_DIR_PATH = `src/frontend/public/photos`;

module.exports = {
  name: CLI_GENERATE_MOCKS_COMMAND,
  async run() {
    const mockPictures = await getMockData();

    const data = JSON.stringify(mockPictures);

    try {
      createDirs([MOCKS_DIR_PATH, PHOTOS_UPLOAD_DIR_PATH]);
      await Promise.all([
        copyFiles(
            path.resolve(process.cwd(), PHOTOS_DIR_PATH),
            path.resolve(process.cwd(), PHOTOS_UPLOAD_DIR_PATH)
        ),
        createMockFile(data),
      ]);

      console.info(`Operation finished successfully.`);
      process.exit();
    } catch (error) {
      console.error(`Error occurred while generating mock data: ${error}`);
      process.exit(ExitCode.ERROR);
    }
  }
};
