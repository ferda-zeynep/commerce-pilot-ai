import { ShopifyProductsResponse, ShopifyProduct } from "@/types/shopify";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const FALLBACK_PRODUCTS: ShopifyProduct[] = [
  {
    id: "mock-1",
    title: "Alpha Bomber Jacket",
    description: "Premium tech-wear water-resistant bomber jacket.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
      altText: "Jacket",
    },
    priceRange: { minVariantPrice: { amount: "120.00", currencyCode: "USD" } },
  },
  {
    id: "mock-2",
    title: "Minimalist Black Hoodie",
    description: "Heavyweight organic cotton lifestyle hoodie.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80",
      altText: "Hoodie",
    },
    priceRange: { minVariantPrice: { amount: "85.00", currencyCode: "USD" } },
  },
  {
    id: "mock-3",
    title: "Overpack Studio Backpack",
    description: "Modular commuter bag with laptop sleeve security.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
      altText: "Bag",
    },
    priceRange: { minVariantPrice: { amount: "145.00", currencyCode: "USD" } },
  },
  {
    id: "mock-4",
    title: "Classic Urban Sneakers",
    description:
      "Comfortable daily driver leather sneakers with vulcanized soles.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
      altText: "Sneakers",
    },
    priceRange: { minVariantPrice: { amount: "110.00", currencyCode: "USD" } },
  },
  {
    id: "mock-5",
    title: "Minimalist Leather Wallet",
    description: "RFID blocking slim cardholder made from full-grain leather.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80",
      altText: "Wallet",
    },
    priceRange: { minVariantPrice: { amount: "45.00", currencyCode: "USD" } },
  },
];

export async function getShopifyProducts(): Promise<ShopifyProduct[]> {
  if (!domain || !storefrontAccessToken) {
    console.warn(
      "Shopify environment variables are missing. Using architecture simulation data.",
    );
    return FALLBACK_PRODUCTS;
  }

  const URL = `https://${domain}/api/2024-01/graphql.json`;

  const query = `
    query getProducts {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });

    const json = (await response.json()) as ShopifyProductsResponse;
    if ("errors" in json || !json.data?.products) {
      return FALLBACK_PRODUCTS;
    }
    return json.data.products.edges.map((edge) => edge.node);
  } catch (error: any) {
    console.error("Shopify storefront API connection lifecycle failed:", error);
    return FALLBACK_PRODUCTS;
  }
}
