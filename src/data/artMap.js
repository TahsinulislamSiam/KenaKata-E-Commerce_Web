// Maps every mock product to its illustration key (see ./illustrations.js).
export const PRODUCT_ART = {
  // Electronics
  'el-1001': 'phone',
  'el-1002': 'laptop',
  'el-1003': 'headphones',
  'el-1004': 'phone',
  'el-1005': 'camera',
  'el-1006': 'powerbank',
  'el-1007': 'mouse',
  'el-1008': 'monitor',
  // Fashion
  'fa-2001': 'shirt',
  'fa-2002': 'kurti',
  'fa-2003': 'jacket',
  'fa-2004': 'saree',
  'fa-2005': 'sneaker',
  'fa-2006': 'watch',
  'fa-2007': 'cargo',
  'fa-2008': 'bag',
  // Home & Kitchen
  'hm-3001': 'sofa',
  'hm-3002': 'cookware',
  'hm-3003': 'mattress',
  'hm-3004': 'kettle',
  'hm-3005': 'lamp',
  'hm-3006': 'bedsheet',
  'hm-3007': 'airfryer',
  // Books
  'bk-4001': 'book',
  'bk-4002': 'bookstack',
  'bk-4003': 'book',
  'bk-4004': 'book',
  'bk-4005': 'bookstack',
  'bk-4006': 'book',
  'bk-4007': 'book',
  // Beauty & Health
  'bt-5001': 'serum',
  'bt-5002': 'lipstick',
  'bt-5003': 'oil',
  'bt-5004': 'sunscreen',
  'bt-5005': 'perfume',
  'bt-5006': 'toothbrush',
  'bt-5007': 'hairdryer',
  // Sports & Outdoors
  'sp-6001': 'cricketbat',
  'sp-6002': 'dumbbell',
  'sp-6003': 'football',
  'sp-6004': 'yogamat',
  'sp-6005': 'bicycle',
  'sp-6006': 'sneaker',
  'sp-6007': 'badminton',
};

/** Fallback illustration per category. */
export const CATEGORY_ART = {
  electronics: 'phone',
  fashion: 'shirt',
  home: 'sofa',
  books: 'book',
  beauty: 'perfume',
  sports: 'dumbbell',
};

/** Illustration chips shown on each hero slide. */
export const HERO_ART = {
  electronics: ['phone', 'headphones', 'laptop'],
  fashion: ['kurti', 'sneaker', 'bag'],
  home: ['sofa', 'airfryer', 'lamp'],
  delivery: ['book', 'perfume', 'football'],
};
