export type MediaAsset = {
  type: 'IMAGE' | 'VIDEO';
  src: string;
};

export type ProjectItem = {
  title: string;
  image: string;
  text: string;
  assets: MediaAsset[];
};
