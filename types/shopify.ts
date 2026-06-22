export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyProductsResponse {
  data: {
    products: {
      edges: {
        node: ShopifyProduct;
      }[];
    };
  };
}
