import { NextResponse } from "next/server";
import { getShopifyProducts, FALLBACK_PRODUCTS } from "@/lib/shopify";

export async function GET() {
  try {
    const products = await getShopifyProducts();

    if (!products || products.length === 0) {
      return NextResponse.json({ success: true, products: FALLBACK_PRODUCTS });
    }

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("API Route error fetching products:", error);
    return NextResponse.json({ success: true, products: FALLBACK_PRODUCTS });
  }
}
