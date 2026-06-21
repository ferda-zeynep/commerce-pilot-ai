import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, industry, targetMarket, strategicGoal } = body;

    if (!companyName || !targetMarket) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (openai) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a B2B Presales Personalized Data Generator for Bloomreach. Output ONLY a valid JSON object matching the requested schema. Use highly realistic, photorealistic image URLs from unsplash for the product 'img' field based on the industry.`,
          },
          {
            role: "user",
            content: `Generate a demo environment for ${companyName} in the ${industry} sector for ${targetMarket} market.`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const aiData = JSON.parse(completion.choices[0].message.content || "{}");
      return NextResponse.json({ success: true, data: aiData });
    }

    let industryData: any = {};

    if (industry === "Electronics") {
      industryData = {
        NewCustomer: {
          bannerTitle: `Upgrade Your Audio Setup with Premium Acoustic Gear`,
          bannerDesc: `Discover high-fidelity sound engineered for professionals in ${targetMarket}. Exclusive welcome offer inside.`,
          bannerTag: "NEW VISITOR EXCLUSIVE",
          bannerBtn: "Explore Studio Kits",
          products: [
            {
              name: "Pro DAC Station V2",
              price: "$189.00",
              tag: "Best Seller",
              img: "https://images.unsplash.com/photo-1558089687-f282ffcbd1d5?q=80&w=300&auto=format&fit=crop",
              description:
                "Studio-grade digital to analog converter for high-res monitoring.",
            },
            {
              name: "Noise Isolating Smart Pads",
              price: "$45.00",
              tag: "Trending",
              img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=300&auto=format&fit=crop",
              description:
                "Memory foam ear cushions optimized for spatial audio depth.",
            },
          ],
        },
        VIPCustomer: {
          bannerTitle: `Welcome Back to the Executive Tier`,
          bannerDesc: `Premium sound innovations curated specifically for your corporate workspace needs.`,
          bannerTag: "VIP LOYALTY CLUB",
          bannerBtn: "Access Private Drop",
          products: [
            {
              name: "Limited Edition Reference Monitors",
              price: "$499.00",
              tag: "VIP Only",
              img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=300&auto=format&fit=crop",
              description:
                "Hand-calibrated studio monitors with carbon fiber drivers.",
            },
          ],
        },
        ChurnRisk: {
          bannerTitle: `We Miss Your Sound Session`,
          bannerDesc: `Complete your studio checkout today and receive premium high-margin accessory protection plans.`,
          bannerTag: "RETENTION OFFER",
          bannerBtn: "Reclaim Checkout",
          products: [
            {
              name: "Premium XLR Braided Cables",
              price: "$29.00",
              tag: "Gift Attached",
              img: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=300&auto=format&fit=crop",
              description:
                "Ultra-low capacitance signal routing cables with lifetime warranty.",
            },
          ],
        },
        searchPrompts: ["studio monitors", "DAC cables", "headphones"],
        campaigns: {
          emailSubject: `Exclusive Audio Upgrades for ${companyName} Professionals`,
          smsText: `Hey! Elevate your desk setup with personalized audio configurations.`,
          bannerTitle: `Next-Gen Sound Intelligence Built for ${companyName}`,
        },
        demoScript: [
          `Open the storefront tab to demonstrate the customized ${companyName} audio banner context.`,
        ],
      };
    } else if (industry === "Pet Care") {
      industryData = {
        NewCustomer: {
          bannerTitle: `Superfood Nutrition Tailored for Your Dog`,
          bannerDesc: `Organic recipes formulated to support active lifestyles across ${targetMarket}.`,
          bannerTag: "FIRST ORDER BOOST",
          bannerBtn: "Build Healthy Bowl",
          products: [
            {
              name: "Organic Turkey & Berry Bites",
              price: "$18.50",
              tag: "Organic Certified",
              img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=300&auto=format&fit=crop",
              description:
                "Grain-free reward treats packed with essential antioxidants.",
            },
            {
              name: "Probiotic Salmon Oil Blend",
              price: "$24.00",
              tag: "Immune Support",
              img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=300&auto=format&fit=crop",
              description:
                "Cold-pressed wild salmon oil for skin and coat vitality.",
            },
          ],
        },
        VIPCustomer: {
          bannerTitle: `Your Subscription Dashboard Is Fully Restocked`,
          bannerDesc: `Automatic recurring shipments scheduled to arrive directly at your door.`,
          bannerTag: "AUTO-REPLENISH",
          bannerBtn: "Manage Deliveries",
          products: [
            {
              name: "Bulk Kibble Auto-Box",
              price: "$68.00",
              tag: "Subscriber Tier",
              img: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=300&auto=format&fit=crop",
              description: "Monthly supply of tailored high-protein nutrition.",
            },
          ],
        },
        ChurnRisk: {
          bannerTitle: `Keep Your Pet Thriving - Special Resubscribe Deal`,
          bannerDesc: `Zero commitment loops. Reactivate today.`,
          bannerTag: "WE MISS YOU",
          bannerBtn: "Unlock Free Shipment",
          products: [
            {
              name: "Dehydrated Beef Liver Toppers",
              price: "$12.00",
              tag: "Free Addition",
              img: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=300&auto=format&fit=crop",
              description:
                "Single-ingredient meal enhancer designed for picky eaters.",
            },
          ],
        },
        searchPrompts: ["salmon oil", "organic snacks"],
        campaigns: {
          emailSubject: `Is your dog's meal plan fully optimized, ${companyName}?`,
          smsText: `Your subscription box is ready to ship with new custom items.`,
          bannerTitle: `Pure Ingredient Performance Engineered for ${companyName}`,
        },
        demoScript: [
          `Highlight how the auto-replenish subscriber flows dynamically update.`,
        ],
      };
    } else {
      // FASHION & APPAREL
      industryData = {
        NewCustomer: {
          bannerTitle: `Uncompromising Seasonal Tailoring & Alpine Outerwear`,
          bannerDesc: `Explore curated minimalist collections engineered for the modern climate in ${targetMarket}.`,
          bannerTag: "SEASONAL RESET",
          bannerBtn: "View Lookbook",
          products: [
            {
              name: "Minimalist Heavyweight Hoodie",
              price: "$85.00",
              tag: "EcoThread",
              img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=300&auto=format&fit=crop",
              description:
                "350gsm organic cotton loungewear cut with custom drop shoulders.",
            },
            {
              name: "Waterproof Alpine Shell Jacket",
              price: "$145.00",
              tag: "All-Weather",
              img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=300&auto=format&fit=crop",
              description:
                "Triple-layer technical membrane built to sustain mountain elements.",
            },
          ],
        },
        VIPCustomer: {
          bannerTitle: `Exclusive Early Access: Private Collection Autumn Preview`,
          bannerDesc: `Reserved tier availability for high-value patrons.`,
          bannerTag: "TIER ACQUISITION",
          bannerBtn: "Unlock Runway Vault",
          products: [
            {
              name: "Premium Cashmere Oversized Sweater",
              price: "$210.00",
              tag: "Limited Run",
              img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=300&auto=format&fit=crop",
              description:
                "100% fine Mongolian cashmere weave sourced with sustainable certifications.",
            },
          ],
        },
        ChurnRisk: {
          bannerTitle: `Your Wardrobe Cart Is Still Waiting`,
          bannerDesc: `Reactivate your shopping session today.`,
          bannerTag: "CART RESOLUTION",
          bannerBtn: "Complete Checkout",
          products: [
            {
              name: "Merino Wool Performance Socks",
              price: "$19.00",
              tag: "Bonus Item",
              img: "https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=300&auto=format&fit=crop",
              description:
                "High-density thermal cushioning engineered for long-distance durability.",
            },
          ],
        },
        searchPrompts: ["hoodie", "outerwear"],
        campaigns: {
          emailSubject: `Curated Seasonal Performance Lookbook for ${companyName}`,
          smsText: `Your dynamic cart profile has been reserved.`,
          bannerTitle: `Tailored Wardrobe Architecture - Exclusively for ${companyName}`,
        },
        demoScript: [
          `Demonstrate to ${companyName} how personalized e-commerce storefronts boost AOV metrics.`,
        ],
      };
    }

    return NextResponse.json({ success: true, data: industryData });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
