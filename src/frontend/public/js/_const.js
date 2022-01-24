const INIT_SCALE_VALUE = 100;
const SCALE_CHANGE_STEP = 25;
const INITIAL_EFFECT_LVL = 100;
const MIN_HATSHTAG_LENGTH = 1;
const MAX_HATSHTAG_LENGTH = 20;
const MAX_HASHTAG_NUM = 5;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const RANDOM_IMG_NUM = 10;
const DEBOUNCE_INTERVAL = 500;
const VISIBLE_COMMENTS_NUM = 5;
const MAX_ID_LENGTH = 10;

const regExp = /^#[a-zA-Zа-яА-Я\d]+$/;

const EffectName = {
  CHROME: `chrome`,
  SEPIA: `sepia`,
  MARVIN: `marvin`,
  PHOBOS: `phobos`,
  HEAT: `heat`,
};

const Effect = {
  chrome: `grayscale`,
  sepia: `sepia`,
  marvin: `invert`,
  phobos: `blur`,
  heat: `brightness`,
};

const FilterName = {
  RANDOM: `filter-random`,
  DISCUSSED: `filter-discussed`,
};

const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_AUTH: 401,
  NOT_FOUND: 404,
};

const StatusValue = {
  SUCCESS: `success`,
  ERROR: `error`,
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export {
  INIT_SCALE_VALUE,
  SCALE_CHANGE_STEP,
  INITIAL_EFFECT_LVL,
  MIN_HATSHTAG_LENGTH,
  MAX_HATSHTAG_LENGTH,
  MAX_HASHTAG_NUM,
  FILE_TYPES,
  RANDOM_IMG_NUM,
  DEBOUNCE_INTERVAL,
  VISIBLE_COMMENTS_NUM,
  MAX_ID_LENGTH,

  regExp,
  EffectName,
  Effect,
  FilterName,
  StatusCode,
  StatusValue,
  SuccessHTTPStatusRange,
};
