export interface IReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}


export interface IMetaInfo {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  thumbnail: string;
  tags: string[];
  reviews: IReview[];
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IMetaInfo;
}

export interface ProductPaginated {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
