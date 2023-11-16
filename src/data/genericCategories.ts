const genericCategories: { [category: string]: string[] } = {
  Groceries: [
    "liquor",
    "GROCER",
    "ORGANIC",
    "SUPERMARKET",
    "SPICES",
    "NUTS",
    "FRUIT",
  ],
  Housing: [
    "rent",
    "mortgage",
    "lease",
    "property tax",
    "arrears",
    "property",
    "rates",
    "bond",
  ],
  Utilities: [
    "electricity",
    "energy",
    "water",
    "gas",
    "utility bill",
    "power",
    "sewerage",
    "waste disposal",
    "broadband",

    "communicate",
    "communication",
    "mobile",
    "telco",
    "telephone",
    "internet",
    "cable tv",
    "wifi",
    "broadband",
    "data plan",
    "roaming",
    "post",
    "Laundry",
  ],
  Dining: [
    "lunch",
    "coffee",
    "restaurant",
    "cafe",
    "dining",
    "takeout",
    "fast food",
    "pizza",
    "eatery",
    "bakery",
    "bar",
    "pub",
    "diner",
    "sushi",
    "buffet",
    "cuisine",
    "deli",
    "food court",
    "grill",
    "tavern",
    "bistro",
    "brasserie",
    "steakhouse",
    "pizzeria",
    "seafood",
    "tapas",
    "food truck",
    "gastropub",
    "brewery",
    "catering",
    "drive-thru",
    "hamburger",
    "breakfast",
    "brunch",
    "supper",
    "snack",
    "teahouse",
    "ice cream",
    "wine",
    "cocktail",
    "espresso",
    "food market",
    "culinary",
    "beverage",
    "reservation",
    "menu",
    "appetizer",
    "entree",
    "dessert",
  ],
  Entertainment: [
    "movie",
    "theatre",
    "concert",
    "streaming",
    "netflix",
    "spotify",
    "music",
    "game",
    "museum",
    "zoo",
    "amusement park",
    "club",
  ],
  Health: [
    "gym",
    "doctor",
    "hospital",
    "pharmacy",
    "PHARMAC",
    "pharm",
    "chemist",
    "medicine",
    "healthcare",
    "health",
    "hlth", // health abbreviated
    "healing",
    "meditation",
    "medical",
    "dentist",
    "dental",
    "optometrist",
    "tooth",
    "physiotherapy",
    "physio",
    "chiropractor",
    "chiro",
    "gym membership",
    "yoga",
    "pilates",
    "personal trainer",
    "fitness",
    "workout",
    "health club",
    "salon",
    "spa",
    "massage",
    "beauty",
    "haircut",
    "hair",
    "nail",
    "foot",
    "eye",
    "throat",
    "ear",
    "skin",
    "dermatology",
    "PREGNANCY",
    "imaging",
    "Family MC",
  ],
  Insurance: [
    "insurance",
    "premium",
    "coverage",
    "claim",
    "health insurance",
    "car insurance",
    "home insurance",
    "life insurance",
  ],
  Investments: [
    "investment",
    "stocks",
    "bonds",
    "mutual fund",
    "portfolio",
    "dividend",
    "401k",
    "retirement",
    "share",

    "cryptocurrency",
    "crypto",
    "trade",
    "trading",
    "bach",
  ],
  "Hobbies & Sport": [
    "sport",
    "hobby",
    "tennis",
    "BICYCLE",
    "australian rules football (afl)",
    "cricket",
    "rugby league",
    "rugby union",
    "soccer",
    "netball",
    "basketball",
    "golf",
    "swimming",
    "surfing",
    "surfboard",
    "skateboard",
    "athletics",
    "horse racing",
    "cycling",
    "sailing",
    "hockey",
    "craft supplies",
    "music",
    "guitar",
    "art supplies",
    "magazines",
    "board games",
    "camping gear",
    "gardening",
    "fishing",
    "cooking",
    "photography",
    "knitting",
    "painting",
    "drawing",
    "hiking",
    "running",
    "chess",
    "video gaming",
    "dancing",
    "yoga",
    "writing",
    "camping",
    "skiing",
    "birdwatching",
    "music listening",
    "music playing",
    "martial arts",
    "karate",
    "diy",
    "pottery",
    "sculpting",
    "archery",
    "bike",
    "SKI",
    "skiing",
  ],
  Transport: [
    "fuel",
    "toll",
    "etoll",
    "petrol",
    "diesel",
    "bus",
    "train",
    "taxi",
    "cab",
    "uber",
    "lyft",
    "fare",
    "subway",
    "metro",
    "paystay",
  ],

  Loans: ["loan", "interest", "credit", "repayment", "emi", "installment"],
  Withdrawals: ["atm", "atmx", "cash", "cashcard"],
  Deposits: [
    "deposit",
    "salary",
    "income",
    "paycheck",
    "pension",
    "stipend",
    "aus gov",
  ],
  "Fees & Charges": [
    "fee",
    "charge",
    "penalty",
    "overdraft",
    "service charge",
    "transaction fee",
  ],
  Education: [
    "school",
    "tuition",
    "college",
    "university",
    "books",
    "education",
    "course",
    "seminar",
    "magazine",
    "bookstore",
    "bookshop",
    "reading",
  ],
  Donations: ["donation", "charity", "fundraiser", "non-profit", "ngo"],
  Gifts: ["gift", "present", "birthday", "bday", "anniversary"],
  Savings: ["savings"],
  Pets: [
    "vet",
    "pet",
    "veterinary",
    "pet supplies",
    "dog",
    "cat",
    "fish",
    "bird",
    "hamster",
    "guinea pig",
    "rabbit",
    "turtle",
    "snake",
    "lizard",
    "ferret",
    "mouse",
    "rat",
    "gerbil",
    "horse",
    "frog",
    "hermit crab",
    "tarantula",
    "chinchilla",
    "hedgehog",
    "salamander",
    "iguana",
    "parrot",
    "chicken",
    "pig",
    "goat",
  ],
  Automotive: [
    "automotive",
    "car",
    "car repair",
    "oil change",
    "tire replacement",
    "auto parts",
    "brake service",
    "transmission service",
    "car wash",
    "automotive service",
    "vehicle inspection",
    "coolant",
    "car battery",
    "muffler",
    "windshield repair",
    "auto glass",
    "car accessories",
    "radiator",
    "fuel filter",
    "spark plug",
    "alternator",
    "transmission fluid",
    "wiper blade",
    "brake pad",
    "brake fluid",
    "steering fluid",
    "engine tune-up",
    "auto detailing",
    "car polish",
    "rotor",
    "air filter",
    "serpentine belt",
    "shock absorber",
    "suspension",
    "wheel alignment",
    "vehicle service",
    "garage",
    "mechanic",
    "auto shop",
    "car service",
    "fuel injector",
  ],
  Childcare: [
    "daycare",
    "babysitting",
    "nanny",
    "preschool",
    "after-school care",
    "summer camp",
    "childrens activities",
    "child support",
    "tutoring",
    "playgroup",
    "childminding",
    "au pair",
    "sleepaway camp",
    "nursery",
    "montessori",
    "kindergarten",
    "enrichment classes",
    "special needs care",
  ],
  Business: ["work", "business", "office supplies", "advertising", "marketing"],
  Shopping: [
    "shop",
    "shopping",
    "mall",
    "online",
    "retail",
    "amazon",
    "ebay",
    "apparel",
    "clothing",
    "electronics",
    "toy store",
    "jewelry",
    "footwear",
    "baby",
    "kids",

    "handbag",
    "shoes",
    "shirt",
    "pants",
    "watch",
    "hat",
    "gloves",
    "dress",
    "bra",
    "coat",
    "jumper",
    "jeans",
    "socks",
    "skirt",
    "sweater",
    "scarf",
    "tie",
    "sunglasses",
    "jewelry",
    "blouse",
    "swimsuit",
    "shorts",
    "umbrella",
    "wallet",
    "belt",
    "lingerie",
    "t-shirt",
    "sandals",
    "sneakers",
    "boots",
    "slippers",
    "jacket",
    "blazer",
    "hoodie",
    "vest",
    "pajamas",
    "robe",
    "overalls",
  ],
  Travel: [
    "travel",
    "flight",
    "airline",
    "hotel",
    "accommodation",
    "tour",
    "trip",
    "vacation",
    "car rental",
    "cruise",
    "excursion",
    "tourism",
  ],
  "Home & Garden": [
    "home improvement",
    "garden",
    "furniture",
    "appliance",
    "tool",
    "diy",
    "plant",
    "flower",
    "nursery",
    "landscaping",
    "paint",
    "flooring",
    "deck",
    "verandah",
    "roof",
    "kitchen",
    "bathroom",
    "plumber",
    "electrician",
  ],
};

export default genericCategories;
