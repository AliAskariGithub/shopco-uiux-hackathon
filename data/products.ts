export interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
}

export interface ProductColor {
  name: string;
  bgColor: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  reviewCount: number;
  description: string;
  category: "T-shirts" | "Shorts" | "Shirts" | "Hoodie" | "Jeans";
  style: "Casual" | "Formal" | "Party" | "Gym";
  image: string;
  galleryImages: string[];
  colors: ProductColor[];
  sizes: string[];
  isNewArrival?: boolean;
  isOnSale?: boolean;
  isTopSelling?: boolean;
  reviews: Review[];
  details: {
    material: string;
    fit: string;
    care: string;
    origin: string;
  };
}

const defaultReviews: Review[] = [
  {
    id: "r1",
    name: "Samantha D.",
    rating: 5,
    review:
      "I absolutely love this product! The fabric feels premium and comfortable for all-day wear. The fit is true to size and the colors match the pictures perfectly.",
    date: "August 14, 2024",
    verified: true,
  },
  {
    id: "r2",
    name: "Alex K.",
    rating: 4.5,
    review:
      "Finding clothes that align with my personal style used to be a challenge until I found this. Excellent stitching and high-quality material that lasts wash after wash.",
    date: "August 10, 2024",
    verified: true,
  },
  {
    id: "r3",
    name: "Ethan R.",
    rating: 5,
    review:
      "This item exceeded my expectations. The attention to detail, from the seams to the collar lining, is remarkable for this price range. Highly recommend!",
    date: "July 29, 2024",
    verified: true,
  },
  {
    id: "r4",
    name: "Olivia M.",
    rating: 4,
    review:
      "Super versatile piece! I\'ve worn it casually during the day and dressed it up for an evening dinner. Received compliments all night.",
    date: "July 22, 2024",
    verified: true,
  },
];

