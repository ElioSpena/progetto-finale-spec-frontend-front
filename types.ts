export type VideoGame = {
  title: string;
  category: string;
  isAvailable: boolean;
  availableQuantity?: number;
  isUsed?: boolean;
  price: number;
  rating?: number;
  description?: string;
  platform: string;
  readonly genre?: string;
  readonly releaseYear?: number;
  readonly developer?: string;
  image?: string;
};

export type BoardGame = {
  title: string;
  category: string;
  isAvailable: boolean;
  availableQuantity?: number;
  isUsed?: boolean;
  price: number;
  rating?: number;
  description?: string;
  readonly genre?: string;
  readonly players?: string;
  readonly playTime?: string;
  readonly age?: number;
  readonly publisher?: string;
  image?: string;
};
