export interface DemoPayloadSchema {
  companyName: string;
  industry: "Fashion" | "Pet Care" | "Electronics";
  targetMarket: string;
  strategicGoal: string;
}

export interface CatalogProduct {
  name: string;
  price: string;
  tag: string;
  img: string;
  description: string;
}

export interface PersonaCatalogTemplate {
  bannerTag: string;
  bannerTitle: string;
  bannerDesc: string;
  bannerBtn: string;
  bannerHighlight: string;
  products: CatalogProduct[];
}

export interface GeneratedSandboxData {
  brandProfile: string;
  NewCustomer: PersonaCatalogTemplate;
  VIPCustomer: PersonaCatalogTemplate;
  ChurnRisk: PersonaCatalogTemplate;
  searchPrompts: string[];
  demoScript: string[];
  campaigns: {
    emailSubject: string;
    smsText: string;
    bannerTitle: string;
  };
}