export const products: Product[] = [
  // ==========================================
  // CASUAL (10 PRODUCTS)
  // ==========================================
  {
    id: "1",
    slug: "t-shirt-with-tape-details",
    name: "T-shirt with Tape Details",
    price: 120,
    rating: 4.5,
    reviewCount: 145,
    description: "A signature urban tee styled with contrast architectural tape detailing along the sleeves. Spun from heavyweight combed cotton for a relaxed, confident drape that maintains structure all day.",
    category: "T-shirts",
    style: "Casual",
    image: "/images/shirt1.png",
    galleryImages: ["/images/shirt1.png", "/images/shirt2.png", "/images/shirt3.png"],
    colors: [
      { name: "black", bgColor: "bg-[#1f2937]", hex: "#1f2937" },
      { name: "olive", bgColor: "bg-[#4b5320]", hex: "#4b5320" },
      { name: "charcoal", bgColor: "bg-[#374151]", hex: "#374151" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "100% Combed Heavyweight Cotton (240 GSM)",
      fit: "Relaxed Boxy Fit",
      care: "Machine wash cold inside-out, tumble dry low",
      origin: "Imported - Portugal"
    }
  },
  {
    id: "2",
    slug: "skinny-fit-jeans",
    name: "Skinny Fit Stretch Jeans",
    price: 240,
    originalPrice: 260,
    discount: "-20%",
    rating: 3.5,
    reviewCount: 88,
    description: "Precision-engineered skinny denim crafted with responsive 4-way micro-stretch fibers. Offers sculpted silhouette lines without sacrificing freedom of movement.",
    category: "Jeans",
    style: "Casual",
    image: "/images/pent1.png",
    galleryImages: ["/images/pent1.png", "/images/pent2.png", "/images/pent3.png"],
    colors: [
      { name: "indigo", bgColor: "bg-[#1e3a8a]", hex: "#1e3a8a" },
      { name: "washed-black", bgColor: "bg-[#18181b]", hex: "#18181b" },
      { name: "light-wash", bgColor: "bg-[#60a5fa]", hex: "#60a5fa" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "92% Organic Cotton, 6% Elastomultiester, 2% Elastane",
      fit: "Skinny Tapered Fit",
      care: "Machine wash cold inside-out, hang dry to retain shape",
      origin: "Imported - Turkey"
    }
  },
  {
    id: "3",
    slug: "checkered-shirt",
    name: "Checkered Flannel Shirt",
    price: 180,
    rating: 4.5,
    reviewCount: 112,
    description: "Classic multi-tone checkered flannel brushed on both sides for supreme softness. Features horn buttons and dual chest pockets for rugged yet elevated everyday layering.",
    category: "Shirts",
    style: "Casual",
    image: "/images/shirt3.png",
    galleryImages: ["/images/shirt3.png", "/images/shirt1.png", "/images/shirt2.png"],
    colors: [
      { name: "red-plaid", bgColor: "bg-[#991b1b]", hex: "#991b1b" },
      { name: "navy-plaid", bgColor: "bg-[#1e3a8a]", hex: "#1e3a8a" },
      { name: "forest", bgColor: "bg-[#166534]", hex: "#166534" }
    ],
    sizes: ["Medium", "Large", "X-Large"],
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "100% Double-Brushed Cotton Flannel",
      fit: "Standard Regular Fit",
      care: "Machine wash cold with like colors, warm iron if needed",
      origin: "Imported - Japan"
    }
  },
  {
    id: "4",
    slug: "sleeve-striped-t-shirt",
    name: "Sleeve Striped T-shirt",
    price: 130,
    originalPrice: 160,
    discount: "-30%",
    rating: 4.5,
    reviewCount: 96,
    description: "Athletic-inspired retro tee with contrast sleeve ringing. Made from silky ring-spun organic cotton with reinforced rib-knit neck ribbing.",
    category: "T-shirts",
    style: "Casual",
    image: "/images/shirt2.png",
    galleryImages: ["/images/shirt2.png", "/images/shirt1.png", "/images/shirt4.png"],
    colors: [
      { name: "terracotta", bgColor: "bg-[#c2410c]", hex: "#c2410c" },
      { name: "navy", bgColor: "bg-[#1e3a8a]", hex: "#1e3a8a" },
      { name: "cream", bgColor: "bg-[#fef3c7]", hex: "#fef3c7" }
    ],
    sizes: ["Small", "Medium", "Large"],
    isOnSale: true,
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "100% Ring-Spun Organic Cotton",
      fit: "Modern Regular Fit",
      care: "Machine wash warm, tumble dry gentle",
      origin: "Imported - Peru"
    }
  },
  {
    id: "5",
    slug: "vertical-striped-shirt",
    name: "Vertical Striped Shirt",
    price: 212,
    originalPrice: 232,
    discount: "-20%",
    rating: 5.0,
    reviewCount: 168,
    description: "Airy camp-collar shirt with crisp vertical resort stripes. Breathable linen-cotton blend keeps you cool and poised in sunny climates.",
    category: "Shirts",
    style: "Casual",
    image: "/images/shirt13.png",
    galleryImages: ["/images/shirt13.png", "/images/shirt11.png", "/images/shirt12.png"],
    colors: [
      { name: "coastal-blue", bgColor: "bg-[#38bdf8]", hex: "#38bdf8" },
      { name: "sage", bgColor: "bg-[#84cc16]", hex: "#84cc16" },
      { name: "stone", bgColor: "bg-[#a8a29e]", hex: "#a8a29e" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "55% French Linen, 45% Organic Cotton",
      fit: "Relaxed Camp Fit",
      care: "Machine wash cold gentle, air dry recommended",
      origin: "Imported - France"
    }
  },
  {
    id: "6",
    slug: "courage-graphic-t-shirt",
    name: "Courage Graphic T-shirt",
    price: 145,
    rating: 4.0,
    reviewCount: 82,
    description: "Minimalist graphic tee featuring hand-rendered inspirational typography. Ultra-soft jersey knit treated with enzyme silicone wash for broken-in vintage feel.",
    category: "T-shirts",
    style: "Casual",
    image: "/images/shirt4.png",
    galleryImages: ["/images/shirt4.png", "/images/shirt5.png", "/images/shirt6.png"],
    colors: [
      { name: "off-white", bgColor: "bg-[#f5f5f4]", hex: "#f5f5f4" },
      { name: "charcoal", bgColor: "bg-[#374151]", hex: "#374151" },
      { name: "sand", bgColor: "bg-[#d6d3d1]", hex: "#d6d3d1" }
    ],
    sizes: ["Small", "Medium", "Large"],
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "100% Combed Cotton Jersey",
      fit: "True to Size Regular Fit",
      care: "Machine wash cold, iron inside out",
      origin: "Imported - Portugal"
    }
  },
  {
    id: "7",
    slug: "loose-fit-bermuda-shorts",
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    rating: 3.0,
    reviewCount: 54,
    description: "Relaxed knee-length Bermuda shorts crafted from durable cotton twill. Designed with slant side pockets and adjustable internal drawstring waistband.",
    category: "Shorts",
    style: "Casual",
    image: "/images/shirt7.png",
    galleryImages: ["/images/shirt7.png", "/images/shirt8.png", "/images/pent1.png"],
    colors: [
      { name: "khaki", bgColor: "bg-[#d4a373]", hex: "#d4a373" },
      { name: "navy", bgColor: "bg-[#1e3a8a]", hex: "#1e3a8a" },
      { name: "olive", bgColor: "bg-[#4b5320]", hex: "#4b5320" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    reviews: defaultReviews,
    details: {
      material: "100% Cotton Chino Twill",
      fit: "Loose Relaxed Fit",
      care: "Machine wash warm, tumble dry medium",
      origin: "Imported - Bangladesh"
    }
  },
  {
    id: "8",
    slug: "faded-skinny-jeans",
    name: "Faded Skinny Jeans",
    price: 210,
    rating: 4.5,
    reviewCount: 139,
    description: "Authentic hand-whiskered distressed denim featuring gentle knee fades and subtle abrasion. Finished with premium copper rivets and reinforced belt loops.",
    category: "Jeans",
    style: "Casual",
    image: "/images/pent2.png",
    galleryImages: ["/images/pent2.png", "/images/pent1.png", "/images/pent3.png"],
    colors: [
      { name: "faded-blue", bgColor: "bg-[#60a5fa]", hex: "#60a5fa" },
      { name: "vintage-grey", bgColor: "bg-[#6b7280]", hex: "#6b7280" },
      { name: "black", bgColor: "bg-[#18181b]", hex: "#18181b" }
    ],
    sizes: ["Medium", "Large", "X-Large"],
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "98% Cotton, 2% Spandex",
      fit: "Skinny Fit with 2-way stretch",
      care: "Machine wash cold inside out, hang dry",
      origin: "Imported - Mexico"
    }
  },
  {
    id: "9",
    slug: "mock-neck-zipper-sweatshirt",
    name: "Mock Neck Zipper Sweatshirt",
    price: 150,
    originalPrice: 180,
    discount: "-20%",
    rating: 4.2,
    reviewCount: 94,
    description: "Cozy mock neck sweatshirt featuring an engineered quarter-zip closure. Brushed fleece interior provides ultimate insulation while maintaining a crisp exterior profile.",
    category: "Hoodie",
    style: "Casual",
    image: "/images/shirt12.png",
    galleryImages: ["/images/shirt12.png", "/images/shirt11.png", "/images/shirt10.png"],
    colors: [
      { name: "peach", bgColor: "bg-[#fed7aa]", hex: "#fed7aa" },
      { name: "green", bgColor: "bg-[#314F4A]", hex: "#314F4A" },
      { name: "blue", bgColor: "bg-[#31344F]", hex: "#31344F" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    reviews: defaultReviews,
    details: {
      material: "80% Cotton, 20% Polyester Heavyweight Fleece",
      fit: "Relaxed Boxy Fit",
      care: "Machine wash cold, tumble dry low",
      origin: "Imported - Canada"
    }
  },
  {
    id: "10",
    slug: "classic-crewneck-everyday-tee",
    name: "Classic Crewneck Everyday Tee",
    price: 95,
    rating: 4.6,
    reviewCount: 172,
    description: "The quintessential wardrobe staple. Premium midweight jersey cut with a timeless crew neckline, tailored shoulders, and pre-shrunk construction for guaranteed longevity.",
    category: "T-shirts",
    style: "Casual",
    image: "/images/shirt6.png",
    galleryImages: ["/images/shirt6.png", "/images/shirt5.png", "/images/shirt1.png"],
    colors: [
      { name: "jet-black", bgColor: "bg-[#09090b]", hex: "#09090b" },
      { name: "heather-grey", bgColor: "bg-[#9ca3af]", hex: "#9ca3af" },
      { name: "pure-white", bgColor: "bg-[#ffffff]", hex: "#ffffff" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "100% Pima Cotton",
      fit: "Classic Regular Fit",
      care: "Machine wash cold, tumble dry low",
      origin: "Imported - Peru"
    }
  },

  // ==========================================
  // FORMAL (10 PRODUCTS)
  // ==========================================
  {
    id: "11",
    slug: "navy-monarch-tailored-shirt",
    name: "Navy Monarch Tailored Shirt",
    price: 165,
    originalPrice: 210,
    discount: "-21%",
    rating: 4.9,
    reviewCount: 184,
    description: "Impeccably tailored from two-ply 120s compact cotton twill. Deep royal navy luster with French placket, stiff spread collar, and mother-of-pearl buttons.",
    category: "Shirts",
    style: "Formal",
    image: "/images/formal_1.png",
    galleryImages: ["/images/formal_1.png", "/images/formal_6.png", "/images/formal_3.png"],
    colors: [
      { name: "royal-navy", bgColor: "bg-[#1e293b]", hex: "#1e293b" },
      { name: "slate", bgColor: "bg-[#475569]", hex: "#475569" },
      { name: "crisp-white", bgColor: "bg-[#ffffff]", hex: "#ffffff" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "100% Egyptian Giza Cotton Twill (120/2 yarn count)",
      fit: "Modern Tailored Slim Fit",
      care: "Dry clean or gentle machine wash cold, warm iron",
      origin: "Crafted in Italy"
    }
  },
  {
    id: "12",
    slug: "emerald-executive-oxford-shirt",
    name: "Emerald Executive Oxford Shirt",
    price: 175,
    rating: 4.8,
    reviewCount: 142,
    description: "A commanding rich emerald dress shirt woven in heavy royal oxford cloth. Designed for boardroom presence with a structured cutaway collar and convertible barrel cuffs.",
    category: "Shirts",
    style: "Formal",
    image: "/images/formal_2.png",
    galleryImages: ["/images/formal_2.png", "/images/formal_1.png", "/images/formal_5.png"],
    colors: [
      { name: "emerald", bgColor: "bg-[#064e3b]", hex: "#064e3b" },
      { name: "forest", bgColor: "bg-[#14532d]", hex: "#14532d" },
      { name: "deep-navy", bgColor: "bg-[#0f172a]", hex: "#0f172a" }
    ],
    sizes: ["Medium", "Large", "X-Large"],
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "100% Organic Long-Staple Royal Oxford Cotton",
      fit: "Tailored Executive Fit",
      care: "Professional dry clean recommended",
      origin: "Crafted in Milan, Italy"
    }
  },
  {
    id: "13",
    slug: "charcoal-heritage-dress-shirt",
    name: "Charcoal Heritage Dress Shirt",
    price: 155,
    originalPrice: 195,
    discount: "-20%",
    rating: 4.7,
    reviewCount: 120,
    description: "Sleek charcoal grey luxury shirt with satin weave sheen. Hand-set armholes and subtle darts along the spine ensure a bespoke-level contour under blazers.",
    category: "Shirts",
    style: "Formal",
    image: "/images/formal_3.png",
    galleryImages: ["/images/formal_3.png", "/images/formal_1.png", "/images/pent4.png"],
    colors: [
      { name: "charcoal", bgColor: "bg-[#334155]", hex: "#334155" },
      { name: "graphite", bgColor: "bg-[#1e293b]", hex: "#1e293b" },
      { name: "matte-black", bgColor: "bg-[#0f172a]", hex: "#0f172a" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    reviews: defaultReviews,
    details: {
      material: "98% Mercerized Cotton, 2% Stretch Silk",
      fit: "Slim Fit with Back Darts",
      care: "Dry clean only",
      origin: "Imported - Portugal"
    }
  },
  {
    id: "14",
    slug: "imperial-plum-tailored-shirt",
    name: "Imperial Plum Tailored Shirt",
    price: 185,
    rating: 4.9,
    reviewCount: 164,
    description: "Subtle imperial plum tone woven with micro-herringbone texture. Perfect for diplomatic engagements, formal galas, and sophisticated evening affairs.",
    category: "Shirts",
    style: "Formal",
    image: "/images/formal_4.png",
    galleryImages: ["/images/formal_4.png", "/images/formal_5.png", "/images/formal_2.png"],
    colors: [
      { name: "plum", bgColor: "bg-[#581c87]", hex: "#581c87" },
      { name: "burgundy", bgColor: "bg-[#831843]", hex: "#831843" },
      { name: "midnight", bgColor: "bg-[#1e1b4b]", hex: "#1e1b4b" }
    ],
    sizes: ["Small", "Medium", "Large"],
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "100% Superfine Herringbone Weave Cotton",
      fit: "European Slim Fit",
      care: "Dry clean or delicate cycle cold, warm iron",
      origin: "Crafted in England"
    }
  },
  {
    id: "15",
    slug: "burgundy-regency-formal-shirt",
    name: "Burgundy Regency Formal Shirt",
    price: 190,
    originalPrice: 230,
    discount: "-17%",
    rating: 4.8,
    reviewCount: 110,
    description: "Regal burgundy poplin dress shirt featuring hidden placket buttons and double-barrel cuffs compatible with luxury cufflinks.",
    category: "Shirts",
    style: "Formal",
    image: "/images/formal_5.png",
    galleryImages: ["/images/formal_5.png", "/images/formal_4.png", "/images/formal_1.png"],
    colors: [
      { name: "burgundy", bgColor: "bg-[#881337]", hex: "#881337" },
      { name: "wine", bgColor: "bg-[#701a75]", hex: "#701a75" },
      { name: "onyx", bgColor: "bg-[#09090b]", hex: "#09090b" }
    ],
    sizes: ["Medium", "Large", "X-Large"],
    isOnSale: true,
    reviews: defaultReviews,
    details: {
      material: "100% High-Density Egyptian Cotton Poplin",
      fit: "Tailored Modern Cut",
      care: "Dry clean recommended",
      origin: "Crafted in Italy"
    }
  },
  {
    id: "16",
    slug: "slate-silver-executive-shirt",
    name: "Slate Silver Executive Shirt",
    price: 160,
    rating: 4.6,
    reviewCount: 95,
    description: "Refined cool-slate dress shirt offering natural crease resistance. Engineered with seamless collar stays and clean topstitched hems.",
    category: "Shirts",
    style: "Formal",
    image: "/images/formal_6.png",
    galleryImages: ["/images/formal_6.png", "/images/formal_3.png", "/images/formal_1.png"],
    colors: [
      { name: "slate", bgColor: "bg-[#64748b]", hex: "#64748b" },
      { name: "ice-blue", bgColor: "bg-[#93c5fd]", hex: "#93c5fd" },
      { name: "pearl-white", bgColor: "bg-[#f8fafc]", hex: "#f8fafc" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "100% Wrinkle-Resistant Pima Cotton",
      fit: "Tailored Slim Fit",
      care: "Machine wash cold delicate, hang dry, low steam",
      origin: "Imported - Portugal"
    }
  },
  {
    id: "17",
    slug: "amber-bronze-tuxedo-shirt",
    name: "Amber Bronze Tuxedo Shirt",
    price: 215,
    rating: 5.0,
    reviewCount: 78,
    description: "Warm amber gold metallic-accented formal dress shirt. Designed to be paired with velvet dinner jackets and black tie ensembles.",
    category: "Shirts",
    style: "Formal",
    image: "/images/formal_7.png",
    galleryImages: ["/images/formal_7.png", "/images/formal_1.png", "/images/formal_2.png"],
    colors: [
      { name: "amber-gold", bgColor: "bg-[#d97706]", hex: "#d97706" },
      { name: "champagne", bgColor: "bg-[#fde68a]", hex: "#fde68a" },
      { name: "obsidian", bgColor: "bg-[#0f172a]", hex: "#0f172a" }
    ],
    sizes: ["Small", "Medium", "Large"],
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "90% Mulberry Silk, 10% Cotton",
      fit: "Slim Evening Cut",
      care: "Specialist dry clean only",
      origin: "Crafted in Florence, Italy"
    }
  },
  {
    id: "18",
    slug: "viscose-blend-shirt",
    name: "Viscose Blend Dress Shirt",
    price: 140,
    originalPrice: 190,
    discount: "-26%",
    rating: 4.5,
    reviewCount: 128,
    description: "A tailored viscose blend shirt designed for superior breathability and a sleek, modern drape. Perfect for layering under three-piece suits.",
    category: "Shirts",
    style: "Formal",
    image: "/images/shirt11.png",
    galleryImages: ["/images/shirt11.png", "/images/formal_1.png", "/images/formal_6.png"],
    colors: [
      { name: "lightblue", bgColor: "bg-[#7dd3fc]", hex: "#7dd3fc" },
      { name: "green", bgColor: "bg-[#314F4A]", hex: "#314F4A" },
      { name: "blue", bgColor: "bg-[#31344F]", hex: "#31344F" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    reviews: defaultReviews,
    details: {
      material: "65% Viscose, 35% Cotton",
      fit: "Regular Slim Fit",
      care: "Machine wash cold, gentle cycle. Hang dry.",
      origin: "Imported - Portugal"
    }
  },
  {
    id: "19",
    slug: "pleated-tailored-trousers",
    name: "Pleated Tailored Wool Trousers",
    price: 260,
    rating: 4.9,
    reviewCount: 148,
    description: "Bespoke-grade trousers featuring double forward pleats, side waist adjusters in place of belt loops, and an elegant unfinished hem.",
    category: "Jeans",
    style: "Formal",
    image: "/images/pent4.png",
    galleryImages: ["/images/pent4.png", "/images/pent3.png", "/images/formal_1.png"],
    colors: [
      { name: "charcoal", bgColor: "bg-[#374151]", hex: "#374151" },
      { name: "midnight-navy", bgColor: "bg-[#1e3a8a]", hex: "#1e3a8a" },
      { name: "black", bgColor: "bg-[#09090b]", hex: "#09090b" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "100% Super 130s Merino Wool (Vitale Barberis Canonico)",
      fit: "Tailored Tapered Leg with High Rise",
      care: "Professional dry clean only",
      origin: "Crafted in Biella, Italy"
    }
  },
  {
    id: "20",
    slug: "classic-oxford-chinos",
    name: "Classic Oxford Sartorial Trousers",
    price: 195,
    originalPrice: 240,
    discount: "-18%",
    rating: 4.7,
    reviewCount: 114,
    description: "Sleek formal chinos constructed from premium combed gabardine. Features blind hems, curtained waistband, and back welt pockets.",
    category: "Jeans",
    style: "Formal",
    image: "/images/pent3.png",
    galleryImages: ["/images/pent3.png", "/images/pent4.png", "/images/formal_3.png"],
    colors: [
      { name: "navy", bgColor: "bg-[#1e3a8a]", hex: "#1e3a8a" },
      { name: "stone", bgColor: "bg-[#e2e8f0]", hex: "#e2e8f0" },
      { name: "anthracite", bgColor: "bg-[#1e293b]", hex: "#1e293b" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    reviews: defaultReviews,
    details: {
      material: "97% Compact Cotton Gabardine, 3% Elastane",
      fit: "Sartorial Straight Slim",
      care: "Dry clean or wash cold delicate",
      origin: "Crafted in Portugal"
    }
  },

  // ==========================================
  // PARTY (10 PRODUCTS)
  // ==========================================
  {
    id: "21",
    slug: "midnight-metallic-party-shirt",
    name: "Midnight Metallic Party Shirt",
    price: 195,
    originalPrice: 245,
    discount: "-20%",
    rating: 4.8,
    reviewCount: 135,
    description: "Turn heads after hours. Interwoven lurex metallic threads catch strobe and ambient nightclub lighting with iridescent royal blue depth.",
    category: "Shirts",
    style: "Party",
    image: "/images/party_1.png",
    galleryImages: ["/images/party_1.png", "/images/party_7.png", "/images/party_5.png"],
    colors: [
      { name: "metallic-midnight", bgColor: "bg-[#1e1b4b]", hex: "#1e1b4b" },
      { name: "silver-sheen", bgColor: "bg-[#94a3b8]", hex: "#94a3b8" },
      { name: "jet-black", bgColor: "bg-[#09090b]", hex: "#09090b" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "85% Silk Chiffon, 15% Metallic Lurex",
      fit: "Flowy Modern Party Fit",
      care: "Hand wash cold delicate, hang dry in shade",
      origin: "Imported - South Korea"
    }
  },
  {
    id: "22",
    slug: "emerald-glitz-club-shirt",
    name: "Emerald Glitz Club Shirt",
    price: 180,
    rating: 4.9,
    reviewCount: 96,
    description: "Vibrant high-luster emerald satin shirt tailored with a fluid camp collar. Created specifically for VIP events, lounges, and rooftop gatherings.",
    category: "Shirts",
    style: "Party",
    image: "/images/party_2.png",
    galleryImages: ["/images/party_2.png", "/images/party_3.png", "/images/party_1.png"],
    colors: [
      { name: "emerald-glow", bgColor: "bg-[#059669]", hex: "#059669" },
      { name: "jade", bgColor: "bg-[#10b981]", hex: "#10b981" },
      { name: "black-emerald", bgColor: "bg-[#064e3b]", hex: "#064e3b" }
    ],
    sizes: ["Small", "Medium", "Large"],
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "95% Poly-Satin Sheen, 5% Elastane",
      fit: "Relaxed Fluid Fit",
      care: "Gentle cold hand wash, cool steam only",
      origin: "Imported - Japan"
    }
  },
  {
    id: "23",
    slug: "golden-sparkle-disco-top",
    name: "Golden Sparkle Disco Top",
    price: 210,
    originalPrice: 260,
    discount: "-19%",
    rating: 5.0,
    reviewCount: 160,
    description: "Radiant golden glow shirt with all-over micro-shimmer weave. Features smoked pearl buttons and an open revere collar.",
    category: "Shirts",
    style: "Party",
    image: "/images/party_3.png",
    galleryImages: ["/images/party_3.png", "/images/party_8.png", "/images/party_2.png"],
    colors: [
      { name: "gold-shimmer", bgColor: "bg-[#f59e0b]", hex: "#f59e0b" },
      { name: "champagne", bgColor: "bg-[#fde68a]", hex: "#fde68a" },
      { name: "bronze", bgColor: "bg-[#b45309]", hex: "#b45309" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "80% Rayon, 20% Gold Foil Knit",
      fit: "Comfortable Party Fit",
      care: "Dry clean recommended",
      origin: "Imported - France"
    }
  },
  {
    id: "24",
    slug: "ruby-red-velvet-lounge-shirt",
    name: "Ruby Red Velvet Lounge Shirt",
    price: 225,
    rating: 4.7,
    reviewCount: 118,
    description: "Plush crushed velvet in dramatic ruby red. Silky inner lining keeps skin cool while the outer texture delivers unmistakable luxury.",
    category: "Shirts",
    style: "Party",
    image: "/images/party_4.png",
    galleryImages: ["/images/party_4.png", "/images/party_5.png", "/images/party_8.png"],
    colors: [
      { name: "ruby", bgColor: "bg-[#dc2626]", hex: "#dc2626" },
      { name: "crimson", bgColor: "bg-[#991b1b]", hex: "#991b1b" },
      { name: "wine", bgColor: "bg-[#881337]", hex: "#881337" }
    ],
    sizes: ["Medium", "Large", "X-Large"],
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "92% Silk-Velvet, 8% Modal",
      fit: "Relaxed Lounge Fit",
      care: "Specialist dry clean only",
      origin: "Crafted in Italy"
    }
  },
  {
    id: "25",
    slug: "amethyst-hologram-party-shirt",
    name: "Amethyst Hologram Party Shirt",
    price: 190,
    originalPrice: 230,
    discount: "-17%",
    rating: 4.8,
    reviewCount: 84,
    description: "Deep purple amethyst shirt with optical two-tone shifts. Shimmers between magenta and deep violet under dynamic dance floor illumination.",
    category: "Shirts",
    style: "Party",
    image: "/images/party_5.png",
    galleryImages: ["/images/party_5.png", "/images/party_1.png", "/images/party_4.png"],
    colors: [
      { name: "amethyst", bgColor: "bg-[#7c3aed]", hex: "#7c3aed" },
      { name: "violet", bgColor: "bg-[#a855f7]", hex: "#a855f7" },
      { name: "noir", bgColor: "bg-[#09090b]", hex: "#09090b" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    reviews: defaultReviews,
    details: {
      material: "90% Viscose Rayon, 10% Lurex Microfiber",
      fit: "Tailored Party Cut",
      care: "Hand wash cold, air dry flat",
      origin: "Imported - South Korea"
    }
  },
  {
    id: "26",
    slug: "champagne-glow-cocktail-shirt",
    name: "Champagne Glow Cocktail Shirt",
    price: 175,
    rating: 4.6,
    reviewCount: 92,
    description: "Subtle pearlescent champagne finish on featherlight modal twill. Designed for warm summer sunset soirées and celebratory toasts.",
    category: "Shirts",
    style: "Party",
    image: "/images/party_6.png",
    galleryImages: ["/images/party_6.png", "/images/party_3.png", "/images/party_8.png"],
    colors: [
      { name: "champagne", bgColor: "bg-[#fef08a]", hex: "#fef08a" },
      { name: "ivory", bgColor: "bg-[#fdf4ff]", hex: "#fdf4ff" },
      { name: "blush", bgColor: "bg-[#fecdd3]", hex: "#fecdd3" }
    ],
    sizes: ["Small", "Medium", "Large"],
    reviews: defaultReviews,
    details: {
      material: "100% Micro-Modal with Pearl Finish",
      fit: "Relaxed Drape Fit",
      care: "Hand wash cold, hang dry",
      origin: "Imported - Spain"
    }
  },
  {
    id: "27",
    slug: "electric-cyan-rave-shirt",
    name: "Electric Cyan Rave Shirt",
    price: 165,
    originalPrice: 200,
    discount: "-18%",
    rating: 4.9,
    reviewCount: 147,
    description: "Hyper-saturated cyan party button-up that reacts dynamically under UV blacklights. Moisture-wicking inner face keeps you cool through late hours.",
    category: "Shirts",
    style: "Party",
    image: "/images/party_7.png",
    galleryImages: ["/images/party_7.png", "/images/party_1.png", "/images/party_9.png"],
    colors: [
      { name: "electric-cyan", bgColor: "bg-[#06b6d4]", hex: "#06b6d4" },
      { name: "neon-teal", bgColor: "bg-[#14b8a6]", hex: "#14b8a6" },
      { name: "deep-ocean", bgColor: "bg-[#0369a1]", hex: "#0369a1" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "92% High-Luster Micro-Polyester, 8% Spandex",
      fit: "Modern Athletic Party Cut",
      care: "Machine wash cold inside-out, tumble dry low",
      origin: "Imported - Taiwan"
    }
  },
  {
    id: "28",
    slug: "rose-gold-stellar-evening-shirt",
    name: "Rose Gold Stellar Evening Shirt",
    price: 205,
    rating: 4.8,
    reviewCount: 104,
    description: "Enchanting rose-gold tones embedded with micro-crystal yarn. Offers unmatched shine for red carpet walks, anniversaries, and high-energy nightlife.",
    category: "Shirts",
    style: "Party",
    image: "/images/party_8.png",
    galleryImages: ["/images/party_8.png", "/images/party_3.png", "/images/party_4.png"],
    colors: [
      { name: "rose-gold", bgColor: "bg-[#fb7185]", hex: "#fb7185" },
      { name: "blush-copper", bgColor: "bg-[#f43f5e]", hex: "#f43f5e" },
      { name: "platinum", bgColor: "bg-[#e2e8f0]", hex: "#e2e8f0" }
    ],
    sizes: ["Small", "Medium", "Large"],
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "88% Silk Georgette, 12% Copper Filaments",
      fit: "Tailored Evening Fit",
      care: "Professional dry clean only",
      origin: "Crafted in Paris, France"
    }
  },
  {
    id: "29",
    slug: "bronze-velour-festival-top",
    name: "Bronze Velour Festival Top",
    price: 185,
    originalPrice: 220,
    discount: "-16%",
    rating: 4.7,
    reviewCount: 89,
    description: "Sun-drenched bronze velour shirt tailored with contrast piping and retro lapels. Soft, tactile touch combined with high visual warmth.",
    category: "Shirts",
    style: "Party",
    image: "/images/party_9.png",
    galleryImages: ["/images/party_9.png", "/images/party_3.png", "/images/party_6.png"],
    colors: [
      { name: "warm-bronze", bgColor: "bg-[#92400e]", hex: "#92400e" },
      { name: "caramel", bgColor: "bg-[#b45309]", hex: "#b45309" },
      { name: "espresso", bgColor: "bg-[#451a03]", hex: "#451a03" }
    ],
    sizes: ["Medium", "Large", "X-Large"],
    isOnSale: true,
    reviews: defaultReviews,
    details: {
      material: "85% Cotton Velour, 15% Modal",
      fit: "Relaxed Boxy Fit",
      care: "Dry clean or cold delicate hand wash",
      origin: "Imported - Morocco"
    }
  },
  {
    id: "30",
    slug: "neon-night-statement-tee",
    name: "Neon Night Statement Tee",
    price: 110,
    rating: 4.5,
    reviewCount: 76,
    description: "Graphic party tee printed with glow-in-the-dark silkscreen graphics. Heavyweight ring-spun cotton delivers effortless street-party appeal.",
    category: "T-shirts",
    style: "Party",
    image: "/images/shirt9.png",
    galleryImages: ["/images/shirt9.png", "/images/shirt5.png", "/images/party_7.png"],
    colors: [
      { name: "pitch-black", bgColor: "bg-[#09090b]", hex: "#09090b" },
      { name: "cyber-purple", bgColor: "bg-[#581c87]", hex: "#581c87" },
      { name: "neon-cyan", bgColor: "bg-[#06b6d4]", hex: "#06b6d4" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "100% Organic Heavyweight Jersey (260 GSM)",
      fit: "Oversized Streetwear Fit",
      care: "Machine wash cold inside-out, tumble dry low",
      origin: "Imported - Portugal"
    }
  },

  // ==========================================
  // GYM (10 PRODUCTS)
  // ==========================================
  {
    id: "31",
    slug: "aero-blue-performance-tee",
    name: "Aero Blue Performance Tee",
    price: 75,
    originalPrice: 95,
    discount: "-21%",
    rating: 4.9,
    reviewCount: 210,
    description: "High-intensity athletic training tee constructed from AeroMesh moisture-evacuation fabric. Anti-chafe flatlock seams prevent abrasion across long sessions.",
    category: "T-shirts",
    style: "Gym",
    image: "/images/gym_1.png",
    galleryImages: ["/images/gym_1.png", "/images/gym_4.png", "/images/gym_7.png"],
    colors: [
      { name: "ocean-blue", bgColor: "bg-[#0284c7]", hex: "#0284c7" },
      { name: "navy", bgColor: "bg-[#1e3a8a]", hex: "#1e3a8a" },
      { name: "stealth-black", bgColor: "bg-[#09090b]", hex: "#09090b" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "88% Recycled Poly-Dry, 12% Spandex 4-Way Stretch",
      fit: "Athletic Tapered Fit",
      care: "Machine wash cold gentle, no fabric softener, air dry",
      origin: "Imported - Vietnam"
    }
  },
  {
    id: "32",
    slug: "neon-volt-speed-compression-top",
    name: "Neon Volt Speed Compression Top",
    price: 85,
    rating: 4.8,
    reviewCount: 165,
    description: "Engineered graduated compression top engineered to accelerate muscle blood flow, reduce oscillation fatigue, and keep athletes visible during outdoor twilight runs.",
    category: "T-shirts",
    style: "Gym",
    image: "/images/gym_2.png",
    galleryImages: ["/images/gym_2.png", "/images/gym_6.png", "/images/gym_1.png"],
    colors: [
      { name: "volt-lime", bgColor: "bg-[#84cc16]", hex: "#84cc16" },
      { name: "optic-yellow", bgColor: "bg-[#eab308]", hex: "#eab308" },
      { name: "graphite", bgColor: "bg-[#334155]", hex: "#334155" }
    ],
    sizes: ["Small", "Medium", "Large"],
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "82% Nylon, 18% High-Tension Elastane",
      fit: "Targeted Compression Fit",
      care: "Machine wash cold, lay flat to dry",
      origin: "Imported - Germany"
    }
  },
  {
    id: "33",
    slug: "crimson-power-lifting-tee",
    name: "Crimson Power Lifting Tee",
    price: 78,
    originalPrice: 98,
    discount: "-20%",
    rating: 4.7,
    reviewCount: 132,
    description: "Reinforced shoulder panels and anti-slip silicone upper-back grip for heavy barbell squats and bench press stability. Durable tear-resistant poly-cotton blend.",
    category: "T-shirts",
    style: "Gym",
    image: "/images/gym_3.png",
    galleryImages: ["/images/gym_3.png", "/images/gym_6.png", "/images/gym_9.png"],
    colors: [
      { name: "crimson-red", bgColor: "bg-[#b91c1c]", hex: "#b91c1c" },
      { name: "black-iron", bgColor: "bg-[#18181b]", hex: "#18181b" },
      { name: "charcoal", bgColor: "bg-[#374151]", hex: "#374151" }
    ],
    sizes: ["Medium", "Large", "X-Large"],
    isOnSale: true,
    reviews: defaultReviews,
    details: {
      material: "60% Combed Cotton, 40% High-Tenacity Polyester",
      fit: "Drop-Shoulder Lifter Cut",
      care: "Machine wash cold, tumble dry low heat",
      origin: "Imported - USA"
    }
  },
  {
    id: "34",
    slug: "cobalt-hybird-workout-shirt",
    name: "Cobalt Hybrid Workout Shirt",
    price: 82,
    rating: 4.9,
    reviewCount: 180,
    description: "Versatile gym-to-street hybrid top. Micro-perforated back panel enables maximal airflow during CrossFit and HIIT circuits while looking crisp enough for casual wear.",
    category: "T-shirts",
    style: "Gym",
    image: "/images/gym_4.png",
    galleryImages: ["/images/gym_4.png", "/images/gym_1.png", "/images/gym_7.png"],
    colors: [
      { name: "cobalt-blue", bgColor: "bg-[#1d4ed8]", hex: "#1d4ed8" },
      { name: "slate-grey", bgColor: "bg-[#64748b]", hex: "#64748b" },
      { name: "pure-black", bgColor: "bg-[#09090b]", hex: "#09090b" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "90% Recycled Polyester, 10% Lycra",
      fit: "Athletic Regular Fit",
      care: "Machine wash cold, hang dry quick",
      origin: "Imported - Vietnam"
    }
  },
  {
    id: "35",
    slug: "ultraviolet-endurance-runner-tee",
    name: "Ultraviolet Endurance Runner Tee",
    price: 90,
    originalPrice: 110,
    discount: "-18%",
    rating: 4.8,
    reviewCount: 115,
    description: "Ultralight 98-gram running shirt with UPF 50+ sun shielding and silver-ion antibacterial odor protection that stays fresh across marathons.",
    category: "T-shirts",
    style: "Gym",
    image: "/images/gym_5.png",
    galleryImages: ["/images/gym_5.png", "/images/gym_9.png", "/images/gym_2.png"],
    colors: [
      { name: "ultraviolet", bgColor: "bg-[#9333ea]", hex: "#9333ea" },
      { name: "deep-purple", bgColor: "bg-[#581c87]", hex: "#581c87" },
      { name: "shadow-grey", bgColor: "bg-[#4b5563]", hex: "#4b5563" }
    ],
    sizes: ["Small", "Medium", "Large"],
    isOnSale: true,
    reviews: defaultReviews,
    details: {
      material: "100% Featherlight Hydrophobic Poly-Grid with Silver Ion",
      fit: "Streamlined Ergonomic Fit",
      care: "Machine wash cold, line dry",
      origin: "Imported - Japan"
    }
  },
  {
    id: "36",
    slug: "solar-orange-training-top",
    name: "Solar Orange Training Top",
    price: 70,
    rating: 4.6,
    reviewCount: 88,
    description: "Energetic bright solar orange athletic shirt. Soft-brushed peach microfiber delivers zero nipple chafing on long cardio sessions and outdoor bootcamps.",
    category: "T-shirts",
    style: "Gym",
    image: "/images/gym_6.png",
    galleryImages: ["/images/gym_6.png", "/images/gym_3.png", "/images/gym_2.png"],
    colors: [
      { name: "solar-orange", bgColor: "bg-[#ea580c]", hex: "#ea580c" },
      { name: "amber", bgColor: "bg-[#f59e0b]", hex: "#f59e0b" },
      { name: "anthracite", bgColor: "bg-[#1f2937]", hex: "#1f2937" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "91% Polyester Microfiber, 9% Spandex",
      fit: "Active Fit with Underarm Gussets",
      care: "Machine wash cold, tumble dry low",
      origin: "Imported - Thailand"
    }
  },
  {
    id: "37",
    slug: "arctic-ice-cooling-gym-shirt",
    name: "Arctic Ice Cooling Gym Shirt",
    price: 88,
    originalPrice: 105,
    discount: "-16%",
    rating: 4.9,
    reviewCount: 154,
    description: "Infused with jade mineral cooling technology that actively lowers skin surface temperatures by up to 3 degrees Fahrenheit during intense sauna-like workouts.",
    category: "T-shirts",
    style: "Gym",
    image: "/images/gym_7.png",
    galleryImages: ["/images/gym_7.png", "/images/gym_1.png", "/images/gym_4.png"],
    colors: [
      { name: "ice-blue", bgColor: "bg-[#38bdf8]", hex: "#38bdf8" },
      { name: "arctic-white", bgColor: "bg-[#f0f9ff]", hex: "#f0f9ff" },
      { name: "steel", bgColor: "bg-[#64748b]", hex: "#64748b" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "86% Jade-Infused Polyamide, 14% Spandex",
      fit: "Second-Skin Active Fit",
      care: "Machine wash cold, do not iron, line dry",
      origin: "Imported - South Korea"
    }
  },
  {
    id: "38",
    slug: "stealth-tactical-dry-fit-tee",
    name: "Stealth Tactical Dry-Fit Tee",
    price: 80,
    rating: 4.7,
    reviewCount: 124,
    description: "Rugged military-olive dry-fit tee with ripstop sleeve overlays and integrated earbud loop. Engineered to endure mud runs and kettlebell complexes.",
    category: "T-shirts",
    style: "Gym",
    image: "/images/gym_8.png",
    galleryImages: ["/images/gym_8.png", "/images/gym_1.png", "/images/gym_6.png"],
    colors: [
      { name: "tactical-olive", bgColor: "bg-[#3f6212]", hex: "#3f6212" },
      { name: "coyote-brown", bgColor: "bg-[#78350f]", hex: "#78350f" },
      { name: "matte-black", bgColor: "bg-[#18181b]", hex: "#18181b" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    reviews: defaultReviews,
    details: {
      material: "85% Moisture-Control Poly, 15% Cordura Nylon",
      fit: "Tapered V-Shape Fit",
      care: "Machine wash cold, tumble dry low",
      origin: "Imported - USA"
    }
  },
  {
    id: "39",
    slug: "magenta-flex-agility-top",
    name: "Magenta Flex Agility Top",
    price: 84,
    originalPrice: 100,
    discount: "-16%",
    rating: 4.8,
    reviewCount: 95,
    description: "Vivid bold magenta athletic shirt featuring high-elasticity 360-degree flex zones around shoulder blades for unrestricted mobility during gymnastics and mobility drills.",
    category: "T-shirts",
    style: "Gym",
    image: "/images/gym_9.png",
    galleryImages: ["/images/gym_9.png", "/images/gym_5.png", "/images/gym_3.png"],
    colors: [
      { name: "vivid-magenta", bgColor: "bg-[#db2777]", hex: "#db2777" },
      { name: "berry", bgColor: "bg-[#9d174d]", hex: "#9d174d" },
      { name: "dark-plum", bgColor: "bg-[#4a044e]", hex: "#4a044e" }
    ],
    sizes: ["Small", "Medium", "Large"],
    isOnSale: true,
    isNewArrival: true,
    reviews: defaultReviews,
    details: {
      material: "87% Polyamide Microfiber, 13% Elastane",
      fit: "Agility Ergonomic Fit",
      care: "Machine wash cold gentle, air dry recommended",
      origin: "Imported - Portugal"
    }
  },
  {
    id: "40",
    slug: "pro-glide-athletic-training-joggers",
    name: "Pro Glide Athletic Training Joggers",
    price: 135,
    originalPrice: 165,
    discount: "-18%",
    rating: 4.9,
    reviewCount: 198,
    description: "High-mobility tapered training joggers built with water-repellent stretch fabric, zippered phone pockets, and ribbed ankle cuffs that stay locked in place during sprints.",
    category: "Jeans",
    style: "Gym",
    image: "/images/pent2.png",
    galleryImages: ["/images/pent2.png", "/images/pent1.png", "/images/gym_1.png"],
    colors: [
      { name: "carbon-black", bgColor: "bg-[#18181b]", hex: "#18181b" },
      { name: "dark-grey", bgColor: "bg-[#374151]", hex: "#374151" },
      { name: "deep-navy", bgColor: "bg-[#1e3a8a]", hex: "#1e3a8a" }
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    isOnSale: true,
    isTopSelling: true,
    reviews: defaultReviews,
    details: {
      material: "88% Recycled Nylon, 12% Spandex DWR Treated",
      fit: "Tapered Performance Jogger Fit",
      care: "Machine wash cold inside-out, tumble dry low",
      origin: "Imported - Vietnam"
    }
  }
];

// Helper functions for easy querying
export function getProductById(id: string): Product | undefined {
  const cleanId = id.replace(/^Product/i, "").trim();
  return products.find((p) => p.id === cleanId || p.id === id || p.slug === id);
}

export function getOnSaleProducts(): Product[] {
  return products.filter((p) => p.isOnSale);
}

export function getNewArrivalProducts(): Product[] {
  return products.filter((p) => p.isNewArrival);
}

export function getTopSellingProducts(): Product[] {
  return products.filter((p) => p.isTopSelling);
}

export function getRelatedProducts(currentId: string, limit = 4): Product[] {
  const current = getProductById(currentId);
  const others = products.filter((p) => p.id !== current?.id);
  if (!current) return others.slice(0, limit);

  // Match by category or style first
  const sameCategory = others.filter(
    (p) => p.category === current.category || p.style === current.style
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  return [...sameCategory, ...others.filter((p) => !sameCategory.includes(p))].slice(
    0,
    limit
  );
}
