import { ShopifyProductsResponse, ShopifyProduct } from "@/types/shopify";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function getShopifyProducts(): Promise<ShopifyProduct[]> {
  if (!domain || !storefrontAccessToken) {
    console.warn(
      "Shopify environment variables are missing. Using architecture simulation data.",
    );
    return [
      {
        id: "mock-1",
        title: "Alpha Bomber Jacket",
        description: "Premium tech-wear water-resistant bomber jacket.",
        featuredImage: {
          url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
          altText: "Jacket",
        },
        priceRange: {
          minVariantPrice: { amount: "120.00", currencyCode: "USD" },
        },
      },
      {
        id: "mock-2",
        title: "Minimalist Black Hoodie",
        description: "Heavyweight organic cotton lifestyle hoodie.",
        featuredImage: {
          url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
          altText: "Hoodie",
        },
        priceRange: {
          minVariantPrice: { amount: "85.00", currencyCode: "USD" },
        },
      },
      {
        id: "mock-3",
        title: "Overpack Studio Backpack",
        description: "Modular commuter bag with laptop sleeve security.",
        featuredImage: {
          url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
          altText: "Bag",
        },
        priceRange: {
          minVariantPrice: { amount: "145.00", currencyCode: "USD" },
        },
      },
    ];
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
    return json.data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Shopify storefront API connection lifecycle failed:", error);
    return [];
  }
}
