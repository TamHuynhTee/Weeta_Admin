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

export enum ENUM_TYPE_REASON {
  ARTICLE = 'article',
  LESSOR = 'lessor',
}

export enum ENUM_PAYMENT_TYPE {
  MEMBER_PACKAGE = 'MEMBERPACKAGE',
  SERVICE_PACKAGE = 'SERVICEPACKAGE',
}

export const REASON_TYPE_FILTER = [
  { label: 'Tất cả', value: '' },
  { label: 'Bài viết', value: ENUM_TYPE_REASON.ARTICLE },
  { label: 'Nhà môi giới', value: ENUM_TYPE_REASON.LESSOR },
];

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

export const FACILITIES = [
  {
    label: 'Ở chung với chủ',
    icon: '/icons/ic_facilities_live_with_owner.png',
    register: 'liveWithOwner',
  },
  {
    label: 'Có chỗ đậu xe',
    icon: '/icons/ic_facilities_parking.png',
    register: 'parking',
  },
];

export const TYPE_USER = [
  {
    label: 'Học sinh, sinh viên',
    register: 0,
  },
  {
    label: 'Người lao động',
    register: 1,
  },
];

export const LIMIT_TIME = [
  { label: 'Thoải mái thời gian', value: '' },
  { label: '20:00', value: '20:00' },
  { label: '21:00', value: '21:00' },
  { label: '22:00', value: '22:00' },
  { label: '23:00', value: '23:00' },
  { label: '00:00', value: '00:00' },
];

export const ELECTRIC_UNIT = [{ label: 'kWh', value: 'kWh' }];
export const WATER_UNIT = [
  { label: 'khối', value: 'block' },
  { label: 'người/tháng', value: 'perCapita' },
];
export const WIFI_UNIT = [{ label: 'người/tháng', value: 'perCapita' }];

/** Cac vi tri gan nha tro
 * 0: Truong hoc
 * 1: Cho
 * 2: Sieu thi
 * 3: Benh vien
 * 4: Tram xe buyt
 * 5: Khu mua sam
 * 6: Thu vien
 * 7: Cua hang tien loi
 * 8: Cong an phuong
 * 9: Nha thuoc
 * 10: Cay xang
 * 11: Ngan hang
 */
export const PLACES = {
  SCHOOL: 0,
  MARKET: 1,
  SUPERMARKET: 2,
  HOSPITAL: 3,
  BUS_STOP: 4,
  MALL: 5,
  LIBRARY: 6,
  GROCERY: 7,
  POLICE_STATION: 8,
  PHARMACY: 9,
  GAS: 10,
  BANK: 11,
};

export const PLACES_AROUND = [
  {
    label: 'Trường học',
    icon: '/icons/ic_facilities_place_school.png',
    register: 0,
  },
  {
    label: 'Chợ',
    icon: '/icons/ic_facilities_place_market.png',
    register: 1,
  },
  {
    label: 'Siêu thị',
    icon: '/icons/ic_facilities_place_supermarket.png',
    register: 2,
  },
  {
    label: 'Bệnh viện',
    icon: '/icons/ic_facilities_place_hospital.png',
    register: 3,
  },
  {
    label: 'Trạm xe buýt',
    icon: '/icons/ic_facilities_place_bus_stop.png',
    register: 4,
  },
  {
    label: 'Khu mua sắm',
    icon: '/icons/ic_facilities_place_mall.png',
    register: 5,
  },
  {
    label: 'Thư viện',
    icon: '/icons/ic_facilities_place_library.png',
    register: 6,
  },
  {
    label: 'Cửa hàng tiện lợi',
    icon: '/icons/ic_facilities_place_grocery.png',
    register: 7,
  },
  {
    label: 'Công an',
    icon: '/icons/ic_facilities_place_police.png',
    register: 8,
  },
  {
    label: 'Nhà thuốc',
    icon: '/icons/ic_facilities_place_pharmacy.png',
    register: 9,
  },
  {
    label: 'Cây xăng',
    icon: '/icons/ic_facilities_place_gas.png',
    register: 10,
  },
  {
    label: 'Ngân hàng',
    icon: '/icons/ic_facilities_place_bank.png',
    register: 11,
  },
];
