const DEFAULT_SCALE_VALUE = 100;
const SCALE_CHANGE_STEP = 25;
const DEFAULT_EFFECT_VALUE = 100;
const BLUR_EFFECT_MAX_LVL = 3;
const BRIGHTNESS_EFFECT_MAX_LVL = 3;

const MIN_HATSHTAG_LENGTH = 1;
const MAX_HATSHTAG_LENGTH = 20;
const MAX_HASHTAG_NUM = 5;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const RANDOM_IMG_NUM = 10;
const DEBOUNCE_INTERVAL = 500;
const INITIAL_VISIBLE_COMMENTS_NUM = 5;
const ADDITIONAL_VISIBLE_COMMENTS_NUM = 5;
const MAX_ID_LENGTH = 10;

const regExp = /^#[a-zA-Zа-яА-Я\d]+$/;

const ScaleChangeType = {
  SMALLER: `smaller`,
  BIGGER: `bigger`
};

const Effect = {
  NONE: {
    name: `none`,
    style: `none`,
    label: `Оригинал`,
    // value: `none`
  },
  CHROME: {
    name: `chrome`,
    style: `grayscale`,
    label: `Хром`,
    // // value: DEFAULT_EFFECT_VALUE
  },
  SEPIA: {
    name: `sepia`,
    style: `sepia`,
    label: `Сепия`,
    // // value: DEFAULT_EFFECT_VALUE
  },
  MARVIN: {
    name: `marvin`,
    style: `invert`,
    label: `Марвин`,
    // // value: DEFAULT_EFFECT_VALUE
  },
  PHOBOS: {
    name: `phobos`,
    style: `blur`,
    label: `Фобос`,
    // // value: DEFAULT_EFFECT_VALUE
  },
  HEAT: {
    name: `heat`,
    style: `brightness`,
    label: `Зной`,
    // // value: DEFAULT_EFFECT_VALUE
  },
};

const DEFAULT_EFFECT = Effect.NONE;

const Filter = {
  DEFAULT: {
    name: `filter-default`,
    label: `По умолчанию`
  },
  RANDOM: {
    name: `filter-random`,
    label: `Случайные`
  },
  DISCUSSED: {
    name: `filter-discussed`,
    label: `Обсуждаемые`
  },
};

const DEFAULT_FILTER = Filter.DEFAULT;

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


export {
  DEFAULT_SCALE_VALUE,
  SCALE_CHANGE_STEP,
  DEFAULT_EFFECT_VALUE,
  BLUR_EFFECT_MAX_LVL,
  BRIGHTNESS_EFFECT_MAX_LVL,

  MIN_HATSHTAG_LENGTH,
  MAX_HATSHTAG_LENGTH,
  MAX_HASHTAG_NUM,
  FILE_TYPES,
  RANDOM_IMG_NUM,
  DEBOUNCE_INTERVAL,
  INITIAL_VISIBLE_COMMENTS_NUM,
  ADDITIONAL_VISIBLE_COMMENTS_NUM,
  MAX_ID_LENGTH,

  regExp,

  ScaleChangeType,
  Effect,
  DEFAULT_EFFECT,
  Filter,
  DEFAULT_FILTER,
  StatusCode,
  StatusValue,
};
