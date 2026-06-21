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
      try {
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

        const aiData = JSON.parse(
          completion.choices[0].message.content || "{}",
        );
        return NextResponse.json({ success: true, data: aiData });
      } catch (aiError) {
        console.error(
          "OpenAI pipeline failed, falling back to local dataset automation:",
          aiError,
        );
      }
    }

    let industryData: any = {};

    if (industry === "Electronics") {
      industryData = {
        NewCustomer: {
          bannerTag: "WELCOME TECH UPGRADES",
          bannerTitle:
            "Power Your Hub: Enjoy $50 Off Workstation Command Centers",
          bannerDesc: `Revamp digital output workflows with absolute multi-docking solutions engineered for peak data speeds in ${targetMarket}.`,
          bannerBtn: "Claim $50 Setup Voucher",
          bannerHighlight: "Command Stations",
          products: [
            {
              name: "Command Station 14-in-1 Thunderbolt Hub",
              price: "$249.00",
              tag: "Essential Hub",
              img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Aluminum mechanical tactile key set",
              price: "$180.00",
              tag: "Tactile Tech",
              img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Smart ambient desktop monitor backing led",
              price: "$85.00",
              tag: "Ambient Lighting",
              img: "https://images.unsplash.com/photo-1555538995-7ccc83f6f14b?auto=format&fit=crop&q=80&w=400",
            },
          ],
        },
        VIPCustomer: {
          bannerTag: "PRIORITY ACCESS ALLOCATION",
          bannerTitle:
            "Audiophile Allocation Priority: Quantum Pro Studio Monitors",
          bannerDesc: `Custom high-fidelity digital converters compiled specifically for our peak workstation professionals in ${targetMarket}.`,
          bannerBtn: "Inspect Studio Allocations",
          bannerHighlight: "Quantum Studio",
          products: [
            {
              name: "Quantum Pro Studio Noise-Isolating Headphones",
              price: "$599.00",
              tag: "Strict Allocation",
              img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Titanium active health smart monitor watch",
              price: "$399.00",
              tag: "Premium Build",
              img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Multi-Angle High-Definition Content Stream Cam",
              price: "$289.00",
              tag: "Pro Production",
              img: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=400",
            },
          ],
        },
        ChurnRisk: {
          bannerTag: "STATION UPGRADE SYSTEM",
          bannerTitle: "Claim Free Cable Management Armor on Returning Orders",
          bannerDesc: `Rebuild a productive workspace with clean setups. New priority allocations now active for ${companyName}.`,
          bannerBtn: "Upgrade Workstation Space",
          bannerHighlight: "Cable Armour",
          products: [
            {
              name: "Handcrafted Top-Grain Leather Desk Organizer Pad",
              price: "$120.00",
              tag: "Executive Finish",
              img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Dual-Joint Gas-Spring Monitor Arm Mount",
              price: "$110.00",
              tag: "Workspace Recovery",
              img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Magnetic Multi-Device Qi Fast-Charge Stand",
              price: "$45.00",
              tag: "Complimentary Accessory",
              img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400",
            },
          ],
        },
        searchPrompts: [
          {
            query: "audio headphone sound DAC music",
            result:
              "Quantum Pro Studio Noise-Isolating Headphones (Low distortion drivers - VIP margin accelerator)\nCommand Station 14-in-1 Thunderbolt Hub (Clean electrical output shielding)",
          },
        ],
        campaigns: {
          emailSubject: `Upgrade Productivity: Assemble Your Absolute Workspace System at ${companyName}`,
          smsText: `Unshackle connectivity bottlenecks. Get early access to active Thunderbolt hubs at ${companyName.toLowerCase()}.com.`,
          bannerTitle: `Tailored Workspace Engineering - Mapped directly for ${companyName}`,
        },
        demoScript: [
          `Introduce ${companyName}. Highlight that their core strategic objective in the ${targetMarket} market is to ${strategicGoal}.`,
          `Toggle the storefront visitor persona segment switcher dropdown to simulate dynamic layout adjustments.`,
        ],
      };
    } else if (industry === "Pet Care") {
      industryData = {
        NewCustomer: {
          bannerTag: "WELCOME TIER OFFERS",
          bannerTitle:
            "Treat Your Companion: Save 20% On Organic Starter Packs",
          bannerDesc: `Tailor custom grain-free meal plans compiled based on your companion's size, age, and lifestyle parameters across ${targetMarket}.`,
          bannerBtn: "Claim 20% Starter Discount",
          bannerHighlight: "Organic Diets",
          products: [
            {
              name: "Puppy Organic Grain-Free Starter Dry Food",
              price: "$35.00",
              tag: "Starter Meal",
              img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Active Gentle-Digest Live Enzymes Mix",
              price: "$22.00",
              tag: "Digestion Support",
              img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Eco-Hemp Comfortable Heavy Trail Leash",
              price: "$18.00",
              tag: "Walk Kit",
              img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400",
            },
          ],
        },
        VIPCustomer: {
          bannerTag: "AUTOSHIP SUBSCRIBER REWARD",
          bannerTitle: "Loyalty Premium Perk: Free Superfood Infusion Addons",
          bannerDesc: `Maximize long-term companion energy with organic vitamin compounds added automatically to your automated subscriber run in ${targetMarket}.`,
          bannerBtn: "Manage My Autoship Program",
          bannerHighlight: "Autoship Circle",
          products: [
            {
              name: "Loomi Customized Premium Salmon Dry Food",
              price: "$85.00",
              tag: "Active Subscription",
              img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Ultra Glucosamine Complex Joint Care Tub",
              price: "$45.00",
              tag: "Premium Health",
              img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Hypoallergenic Calming Oatmeal Groom Spray",
              price: "$38.00",
              tag: "Wellness Kit",
              img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400",
            },
          ],
        },
        ChurnRisk: {
          bannerTag: "LOYALTY COMPANION REWARDS",
          bannerTitle:
            "We Miss Your Pup! Enjoy A Complimentary Gourmet Broth Tub",
          bannerDesc: `Re-activate your grain-free subscriber plan at ${companyName} and secure locked-in VIP prices forever.`,
          bannerBtn: "Activate Premium Rewards",
          bannerHighlight: "Companion Gifts",
          products: [
            {
              name: "Freeze-Dried Organic Turkey Gourmet Box",
              price: "$40.00",
              tag: "Gourmet Feed",
              img: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Anxiety-Relief Hemp Calming Chew Bites",
              price: "$28.00",
              tag: "Behavior Support",
              img: "https://images.unsplash.com/photo-1535268647977-a403b69fc756?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Biodegradable Gentle Grooming Sanitizer Wipes",
              price: "$12.00",
              tag: "Complimentary",
              img: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=400",
            },
          ],
        },
        searchPrompts: [
          {
            query: "puppy young nutrition dog allergy skin",
            result:
              "Puppy Organic Grain-Free Starter Dry Food (Caloric development)\nLoomi Customized Premium Salmon Dry Food (Hypoallergenic clean alternatives)",
          },
        ],
        campaigns: {
          emailSubject: `Secure Your Companion's Nutrition at ${companyName}: Free Dispatch Inside`,
          smsText: `Don't let them run out of healthy nutrition layouts. Complete checkouts on ${companyName.toLowerCase()}.com for active bonuses.`,
          bannerTitle: `Pure Ingredient Performance Engineered for ${companyName}`,
        },
        demoScript: [
          `Introduce ${companyName}'s target audience specs. Demonstrate how the organic supplement auto-ship paths resolve retention gaps.`,
          `Highlight the integrated Loomi search vector retrieval systems during client walkthrough configurations.`,
        ],
      };
    } else {
      industryData = {
        NewCustomer: {
          bannerTag: "NEW VISITOR DEAL",
          bannerTitle:
            "Conquer the Cold: Unlock 15% Off Your First Adventure System",
          bannerDesc: `Register today and receive custom eco-insulated garments engineered for harsh sub-zero conditions across ${targetMarket}.`,
          bannerBtn: "Unlock 15% Welcome Discount",
          bannerHighlight: "Alpine Shells",
          products: [
            {
              name: "Rain-Shield Hooded Shell Jacket",
              price: "$149.00",
              tag: "Best Seller",
              img: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "All-Weather Active Cargo Trousers",
              price: "$120.00",
              tag: "New Arrival",
              img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Water-Resistant All-Terrain Drypack",
              price: "$85.00",
              tag: "Eco Friendly",
              img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400",
            },
          ],
        },
        VIPCustomer: {
          bannerTag: "VIP MEMBER ALLOCATION",
          bannerTitle: "Exclusive Early Access: Handcrafted Alpine Parka Lines",
          bannerDesc: `Custom dynamic selections compiled exclusively for our highest lifetime loyalty active members in ${targetMarket}.`,
          bannerBtn: "View Private Reserve",
          bannerHighlight: "Elite Peak",
          products: [
            {
              name: "Expedition Summit Gore-Tex Parka jacket",
              price: "$420.00",
              tag: "VIP Exclusive",
              img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Arctic Pro Multi-Thermal Parka Shell",
              price: "$299.00",
              tag: "Premium Style",
              img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Snow-Trek Deep Grip Hiking Boots",
              price: "$245.00",
              tag: "Limited Allocation",
              img: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=400",
            },
          ],
        },
        ChurnRisk: {
          bannerTag: "WE MISS YOU",
          bannerTitle: "Come Back and Apply $50 Directly to Your Saved Pack",
          bannerDesc: `Your adventure is best shared. Here is a specialized profile credit ready for ${companyName}'s basket.`,
          bannerBtn: "Apply $50 Loyalty Credit",
          bannerHighlight: "Return Offer",
          products: [
            {
              name: "Thermal Active Hybrid Base Layer Pack",
              price: "$110.00",
              tag: "Special Set",
              img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Micro-Grid Fleece Breathable Thermal Hood",
              price: "$95.00",
              tag: "Essentials",
              img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=400",
            },
            {
              name: "Weather-Tough Cushion Merino Sock Set",
              price: "$35.00",
              tag: "Complimentary Set",
              img: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=400",
            },
          ],
        },
        searchPrompts: [
          {
            query: "norway snow winter heavy rain wet",
            result:
              "Expedition Summit Gore-Tex Parka jacket (High thermal test - VIP conversion tier)\nRain-Shield Hooded Shell Jacket (Fully waterproof membrane structure)",
          },
        ],
        campaigns: {
          emailSubject: `Curated Seasonal Performance Lookbook for ${companyName}`,
          smsText: `Your dynamic outerwear cart profile has been reserved. Complete order before allocation limits reset at ${companyName.toLowerCase()}.com.`,
          bannerTitle: `Tailored Wardrobe Architecture - Exclusively for ${companyName}`,
        },
        demoScript: [
          `Demonstrate to ${companyName} how personalized storefront systems directly accelerate AOV target tiers.`,
          `Simulate user profile sequence shifts across active member segments to showcase instant content variations.`,
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
