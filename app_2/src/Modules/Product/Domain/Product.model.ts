export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: PRODUCT_CATEGORY;
  thumbnail: string;
  images: string[];
};

export enum PRODUCT_CATEGORY {
  SMARTPHONES = "smartphones",
  LAPTOPS = "laptops",
  FRAGRANCES = "fragrances",
  SKINCARE = "skincare",
  GROCERIES = "groceries",
  HOME_DECORATION = "home-decoration",
  FURNITURE = "furniture",
  TOPS = "tops",
  WOMENS_DRESSES = "womens-dresses",
  WOMENS_SHOES = "womens-shoes",
  MEN_SHIRTS = "mens-shirts",
  MEN_SHOES = "mens-shoes",
  MEN_WATCHES = "mens-watches",
  WOMENS_WATCHES = "womens-watches",
  WOMENS_GLASSES = "womens-bags",
  WOMENS_JEWELLERY = "womens-jewellery",
  SUNGLASSES = "sunglasses",
  AUTOMOTIVE = "automotive",
  MOTORCYCLE = "motorcycle",
  LIGHTING = "lighting",
}
