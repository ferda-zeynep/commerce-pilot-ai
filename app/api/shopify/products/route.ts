import { NextResponse } from "next/server";
import { getShopifyProducts } from "@/lib/shopify";

export async function GET() {
  try {
    const products = await getShopifyProducts();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
