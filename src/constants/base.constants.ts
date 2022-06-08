export enum BASE_CONSTANTS {
  BASE_URL = 'https://weetabe.herokuapp.com/api',
  BASE_URL_LOCAL = 'http://localhost:5000/api',
}

export enum ROLE {
  USER = 'user',
  LESSOR = 'lessor',
  ADMIN = 'admin',
}

export enum ACCOUNT_GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

export const DEFAULT_AVATAR = `https://firebasestorage.googleapis.com/v0/b/weeta-housing.appspot.com/o/avatar_default.png?alt=media&token=34619e46-80b6-45e5-b8ce-760d618db094`;

export enum ENUM_TYPE_ARTICLE {
  TOP = 'TOP',
  COMMON = 'COMMON',
  UP = 'UP',
}

export enum ENUM_MESSAGE_MODE {
  CHAT = 'CHAT',
  EDIT = 'EDIT',
}

export const DEFAULT_CENTER_COORDINATES = {
  lat: 10.779454,
  lng: 106.693039,
};

export const DEFAULT_CENTER_ZOOM = 13;

export const DEFAULT_DATE_START = '2021-01-01';
