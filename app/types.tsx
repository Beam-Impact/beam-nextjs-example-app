export type Product = {
  id: string;
  name: string;
  variant: string;
  price: number;
  gradient: string;
};

export type CartItem = Product & {
  quantity: number;
};
