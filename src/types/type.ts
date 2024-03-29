export type StatusOrder = {
  backgroundColor: string;
  color: string;
  name: string;
  number: number;
  _id: string;
};
export type Order = {
  paymentInfo: {
    user_name: string;
    phone: number;
    message: string;
    address: string;
    products: [
      {
        id: string;
        name: string;
        category: string;
        image: string;
        color: string;
        size: string;
        price: number;
        amountSalePrice: number;
        salePrice: number;
        finalPrice: number;
        quantity: number;
        totalPrice: number;
        isReview: boolean;
        _id: string;
      }
    ];
    totalSalePrice: number;
    totalPrice: number;
    amount: number;
    orderCode: number;
    status: string;
    bin: null | string | number;
    accountnumber: null | string | number;
    accountName: null | string | number;
    description: null | string | number;
    currency: null | string | number;
    paymentLinkId: null | string | number;
    checkoutUrl: null | string;
    qrCode: null | string | number;
  };
  _id: string;
  user: string;
  paymentMethod: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  _id: string;
  id: string;
  email: string | null;
  name: string;
  image: string;
  isVerified: boolean;
  created_at: string;
  oauthProvider: string | null;
};

export type Coupon = {
  _id: string;
  id: string;
  name: string;
  image: string;
  discount: number;
  max_discount: number;
  min_amount: number;
  category: Category;
  tags: Tag[];
  startDate: string;
  endDate: string;
  expired: boolean;
  published: boolean;
};

export type Category = {
  _id: string;
  id: string;
  name: string;
  image: string;
  description: string;
};

export type Tag = {
  _id: string;
  name: string;
};

export type Banner = {
  _id: string;
  id: string;
  image: string;
  content: string;
  sub_content: string;
  category: Category;
};

export type Product = {
  _id: string;
  name: string;
  images: string[];
  price: number;
  saleAmount: number;
  finalPrice: number;
  details: {
    variants: [
      {
        size: string;
        color: string;
        quantity: number;
        inStock: true;
        _id: string;
      }
    ];
    category: Category;
    tags: Tag[];
    weight: string;
    shortDescription: string;
    description: string;
    dimensions: string;
    materials: string;
    _id: string;
  };
  type: string;
  created_at: string;
  updated_at: string;
  published: boolean;
};

export type HandleFilterFunction = (
  search?: string,
  currStatus?: string,
  ordersLimit?: number | string,
  method?: string,
  startDate?: string,
  endDate?: string,
  sort?: string,
  tag?: string,
  category?: string
) => void;
