export type Pin = {
  x: number;
  y: number;
  pinId: string;
  color: string;
  countryName: string;
  positioning?: string;
  owner?: string;
  timestamp?: string;
  imgUrl?: string;
  comment?: string;
};

export type PinTemplate = {
  color: string;
  label: string;
};

export type Position = {
  x: number;
  y: number;
};
