/**
 * By Your Budget - Application Logic
 * Mobile-first web app to find and buy things strictly within your budget.
 * Features isolated database per user, guest exploration, critical-action gated auth,
 * and AI Assistant [Get Some Help] on Screen 2.
 */

// ==========================================
// 1. SAMPLE PRODUCT DATA (Public Catalog with Reviews)
// ==========================================
const SAMPLE_PRODUCTS = [
  // Budget $5 - $15
  {
    id: 'p1',
    name: 'Minimalist Pocket Journal',
    category: 'lifestyle',
    price: 5.00,
    icon: '📓',
    shortDesc: 'Pocket-sized dotted notebook with thick 120gsm paper.',
    longDesc: 'Stay mindful and organized anywhere. This premium pocket journal features acid-free cream paper, an elastic closure band, and a durable softcover that fits comfortably in your pocket.',
    highlights: ['120 GSM Paper', 'Pocket Size', 'Lay-Flat Binding'],
    rating: 4.9,
    reviews: [
      { user: 'Sarah M.', rating: 5, comment: 'Incredible paper quality. Zero ink bleed-through even with my wet fountain pens!', date: '3 days ago' },
      { user: 'David K.', rating: 5, comment: 'Sturdy pocket size, easily fits into my denim pocket or jacket.', date: '1 week ago' },
      { user: 'Elena R.', rating: 4.8, comment: 'Stitching and binding hold up really well after weeks of daily notes.', date: '2 weeks ago' }
    ]
  },
  {
    id: 'p2',
    name: 'Artisan Dark Chocolate (75%)',
    category: 'snacks',
    price: 6.50,
    icon: '🍫',
    shortDesc: 'Single-origin handcrafted dark chocolate with sea salt.',
    longDesc: 'Rich, velvety organic dark chocolate crafted in small batches from fairly-traded cocoa beans. Lightly sprinkled with sea salt crystals for the ultimate everyday treat.',
    highlights: ['Organic', 'Fair Trade', 'Vegan Friendly'],
    rating: 4.8,
    reviews: [
      { user: 'Liam T.', rating: 5, comment: 'Rich and not overly sweet. The pinch of sea salt elevates the flavor completely.', date: 'Yesterday' },
      { user: 'Maya P.', rating: 4.5, comment: 'Snap of the chocolate is satisfying. High-quality single-origin bean flavor.', date: '5 days ago' },
      { user: 'Carlos G.', rating: 5, comment: 'Best budget gourmet treat I have ordered. Melts wonderfully.', date: '2 weeks ago' }
    ]
  },
  {
    id: 'p3',
    name: 'Stainless Multi-Tool Key',
    category: 'gadgets',
    price: 7.00,
    icon: '🗝️',
    shortDesc: '8-in-1 pocket keychain tool with bottle opener & screwdriver.',
    longDesc: 'Made of heat-treated 420 stainless steel. Fits seamlessly on your keychain and includes a bottle opener, ruler, screwdriver, wrench, and scoring edge.',
    highlights: ['TSA Compliant', 'Stainless Steel', 'Ultra Lightweight'],
    rating: 4.7,
    reviews: [
      { user: 'Jason B.', rating: 5, comment: 'Solid piece of 420 steel. Bottle opener works effortlessly every time.', date: '4 days ago' },
      { user: 'Amanda W.', rating: 4.5, comment: 'Small enough that I forget it is on my keys until I need a screwdriver.', date: '2 weeks ago' },
      { user: 'Ken O.', rating: 4.7, comment: 'No sharp edges that snag your pocket. Very smart EDC design.', date: '1 month ago' }
    ]
  },
  {
    id: 'p4',
    name: 'Organic Chamomile & Mint Tea',
    category: 'snacks',
    price: 8.50,
    icon: '🍵',
    shortDesc: '20 whole-leaf pyramid tea bags for restful evenings.',
    longDesc: 'A comforting blend of whole chamomile blossoms, crisp spearmint, and fragrant lemon balm. Naturally caffeine-free and soothing after a long day.',
    highlights: ['20 Pyramid Bags', 'Caffeine Free', '100% Herbal'],
    rating: 4.9,
    reviews: [
      { user: 'Rachel H.', rating: 5, comment: 'The aroma when opening the tin is divine. Actual whole flower heads!', date: '2 days ago' },
      { user: 'Marcus L.', rating: 5, comment: 'My nightly routine now. Very soothing mint finish without bitterness.', date: '1 week ago' },
      { user: 'Priya N.', rating: 4.8, comment: 'Pyramid bags let the leaves expand properly. Excellent taste.', date: '3 weeks ago' }
    ]
  },
  {
    id: 'p5',
    name: 'Handcrafted Ceramic Mug',
    category: 'home',
    price: 9.50,
    icon: '☕',
    shortDesc: '350ml speckled green ceramic mug with comfort handle.',
    longDesc: 'Each mug is hand-dipped with an earthy green reactive glaze, making every piece unique. Dishwasher and microwave safe with a spacious grip.',
    highlights: ['Microwave Safe', 'Dishwasher Safe', 'Lead-Free Glaze'],
    rating: 4.9,
    reviews: [
      { user: 'Tom C.', rating: 5, comment: 'Substantial weight and comfortable handle that fits all four fingers.', date: '5 days ago' },
      { user: 'Zoe V.', rating: 5, comment: 'The green reactive glaze looks like something from a specialty pottery studio.', date: '1 week ago' },
      { user: 'Brian K.', rating: 4.7, comment: 'Survived multiple dishwasher cycles without fading or chipping.', date: '3 weeks ago' }
    ]
  },
  {
    id: 'p6',
    name: 'Braided Fast-Charging Cable',
    category: 'gadgets',
    price: 12.00,
    icon: '🔌',
    shortDesc: '6.6ft nylon-braided 60W USB-C cable for quick power.',
    longDesc: 'High-tensile nylon braided exterior tested to survive over 25,000 bends. Supports ultra-fast 60W PD charging for phones, tablets, and lightweight laptops.',
    highlights: ['6.6 ft / 2m Length', '60W Fast Charging', 'Tangle-Free'],
    rating: 4.8,
    reviews: [
      { user: 'Alex F.', rating: 5, comment: 'Charges my laptop and phone at full 60W speed. Cable does not tangle.', date: '1 day ago' },
      { user: 'Chloe D.', rating: 4.6, comment: 'The 6.6ft length reaches comfortably from the wall outlet to the sofa.', date: '2 weeks ago' },
      { user: 'Greg S.', rating: 5, comment: 'Reinforced strain relief collar feels indestructible.', date: '1 month ago' }
    ]
  },
  {
    id: 'p7',
    name: 'French Lavender Soy Candle',
    category: 'home',
    price: 15.00,
    icon: '🕯️',
    shortDesc: 'Hand-poured 100% natural soy candle with wooden wick.',
    longDesc: 'Infused with calming French lavender and soothing amber notes. Features a crackling wooden wick that burns clean and evenly for up to 45 hours.',
    highlights: ['45-Hour Burn', 'Wooden Wick', 'Non-Toxic Soy'],
    rating: 4.7,
    reviews: [
      { user: 'Emily S.', rating: 5, comment: 'The wooden wick crackles like a miniature fireplace. Very relaxing scent.', date: '3 days ago' },
      { user: 'Noah J.', rating: 4.5, comment: 'Pure soy wax burns flat with zero tunneling when trimmed.', date: '1 week ago' },
      { user: 'Hannah B.', rating: 4.8, comment: 'Natural lavender, not synthetic or overwhelming. Highly recommend.', date: '3 weeks ago' }
    ]
  },

  // Budget $16 - $35
  {
    id: 'p8',
    name: 'Silent Wireless Mouse',
    category: 'gadgets',
    price: 18.00,
    icon: '🖱️',
    shortDesc: 'Quiet-click ergonomic optical mouse with 2.4G & Bluetooth.',
    longDesc: 'Work anywhere without disturbing others. 90% noise reduction on clicks, dual connectivity (Bluetooth + USB dongle), and auto power-saving sleep mode.',
    highlights: ['90% Quiet Clicks', 'Dual Bluetooth + 2.4G', '18-Mo Battery'],
    rating: 4.8,
    reviews: [
      { user: 'Daniel M.', rating: 5, comment: 'Truly silent clicks. Perfect for working late in shared rooms or coffee shops.', date: '4 days ago' },
      { user: 'Sophia R.', rating: 4.7, comment: 'Switches between my MacBook and Windows PC instantly with Bluetooth.', date: '2 weeks ago' },
      { user: 'Oliver T.', rating: 4.9, comment: 'Ergonomic shape prevents wrist strain even after 8 hours of work.', date: '1 month ago' }
    ]
  },
  {
    id: 'p9',
    name: 'Cozy Knit Merino Beanie',
    category: 'lifestyle',
    price: 20.00,
    icon: '🧢',
    shortDesc: 'Warm breathable ribbed winter beanie hat.',
    longDesc: 'Crafted from ultra-soft Merino wool blend for lightweight warmth without itchiness. Stretchy ribbed knit fits snugly on any head size.',
    highlights: ['Merino Wool Blend', 'Itch-Free Comfort', 'Unisex Fit'],
    rating: 4.9,
    reviews: [
      { user: 'Grace L.', rating: 5, comment: 'No itchiness at all! Genuine soft merino blend that keeps wind out.', date: '2 days ago' },
      { user: 'Lucas E.', rating: 5, comment: 'Maintains its elasticity and does not stretch out after heavy wear.', date: '1 week ago' },
      { user: 'Mia W.', rating: 4.8, comment: 'Looks sleek and minimal. Warm without making my scalp sweat.', date: '3 weeks ago' }
    ]
  },
  {
    id: 'p10',
    name: 'Double-Wall Water Bottle',
    category: 'lifestyle',
    price: 22.00,
    icon: '🍶',
    shortDesc: '750ml vacuum insulated stainless bottle. 24h cold.',
    longDesc: 'Keep your drinks ice-cold for 24 hours or piping hot for 12 hours. Sweat-proof powder-coated finish with leak-proof carry loop cap.',
    highlights: ['24h Cold / 12h Hot', 'BPA Free', 'Leak-Proof Cap'],
    rating: 4.9,
    reviews: [
      { user: 'Ben H.', rating: 5, comment: 'Left in a hot car all afternoon and ice cubes were still floating inside!', date: '3 days ago' },
      { user: 'Isabella C.', rating: 4.9, comment: 'The powder coat prevents slips and never condenses or sweats.', date: '1 week ago' },
      { user: 'Henry D.', rating: 4.8, comment: 'Cap is 100% leakproof inside my backpack. Great 750ml capacity.', date: '2 weeks ago' }
    ]
  },
  {
    id: 'p11',
    name: 'Bamboo Desktop Organizer',
    category: 'home',
    price: 24.00,
    icon: '🗄️',
    shortDesc: 'Eco-friendly natural bamboo caddy with phone stand & drawer.',
    longDesc: 'Declutter your workspace in style. Features compartments for pens, notepads, cables, and glasses, plus an integrated angled mobile dock.',
    highlights: ['100% Solid Bamboo', 'Non-Slip Feet', 'Compact Footprint'],
    rating: 4.7,
    reviews: [
      { user: 'Kevin W.', rating: 5, comment: 'Solid bamboo with smooth rounded edges. The phone dock is very handy.', date: '5 days ago' },
      { user: 'Laura P.', rating: 4.6, comment: 'Drawer slides smoothly and holds USB sticks, paperclips, and keys.', date: '2 weeks ago' },
      { user: 'Sam J.', rating: 4.8, comment: 'Transformed my cluttered desk into a clean workspace instantly.', date: '1 month ago' }
    ]
  },
  {
    id: 'p12',
    name: 'Gourmet Coffee Bean Trio',
    category: 'snacks',
    price: 26.00,
    icon: '🫘',
    shortDesc: 'Three 200g bags of artisan whole bean medium roast.',
    longDesc: 'Taste specialty roasts from Ethiopia, Colombia, and Guatemala. Roasted fresh weekly with tasting notes of citrus, dark caramel, and roasted almond.',
    highlights: ['Specialty Grade', 'Whole Bean', 'Ethically Sourced'],
    rating: 4.9,
    reviews: [
      { user: 'Tyler M.', rating: 5, comment: 'The Ethiopian roast has wonderful floral notes. Fresh degassing valves on bags.', date: 'Yesterday' },
      { user: 'Jessica K.', rating: 5, comment: 'Outstanding variety. Colombia roast makes the smoothest morning espresso.', date: '6 days ago' },
      { user: 'Arthur G.', rating: 4.8, comment: 'Rare to find three distinct specialty origins at this price point.', date: '2 weeks ago' }
    ]
  },
  {
    id: 'p13',
    name: 'Glass Pour-Over Coffee Maker',
    category: 'home',
    price: 32.00,
    icon: '🫖',
    shortDesc: '800ml heat-resistant borosilicate carboy with reusable filter.',
    longDesc: 'Brew rich, sediment-free coffee without disposable paper filters. Includes high-grade stainless steel micro-mesh filter and wooden heat sleeve.',
    highlights: ['Stainless Steel Filter', 'Heat-Resistant Glass', '800ml Capacity'],
    rating: 4.8,
    reviews: [
      { user: 'Ethan B.', rating: 5, comment: 'The stainless mesh filter eliminates paper waste and brews clean, full-bodied cups.', date: '4 days ago' },
      { user: 'Natalie R.', rating: 4.7, comment: 'Thick borosilicate glass. The wooden collar makes pouring comfortable.', date: '2 weeks ago' },
      { user: 'Mark S.', rating: 4.9, comment: 'Looks gorgeous on the counter and cleans in under 30 seconds.', date: '1 month ago' }
    ]
  },
  {
    id: 'p14',
    name: 'Memory Foam Support Pillow',
    category: 'home',
    price: 35.00,
    icon: '🪑',
    shortDesc: 'Ergonomic seat cushion for healthy posture & back relief.',
    longDesc: 'Designed to relieve pressure on the tailbone during long hours of sitting. Premium high-density memory foam with breathable, machine-washable mesh cover.',
    highlights: ['High-Density Foam', 'Washable Cover', 'Orthopedic Shape'],
    rating: 4.8,
    reviews: [
      { user: 'Claire V.', rating: 5, comment: 'Saved my lower back during 10-hour workdays. Does not flatten out.', date: '3 days ago' },
      { user: 'Brandon Y.', rating: 4.8, comment: 'Non-slip bottom stays in place on my office chair. Very supportive.', date: '1 week ago' },
      { user: 'Eva H.', rating: 4.7, comment: 'Breathable mesh cover is easy to unzip and wash. Worth every dollar.', date: '3 weeks ago' }
    ]
  },

  // Budget $36 - $100
  {
    id: 'p15',
    name: 'Waterproof Mini Bluetooth Speaker',
    category: 'gadgets',
    price: 38.00,
    icon: '🔊',
    shortDesc: 'IPX7 waterproof 10W speaker with punchy bass & 12h battery.',
    longDesc: 'Bring your playlist to the shower, pool, or trail. Compact shockproof body delivers surprisingly rich sound and connects instantly via Bluetooth 5.3.',
    highlights: ['IPX7 Waterproof', '12h Playtime', 'Built-in Mic'],
    rating: 4.8,
    reviews: [
      { user: 'Adam Z.', rating: 5, comment: 'Took it on a kayak trip and it got soaked with zero issues. Punchy bass for its size.', date: '2 days ago' },
      { user: 'Megan C.', rating: 4.8, comment: 'Battery lasts all weekend. Bluetooth 5.3 range connects across 3 rooms.', date: '1 week ago' },
      { user: 'Trevor K.', rating: 4.7, comment: 'Rugged rubberized bumper protects it from drops on tile.', date: '2 weeks ago' }
    ]
  },
  {
    id: 'p16',
    name: 'Japanese Steel Chef Knife',
    category: 'home',
    price: 42.00,
    icon: '🔪',
    shortDesc: '8-inch ultra-sharp high carbon steel with wooden sheath.',
    longDesc: 'Engineered for effortless chopping, slicing, and dicing. Razor-sharp 15-degree edge with balanced pakkawood handle for maximum kitchen control.',
    highlights: ['High-Carbon Steel', 'Razor Sharp', 'Protective Sheath'],
    rating: 4.9,
    reviews: [
      { user: 'Victor M.', rating: 5, comment: 'Glides through ripe tomatoes and onions with zero resistance. Razor sharp.', date: '1 day ago' },
      { user: 'Angela P.', rating: 5, comment: 'Balance point is right at the bolster. Pakkawood grip fits naturally in the hand.', date: '5 days ago' },
      { user: 'Rob E.', rating: 4.8, comment: 'The protective sheath is a great bonus. Retains edge exceptionally well.', date: '3 weeks ago' }
    ]
  },
  {
    id: 'p17',
    name: 'Backlit Compact Mechanical Keyboard',
    category: 'gadgets',
    price: 45.00,
    icon: '⌨️',
    shortDesc: '75% layout tactile keyboard with customizable warm backlight.',
    longDesc: 'Satisfying tactile feedback with gentle actuation force. Detachable braided USB-C cable and hot-swappable keycaps for typing comfort.',
    highlights: ['75% Compact Size', 'Tactile Brown Switches', 'Warm Backlight'],
    rating: 4.8,
    reviews: [
      { user: 'Leo Q.', rating: 5, comment: 'The tactile brown switches have a satisfying gentle bump without loud clacking.', date: '4 days ago' },
      { user: 'Vanessa T.', rating: 4.7, comment: 'Warm amber backlight is easy on the eyes at night. Sturdy aluminum plate.', date: '2 weeks ago' },
      { user: 'Julian F.', rating: 4.9, comment: 'Compact 75% layout gives me so much more mouse room on my desk.', date: '1 month ago' }
    ]
  },
  {
    id: 'p18',
    name: 'Heavy-Duty Canvas Duffel Bag',
    category: 'lifestyle',
    price: 58.00,
    icon: '🧳',
    shortDesc: '35L weekend travel duffel with water-resistant shoe pocket.',
    longDesc: 'Sturdy waxed cotton canvas with reinforced brass hardware. Features dedicated ventilated shoe compartment and padded shoulder strap.',
    highlights: ['Waxed Canvas', 'Shoe Compartment', '35-Liter Size'],
    rating: 4.9,
    reviews: [
      { user: 'Darren K.', rating: 5, comment: 'Heavy waxed canvas repels rain. The separate shoe pocket keeps clothes clean.', date: '3 days ago' },
      { user: 'Monica B.', rating: 5, comment: 'Fits overhead bins easily. Brass zippers and leather accents feel high-end.', date: '1 week ago' },
      { user: 'Eric N.', rating: 4.8, comment: 'Tons of internal pockets for cables, passport, and toiletry bag.', date: '3 weeks ago' }
    ]
  },
  {
    id: 'p19',
    name: 'Active Fitness Tracker Band',
    category: 'gadgets',
    price: 65.00,
    icon: '⌚',
    shortDesc: 'AMOLED display heart rate, sleep & step tracker with 14d battery.',
    longDesc: 'Track your daily fitness goals effortlessly. Vibrant always-on AMOLED touchscreen, 50m water resistance, 30+ workout modes, and 2-week battery life.',
    highlights: ['AMOLED Screen', '14-Day Battery', 'Heart & Sleep Tracker'],
    rating: 4.8,
    reviews: [
      { user: 'Timothy J.', rating: 5, comment: '14-day battery life is real! I charged it once and forgot about the cable.', date: '2 days ago' },
      { user: 'Kayla S.', rating: 4.8, comment: 'Crisp AMOLED display readable in direct sunlight. Accurate sleep tracking.', date: '1 week ago' },
      { user: 'Aaron W.', rating: 4.7, comment: 'Survives pool swimming sessions without any issue. Great companion app.', date: '2 weeks ago' }
    ]
  },
  {
    id: 'p20',
    name: 'Noise-Canceling Wireless Headphones',
    category: 'gadgets',
    price: 79.00,
    icon: '🎧',
    shortDesc: 'Hybrid ANC over-ear headphones with 40-hour playtime.',
    longDesc: 'Block out background chatter and immerse yourself in studio-quality sound. Plush memory foam earcups and quick charge (10 mins = 4 hours).',
    highlights: ['Active Noise Canceling', '40h Battery', 'Fast USB-C Charge'],
    rating: 4.9,
    reviews: [
      { user: 'Justin D.', rating: 5, comment: 'ANC eliminates the low hum of airplane engines and air conditioners effectively.', date: 'Yesterday' },
      { user: 'Brianna M.', rating: 5, comment: 'Memory foam earcups do not pinch my glasses. Soundstage is punchy and detailed.', date: '5 days ago' },
      { user: 'Felix L.', rating: 4.8, comment: 'Crazy 40-hour battery life. Fast USB-C quick charge is a lifesaver.', date: '2 weeks ago' }
    ]
  }
];

// ==========================================
// 2. ISOLATED DATABASE PER USER (UserDatabase)
// ==========================================
class UserDatabase {
  constructor(email) {
    this.email = email.trim().toLowerCase();
    this.sanitizedId = this.email.replace(/[^a-zA-Z0-9_-]/g, '_');
    this.dbName = `byb_user_db_${this.sanitizedId}`;
    this.idbName = `BYB_UserDB_${this.sanitizedId}`;
    this.initDatabase();
    this.initIndexedDB();
  }

  initDatabase() {
    if (!localStorage.getItem(this.dbName)) {
      const initialSchema = {
        databaseId: this.dbName,
        userEmail: this.email,
        createdAt: new Date().toISOString(),
        tables: {
          orders: [],
          settings: {
            defaultBudget: 35.00
          }
        }
      };
      localStorage.setItem(this.dbName, JSON.stringify(initialSchema));
    }
  }

  initIndexedDB() {
    if (!window.indexedDB) return;
    try {
      const req = window.indexedDB.open(this.idbName, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('orders')) {
          db.createObjectStore('orders', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile', { keyPath: 'key' });
        }
      };
      req.onsuccess = (e) => {
        this.idb = e.target.result;
        this.syncToIndexedDB();
      };
    } catch (err) {
      console.warn("IndexedDB fallback:", err);
    }
  }

  syncToIndexedDB() {
    if (!this.idb) return;
    try {
      const data = this.getRawData();
      const tx = this.idb.transaction(['orders', 'profile'], 'readwrite');
      const ordersStore = tx.objectStore('orders');
      (data.tables?.orders || []).forEach(order => {
        ordersStore.put(order);
      });
      const profileStore = tx.objectStore('profile');
      profileStore.put({ key: 'userEmail', value: this.email });
      profileStore.put({ key: 'databaseId', value: this.dbName });
    } catch (e) {
      // safe fallback
    }
  }

  getRawData() {
    try {
      const raw = localStorage.getItem(this.dbName);
      return raw ? JSON.parse(raw) : { tables: { orders: [] } };
    } catch (e) {
      return { tables: { orders: [] } };
    }
  }

  saveRawData(data) {
    localStorage.setItem(this.dbName, JSON.stringify(data));
    this.syncToIndexedDB();
  }

  getOrders() {
    const data = this.getRawData();
    return data.tables?.orders || [];
  }

  addOrder(order) {
    const data = this.getRawData();
    if (!data.tables) data.tables = {};
    if (!data.tables.orders) data.tables.orders = [];

    const orderWithDbRef = {
      ...order,
      databaseRef: this.dbName,
      userEmail: this.email,
      timestamp: new Date().toISOString()
    };

    data.tables.orders.unshift(orderWithDbRef);
    this.saveRawData(data);
    return orderWithDbRef;
  }

  updateOrder(orderId, updateFn) {
    const data = this.getRawData();
    const orders = data.tables?.orders || [];
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      updateFn(orders[index]);
      this.saveRawData(data);
      return orders[index];
    }
    return null;
  }
}

// ==========================================
// 3. MAIN APP LOGIC (BudgetApp)
// ==========================================
class BudgetApp {
  constructor() {
    this.budget = 35.00;
    this.activeCategory = 'all';
    this.cart = {}; // { [productId]: quantity }
    this.selectedPayment = 'cod';
    this.currentModalProduct = null;
    this.orderData = null;

    // Authentication and User Database state
    this.authMode = 'signup';
    this.pendingAction = null;
    this.currentUser = this.loadCurrentUser();
    this.userDb = this.currentUser ? new UserDatabase(this.currentUser.email) : null;

    // Feedback state
    this.feedbackRating = 5;
    this.feedbackType = 'General';

    this.initElements();
    this.bindEvents();
    this.updateAuthUI();
    this.render();
  }

  initElements() {
    // Screens
    this.screens = {
      catalog: document.getElementById('screen-catalog'),
      checkout: document.getElementById('screen-checkout'),
      success: document.getElementById('screen-success'),
      orders: document.getElementById('screen-orders'),
    };

    // Header & Auth area
    this.authHeaderArea = document.getElementById('authHeaderArea');
    this.userStatusBar = document.getElementById('userStatusBar');
    this.userStatusEmail = document.getElementById('userStatusEmail');
    this.userOrdersCount = document.getElementById('userOrdersCount');

    // Catalog Screen Elements
    this.customBudgetInput = document.getElementById('customBudgetInput');
    this.catalogTitle = document.getElementById('catalogTitle');
    this.itemsCountBadge = document.getElementById('itemsCountBadge');
    this.itemsGrid = document.getElementById('itemsGrid');
    this.cartCount = document.getElementById('cartCount');
    this.floatingBar = document.getElementById('floatingBar');
    this.floatingCount = document.getElementById('floatingCount');
    this.floatingTotal = document.getElementById('floatingTotal');

    // Checkout Screen Elements
    this.meterBudget = document.getElementById('meterBudget');
    this.meterTotal = document.getElementById('meterTotal');
    this.meterFill = document.getElementById('meterFill');
    this.meterStatus = document.getElementById('meterStatus');
    this.checkoutItemsList = document.getElementById('checkoutItemsList');
    this.emptyCartState = document.getElementById('emptyCartState');
    this.paymentOptionsCard = document.getElementById('paymentOptionsCard');
    this.proceedToPayBtn = document.getElementById('proceedToPayBtn');
    this.payBtnAmount = document.getElementById('payBtnAmount');
    this.aiHelpBanner = document.getElementById('aiHelpBanner');
    this.getHelpCartBtn = document.getElementById('getHelpCartBtn');

    // Success Screen Elements
    this.successUserEmail = document.getElementById('successUserEmail');
    this.successTotalPaid = document.getElementById('successTotalPaid');
    this.successPaymentType = document.getElementById('successPaymentType');
    this.successItemsCount = document.getElementById('successItemsCount');
    this.deliveryDetailsPanel = document.getElementById('deliveryDetailsPanel');
    this.deliveryOrderId = document.getElementById('deliveryOrderId');
    this.deliveryDate = document.getElementById('deliveryDate');
    this.deliveryTime = document.getElementById('deliveryTime');

    // Orders Screen Elements
    this.ordersAccountBadge = document.getElementById('ordersAccountBadge');
    this.ordersAccountDesc = document.getElementById('ordersAccountDesc');
    this.userDbNameText = document.getElementById('userDbNameText');
    this.userOrdersList = document.getElementById('userOrdersList');
    this.emptyOrdersState = document.getElementById('emptyOrdersState');

    // Product Detail Modal Elements
    this.itemDetailModal = document.getElementById('itemDetailModal');
    this.modalIcon = document.getElementById('modalIcon');
    this.modalTag = document.getElementById('modalTag');
    this.modalTitle = document.getElementById('modalTitle');
    this.modalPrice = document.getElementById('modalPrice');
    this.modalBudgetFit = document.getElementById('modalBudgetFit');
    this.modalDesc = document.getElementById('modalDesc');
    this.modalHighlights = document.getElementById('modalHighlights');
    this.modalAddBtn = document.getElementById('modalAddBtn');

    // Auth Modal Elements
    this.authModal = document.getElementById('authModal');
    this.authModalTitle = document.getElementById('authModalTitle');
    this.authModalSubtitle = document.getElementById('authModalSubtitle');
    this.tabSignUp = document.getElementById('tabSignUp');
    this.tabLogin = document.getElementById('tabLogin');
    this.authCallout = document.getElementById('authCallout');
    this.authErrorAlert = document.getElementById('authErrorAlert');
    this.authForm = document.getElementById('authForm');
    this.authNameGroup = document.getElementById('authNameGroup');
    this.authName = document.getElementById('authName');
    this.authEmail = document.getElementById('authEmail');
    this.authPassword = document.getElementById('authPassword');
    this.authSubmitBtn = document.getElementById('authSubmitBtn');
    this.authTogglePrompt = document.getElementById('authTogglePrompt');
    this.authToggleBtn = document.getElementById('authToggleBtn');

    // AI Help Modal Elements
    this.aiHelpModal = document.getElementById('aiHelpModal');
    this.aiModalTag = document.getElementById('aiModalTag');
    this.aiModalItemTitle = document.getElementById('aiModalItemTitle');
    this.aiModalItemSubtitle = document.getElementById('aiModalItemSubtitle');
    this.aiLoadingPanel = document.getElementById('aiLoadingPanel');
    this.aiResultsPanel = document.getElementById('aiResultsPanel');

    // Feedback Modal Elements
    this.feedbackModal = document.getElementById('feedbackModal');
    this.feedbackFormView = document.getElementById('feedbackFormView');
    this.feedbackSuccessView = document.getElementById('feedbackSuccessView');
    this.feedbackComment = document.getElementById('feedbackComment');
    this.ratingTextHint = document.getElementById('ratingTextHint');
  }

  bindEvents() {
    this.customBudgetInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 1) {
        this.budget = val;
        this.updatePresetButtons(val);
        this.renderCatalog();
        this.updateCartBadges();
      }
    });
  }

  // ==========================================
  // AUTHENTICATION & USER DATABASE MANAGEMENT
  // ==========================================
  loadCurrentUser() {
    try {
      const stored = localStorage.getItem('byb_active_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  getRegisteredUsers() {
    try {
      const stored = localStorage.getItem('byb_registered_users');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }

  saveRegisteredUsers(users) {
    localStorage.setItem('byb_registered_users', JSON.stringify(users));
  }

  connectUser(user) {
    this.currentUser = user;
    localStorage.setItem('byb_active_user', JSON.stringify(user));
    this.userDb = new UserDatabase(user.email);
    this.updateAuthUI();
  }

  signOut() {
    this.currentUser = null;
    this.userDb = null;
    localStorage.removeItem('byb_active_user');
    this.updateAuthUI();

    if (this.screens.orders && this.screens.orders.classList.contains('active')) {
      this.navToScreen('screen-catalog');
    }
  }

  updateAuthUI() {
    if (!this.authHeaderArea) return;

    if (this.currentUser) {
      this.authHeaderArea.innerHTML = `
        <div class="header-user-group">
          <button type="button" class="header-orders-btn" onclick="app.navToScreen('screen-orders')" title="My Orders">
            📦 Orders
          </button>
          <button type="button" class="header-signout-btn" onclick="app.signOut()" title="Sign Out">
            Sign Out
          </button>
        </div>
      `;

      if (this.userStatusBar) {
        this.userStatusBar.style.display = 'flex';
        this.userStatusEmail.textContent = this.currentUser.email;
        const count = this.userDb ? this.userDb.getOrders().length : 0;
        this.userOrdersCount.textContent = count;
      }
    } else {
      this.authHeaderArea.innerHTML = `
        <button type="button" class="header-auth-btn" onclick="app.openAuthModal('login')">
          👤 Log In
        </button>
      `;

      if (this.userStatusBar) {
        this.userStatusBar.style.display = 'none';
      }
    }
  }

  openAuthModal(mode = 'signup', contextReason = '') {
    this.authMode = mode;
    this.authErrorAlert.style.display = 'none';
    this.authErrorAlert.textContent = '';

    if (this.authForm) {
      this.authForm.reset();
    }

    if (contextReason === 'checkout') {
      this.authCallout.innerHTML = `
        💡 <strong>Order Ready!</strong> Create your account or log in to confirm your order and set up your private user database.
      `;
    } else if (contextReason === 'orders') {
      this.authCallout.innerHTML = `
        🔒 <strong>Private Orders:</strong> Please log in to view your orders saved in your personal database.
      `;
    } else {
      this.authCallout.innerHTML = `
        ✨ <strong>Welcome!</strong> Each user gets their own dedicated database to safely store and manage their orders.
      `;
    }

    this.switchAuthMode(mode);
    this.authModal.classList.add('open');
  }

  closeAuthModal(event) {
    if (event && event.target !== this.authModal) return;
    this.authModal.classList.remove('open');
    this.pendingAction = null;
  }

  switchAuthMode(mode) {
    this.authMode = mode;
    this.authErrorAlert.style.display = 'none';

    if (mode === 'signup') {
      this.tabSignUp.classList.add('active');
      this.tabLogin.classList.remove('active');
      this.authModalTitle.textContent = 'Create Your Account';
      this.authModalSubtitle.textContent = 'Sign up to create your own isolated database and manage orders.';
      this.authNameGroup.style.display = 'block';
      this.authSubmitBtn.textContent = this.pendingAction === 'placeOrder'
        ? 'Create Account & Confirm Order ➔'
        : 'Create Account & Continue ➔';
      this.authTogglePrompt.textContent = 'Already have an account?';
      this.authToggleBtn.textContent = 'Log In instead';
    } else {
      this.tabSignUp.classList.remove('active');
      this.tabLogin.classList.add('active');
      this.authModalTitle.textContent = 'Welcome Back';
      this.authModalSubtitle.textContent = 'Log in to connect to your personal database.';
      this.authNameGroup.style.display = 'none';
      this.authSubmitBtn.textContent = this.pendingAction === 'placeOrder'
        ? 'Log In & Confirm Order ➔'
        : 'Log In & Continue ➔';
      this.authTogglePrompt.textContent = "Don't have an account yet?";
      this.authToggleBtn.textContent = 'Sign Up for free';
    }
  }

  toggleAuthMode() {
    this.switchAuthMode(this.authMode === 'signup' ? 'login' : 'signup');
  }

  handleAuthSubmit(event) {
    event.preventDefault();
    const email = this.authEmail.value.trim().toLowerCase();
    const password = this.authPassword.value.trim();
    const name = this.authName.value.trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      this.showAuthError('Please enter a valid email address.');
      return;
    }

    if (password.length < 4) {
      this.showAuthError('Password must be at least 4 characters.');
      return;
    }

    const registry = this.getRegisteredUsers();

    if (this.authMode === 'signup') {
      if (registry[email]) {
        this.showAuthError('An account with this email already exists. Please log in.');
        return;
      }

      const userName = name || email.split('@')[0];
      const newUser = {
        email,
        name: userName,
        password,
        createdAt: new Date().toISOString()
      };

      registry[email] = newUser;
      this.saveRegisteredUsers(registry);

      this.connectUser({ email, name: userName });
      this.authModal.classList.remove('open');

      if (this.pendingAction === 'placeOrder') {
        this.pendingAction = null;
        this.placeOrder();
      }
    } else {
      const user = registry[email];
      if (!user) {
        this.showAuthError('No account found with this email. Please check your spelling or sign up.');
        return;
      }
      if (user.password !== password) {
        this.showAuthError('Incorrect password. Please try again.');
        return;
      }

      this.connectUser({ email: user.email, name: user.name });
      this.authModal.classList.remove('open');

      if (this.pendingAction === 'placeOrder') {
        this.pendingAction = null;
        this.placeOrder();
      }
    }
  }

  showAuthError(msg) {
    this.authErrorAlert.textContent = msg;
    this.authErrorAlert.style.display = 'block';
  }

  // ==========================================
  // NAVIGATION & BUDGET CONTROLS
  // ==========================================
  setBudget(amount) {
    this.budget = amount;
    this.customBudgetInput.value = amount;
    this.updatePresetButtons(amount);
    this.renderCatalog();
    this.updateCartBadges();
  }

  updatePresetButtons(activeAmount) {
    const buttons = document.querySelectorAll('.preset-btn');
    buttons.forEach(btn => {
      const btnVal = parseFloat(btn.textContent.replace('$', ''));
      if (btnVal === activeAmount) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  filterCategory(cat) {
    this.activeCategory = cat;
    const chips = document.querySelectorAll('.category-chips .chip');
    chips.forEach(chip => {
      if (chip.getAttribute('data-cat') === cat) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
    this.renderCatalog();
  }

  navToScreen(screenId) {
    if (screenId === 'screen-orders') {
      if (!this.currentUser) {
        this.openAuthModal('login', 'orders');
        return;
      }
      this.renderOrders();
    }

    Object.values(this.screens).forEach(screen => {
      if (screen) screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (screenId === 'screen-checkout') {
      this.renderCheckout();
    }
    if (screenId === 'screen-catalog') {
      this.updateCartBadges();
    }
  }

  // ==========================================
  // SCREEN 1: CATALOG (PUBLIC SCREEN)
  // ==========================================
  renderCatalog() {
    this.catalogTitle.textContent = `Things in your budget (Under $${this.budget.toFixed(0)})`;

    const filtered = SAMPLE_PRODUCTS.filter(item => {
      const budgetMatch = item.price <= this.budget;
      const categoryMatch = this.activeCategory === 'all' || item.category === this.activeCategory;
      return budgetMatch && categoryMatch;
    });

    this.itemsCountBadge.textContent = `${filtered.length} found`;

    if (filtered.length === 0) {
      this.itemsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 32px 16px; background: #ffffff; border-radius: 16px; border: 2px dashed var(--color-green-mid);">
          <div style="font-size: 40px; margin-bottom: 8px;">🌱</div>
          <h3 style="font-size: 16px; font-weight: 800; color: #111;">No items under $${this.budget}</h3>
          <p style="font-size: 13px; color: #555; margin-top: 4px;">Try raising your budget slightly with the buttons above!</p>
        </div>
      `;
      return;
    }

    this.itemsGrid.innerHTML = filtered.map(item => `
      <article class="item-card" onclick="app.openItemModal('${item.id}')" role="button" tabindex="0" aria-label="View details for ${item.name}">
        <div class="item-icon-wrap">${item.icon}</div>
        <h3 class="item-title">${item.name}</h3>
        <div class="item-footer">
          <span class="item-price">$${item.price.toFixed(2)}</span>
          <span class="tap-details-hint">Tap details ➔</span>
        </div>
      </article>
    `).join('');
  }

  // ==========================================
  // ITEM DETAIL MODAL
  // ==========================================
  openItemModal(itemId) {
    const product = SAMPLE_PRODUCTS.find(p => p.id === itemId);
    if (!product) return;

    this.currentModalProduct = product;
    this.modalIcon.textContent = product.icon;
    this.modalTag.textContent = product.category;
    this.modalTitle.textContent = product.name;
    this.modalPrice.textContent = `$${product.price.toFixed(2)}`;
    this.modalDesc.textContent = product.longDesc;

    const diff = this.budget - product.price;
    if (diff >= 0) {
      this.modalBudgetFit.textContent = `✓ Leaves $${diff.toFixed(2)} in your budget`;
      this.modalBudgetFit.style.background = '#e8f5e9';
      this.modalBudgetFit.style.borderColor = '#81c784';
      this.modalBudgetFit.style.color = '#1b5e20';
    } else {
      this.modalBudgetFit.textContent = `Over budget by $${Math.abs(diff).toFixed(2)}`;
      this.modalBudgetFit.style.background = '#ffebee';
      this.modalBudgetFit.style.borderColor = '#e57373';
      this.modalBudgetFit.style.color = '#c62828';
    }

    this.modalHighlights.innerHTML = product.highlights.map(h => `
      <span class="highlight-pill">${h}</span>
    `).join('');

    const currentQty = this.cart[product.id] || 0;
    if (currentQty > 0) {
      this.modalAddBtn.textContent = `+ Add Another (In Cart: ${currentQty})`;
    } else {
      this.modalAddBtn.textContent = `+ Add to My Order ($${product.price.toFixed(2)})`;
    }

    this.itemDetailModal.classList.add('open');
  }

  closeItemModal(event) {
    if (event && event.target !== this.itemDetailModal) return;
    this.itemDetailModal.classList.remove('open');
    this.currentModalProduct = null;
  }

  addCurrentModalItem() {
    if (!this.currentModalProduct) return;
    const id = this.currentModalProduct.id;
    this.cart[id] = (this.cart[id] || 0) + 1;
    this.updateCartBadges();

    this.modalAddBtn.textContent = '✓ Added to Order!';
    setTimeout(() => {
      this.itemDetailModal.classList.remove('open');
      this.currentModalProduct = null;
    }, 400);
  }

  // ==========================================
  // SCREEN 2: CHECKOUT & QUANTITIES
  // ==========================================
  renderCheckout() {
    const cartItemIds = Object.keys(this.cart).filter(id => this.cart[id] > 0);
    const hasItems = cartItemIds.length > 0;

    if (!hasItems) {
      this.checkoutItemsList.innerHTML = '';
      this.emptyCartState.style.display = 'block';
      this.paymentOptionsCard.style.display = 'none';
      if (this.aiHelpBanner) this.aiHelpBanner.style.display = 'none';
      this.updateBudgetMeter(0);
      return;
    }

    this.emptyCartState.style.display = 'none';
    this.paymentOptionsCard.style.display = 'block';
    if (this.aiHelpBanner) this.aiHelpBanner.style.display = 'flex';

    let totalCost = 0;
    this.checkoutItemsList.innerHTML = cartItemIds.map(id => {
      const product = SAMPLE_PRODUCTS.find(p => p.id === id);
      const qty = this.cart[id];
      const itemSubtotal = product.price * qty;
      totalCost += itemSubtotal;

      const reviewCount = product.reviews?.length || 3;
      const rating = product.rating || 4.8;

      return `
        <div class="checkout-item-card">
          <div class="checkout-item-main">
            <div class="checkout-item-info">
              <div class="checkout-item-icon">${product.icon}</div>
              <div>
                <h4 class="checkout-item-name">${product.name}</h4>
                <p class="checkout-item-unit-price">$${product.price.toFixed(2)} each &bull; <strong>Subtotal: $${itemSubtotal.toFixed(2)}</strong></p>
              </div>
            </div>
            
            <div class="stepper-group" aria-label="Adjust quantity for ${product.name}">
              <button class="stepper-btn" onclick="app.updateQuantity('${id}', -1)" aria-label="Decrease quantity">-</button>
              <span class="stepper-value">${qty}</span>
              <button class="stepper-btn" onclick="app.updateQuantity('${id}', 1)" aria-label="Increase quantity">+</button>
            </div>
          </div>

          <!-- [Get Some Help] Button on Screen 2 per item -->
          <div class="checkout-item-help-row">
            <button type="button" class="get-some-help-btn" onclick="app.getAIHelpForItem('${id}')" title="Ask AI about quality & reviews">
              ✨ Get Some Help
            </button>
            <span class="reviews-preview-pill">★ ${rating} (${reviewCount} buyer reviews)</span>
          </div>
        </div>
      `;
    }).join('');

    this.updateBudgetMeter(totalCost);
    this.payBtnAmount.textContent = `$${totalCost.toFixed(2)}`;
  }

  updateQuantity(productId, delta) {
    const current = this.cart[productId] || 0;
    const next = current + delta;
    if (next <= 0) {
      delete this.cart[productId];
    } else {
      this.cart[productId] = next;
    }
    this.updateCartBadges();
    this.renderCheckout();
  }

  updateBudgetMeter(totalCost) {
    this.meterBudget.textContent = `$${this.budget.toFixed(2)}`;
    this.meterTotal.textContent = `$${totalCost.toFixed(2)}`;

    const percentage = Math.min((totalCost / this.budget) * 100, 100);
    this.meterFill.style.width = `${percentage}%`;

    const remaining = this.budget - totalCost;
    if (remaining >= 0) {
      this.meterFill.classList.remove('over-budget');
      this.meterStatus.classList.remove('over-budget');
      this.meterStatus.textContent = remaining === 0
        ? `🎯 Perfect! You utilized 100% of your budget.`
        : `✓ You have $${remaining.toFixed(2)} remaining within your budget!`;
      this.proceedToPayBtn.disabled = false;
      this.proceedToPayBtn.style.opacity = '1';
    } else {
      this.meterFill.classList.add('over-budget');
      this.meterStatus.classList.add('over-budget');
      this.meterStatus.textContent = `⚠️ You are $${Math.abs(remaining).toFixed(2)} over your $${this.budget.toFixed(2)} budget!`;
      this.proceedToPayBtn.disabled = false;
    }
  }

  selectPayment(radio) {
    this.selectedPayment = radio.value;
    document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
    radio.closest('.payment-option').classList.add('selected');
  }

  // ==========================================
  // AI ASSISTANT: [GET SOME HELP] FEATURE
  // ==========================================
  getAIHelpForCart() {
    const cartIds = Object.keys(this.cart).filter(id => this.cart[id] > 0);
    if (cartIds.length === 0) {
      alert("Please add at least one item before asking for help!");
      return;
    }
    // Launch help for the first selected item in cart
    this.getAIHelpForItem(cartIds[0]);
  }

  async getAIHelpForItem(itemId) {
    const product = SAMPLE_PRODUCTS.find(p => p.id === itemId);
    if (!product) return;

    this.openAIHelpModal(product);

    try {
      // Backend URL (API key is safely kept in backend Secrets / .env, never in client code)
      const backendUrl = window.AI_BACKEND_URL || 'http://localhost:3001/api/ai-help';

      // 6 second timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: {
            name: product.name,
            category: product.category,
            price: product.price,
            shortDesc: product.shortDesc,
            longDesc: product.longDesc,
            highlights: product.highlights
          },
          reviews: product.reviews || []
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data = await response.json();
      if (!data || data.error) {
        throw new Error(data?.error || "AI service error");
      }

      // Success: Show the AI evaluation
      this.renderAIHelpSuccess(product, data);
    } catch (err) {
      console.warn("AI Backend consultation notice:", err.message);
      // REQUIREMENT: If the AI fails, show a friendly message instead of an error!
      this.renderAIFriendlyFallback(product);
    }
  }

  openAIHelpModal(product) {
    this.aiModalItemTitle.textContent = product.name;
    this.aiModalItemSubtitle.textContent = `Analyzing quality and what other people think ($${product.price.toFixed(2)})`;
    this.aiLoadingPanel.style.display = 'flex';
    this.aiResultsPanel.style.display = 'none';
    this.aiResultsPanel.innerHTML = '';
    this.aiHelpModal.classList.add('open');
  }

  closeAIHelpModal(event) {
    if (event && event.target !== this.aiHelpModal) return;
    this.aiHelpModal.classList.remove('open');
  }

  renderAIHelpSuccess(product, data) {
    this.aiLoadingPanel.style.display = 'none';
    this.aiResultsPanel.style.display = 'block';

    const reviewsHtml = (product.reviews || []).map(r => `
      <div class="ai-review-card">
        <div class="ai-review-header">
          <span class="ai-review-user">👤 ${r.user}</span>
          <span class="ai-review-stars">★ ${r.rating} / 5</span>
        </div>
        <p class="ai-review-comment">"${r.comment}"</p>
      </div>
    `).join('');

    const highlightsList = (data.keyReviewHighlights || []).map(h => `
      <li>${h}</li>
    `).join('');

    this.aiResultsPanel.innerHTML = `
      <div class="ai-verdict-pill">
        <span>🏆 ${data.verdictBadge || 'Top Community Recommendation'}</span>
      </div>

      <!-- Item Quality Section -->
      <div class="ai-section-box">
        <div class="ai-section-title">
          <span class="ai-section-icon">💎</span>
          <h4>Item Quality & Durability</h4>
        </div>
        <p class="ai-section-body">${data.quality || 'Well-crafted with durable materials that deliver strong longevity for the price.'}</p>
      </div>

      <!-- What Other People Think Section -->
      <div class="ai-section-box">
        <div class="ai-section-title">
          <span class="ai-section-icon">💬</span>
          <h4>What Other People Think</h4>
        </div>
        <p class="ai-section-body">${data.communitySentiment || 'Buyers consistently report high satisfaction, praising its thoughtful design and practical everyday value.'}</p>
        ${highlightsList ? `<ul class="ai-key-points">${highlightsList}</ul>` : ''}
      </div>

      <!-- Verified Customer Reviews Section -->
      <div class="ai-section-box">
        <div class="ai-section-title">
          <span class="ai-section-icon">⭐</span>
          <h4>Verified Customer Reviews</h4>
        </div>
        <div class="ai-reviews-container">
          ${reviewsHtml}
        </div>
      </div>
    `;
  }

  renderAIFriendlyFallback(product) {
    this.aiLoadingPanel.style.display = 'none';
    this.aiResultsPanel.style.display = 'block';

    const reviewsHtml = (product.reviews || []).map(r => `
      <div class="ai-review-card">
        <div class="ai-review-header">
          <span class="ai-review-user">👤 ${r.user}</span>
          <span class="ai-review-stars">★ ${r.rating} / 5</span>
        </div>
        <p class="ai-review-comment">"${r.comment}"</p>
      </div>
    `).join('');

    // Friendly, helpful presentation with NO errors or technical stack traces
    this.aiResultsPanel.innerHTML = `
      <div class="ai-friendly-banner">
        <div class="friendly-icon">🌿</div>
        <div>
          <strong>Shopping Advice & Feedback</strong>
          <p>Our AI assistant is taking a quick breather right now, but here is what buyers love about this item based on verified feedback!</p>
        </div>
      </div>

      <!-- Item Quality Section -->
      <div class="ai-section-box">
        <div class="ai-section-title">
          <span class="ai-section-icon">💎</span>
          <h4>Item Quality</h4>
        </div>
        <p class="ai-section-body">
          ${product.longDesc}
        </p>
        <div class="ai-highlights-tags">
          ${(product.highlights || []).map(h => `<span class="highlight-pill">${h}</span>`).join('')}
        </div>
      </div>

      <!-- What Other People Think Section -->
      <div class="ai-section-box">
        <div class="ai-section-title">
          <span class="ai-section-icon">💬</span>
          <h4>What Other People Think</h4>
        </div>
        <p class="ai-section-body">
          With an average customer score of <strong>${product.rating || '4.8'} out of 5 stars</strong>, shoppers consistently praise this item for premium quality and outstanding budget value.
        </p>
      </div>

      <!-- Customer Reviews Section -->
      <div class="ai-section-box">
        <div class="ai-section-title">
          <span class="ai-section-icon">⭐</span>
          <h4>Customer Reviews</h4>
        </div>
        <div class="ai-reviews-container">
          ${reviewsHtml}
        </div>
      </div>
    `;
  }

  // ==========================================
  // PLACE ORDER (MAIN ACTION GATED BY AUTH)
  // ==========================================
  placeOrder() {
    const cartIds = Object.keys(this.cart).filter(id => this.cart[id] > 0);
    if (cartIds.length === 0) {
      alert("Please add at least one item before proceeding to pay!");
      return;
    }

    if (!this.currentUser) {
      this.pendingAction = 'placeOrder';
      this.openAuthModal('signup', 'checkout');
      return;
    }

    let totalPaid = 0;
    let totalItems = 0;
    const itemsSnapshot = [];

    cartIds.forEach(id => {
      const p = SAMPLE_PRODUCTS.find(item => item.id === id);
      const qty = this.cart[id];
      const subtotal = p.price * qty;
      totalPaid += subtotal;
      totalItems += qty;
      itemsSnapshot.push({
        id: p.id,
        name: p.name,
        icon: p.icon,
        price: p.price,
        quantity: qty,
        subtotal: subtotal
      });
    });

    const randomOrderId = `#BYB-${Math.floor(10000 + Math.random() * 90000)}`;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateFormatted = tomorrow.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const paymentLabels = {
      'cod': 'Cash on Delivery 💵',
      'dummy-upi': 'Instant Mock Pay ⚡',
      'dummy-card': 'Demo Card Payment 💳'
    };

    const newOrder = {
      id: randomOrderId,
      date: dateFormatted,
      time: '2:00 PM – 4:30 PM',
      totalPaid: `$${totalPaid.toFixed(2)}`,
      totalPaidNum: totalPaid,
      paymentMethod: paymentLabels[this.selectedPayment] || 'Cash on Delivery',
      itemsCount: `${totalItems} item${totalItems > 1 ? 's' : ''}`,
      items: itemsSnapshot,
      status: 'Confirmed'
    };

    const savedOrder = this.userDb.addOrder(newOrder);
    this.orderData = savedOrder;

    if (this.successUserEmail) {
      this.successUserEmail.textContent = this.currentUser.email;
    }
    this.successTotalPaid.textContent = savedOrder.totalPaid;
    this.successPaymentType.textContent = savedOrder.paymentMethod;
    this.successItemsCount.textContent = savedOrder.itemsCount;
    this.deliveryOrderId.textContent = savedOrder.id;
    this.deliveryDate.textContent = `Tomorrow, ${savedOrder.date}`;
    this.deliveryTime.textContent = savedOrder.time;

    this.deliveryDetailsPanel.classList.remove('expanded');

    this.cart = {};
    this.updateCartBadges();
    this.updateAuthUI();

    this.navToScreen('screen-success');
  }

  // ==========================================
  // SCREEN 3: DELIVERY LOOKUP TOGGLE
  // ==========================================
  toggleDeliveryLookup() {
    const isExpanded = this.deliveryDetailsPanel.classList.toggle('expanded');
    const btn = document.getElementById('deliveryLookupBtn');
    if (isExpanded) {
      btn.textContent = '▲ Hide Delivery Details';
      this.deliveryDetailsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      btn.textContent = '🚚 Delivery Lookup';
    }
  }

  // ==========================================
  // SCREEN 4: MY ORDERS (SCOPED TO USER'S OWN DATABASE)
  // ==========================================
  renderOrders() {
    if (!this.currentUser || !this.userDb) {
      this.navToScreen('screen-catalog');
      this.openAuthModal('login', 'orders');
      return;
    }

    this.ordersAccountBadge.textContent = this.currentUser.name || 'Account';
    this.ordersAccountDesc.textContent = `Orders for ${this.currentUser.email}`;
    this.userDbNameText.textContent = this.userDb.dbName;

    const orders = this.userDb.getOrders();

    if (!orders || orders.length === 0) {
      this.emptyOrdersState.style.display = 'block';
      this.userOrdersList.innerHTML = '';
      return;
    }

    this.emptyOrdersState.style.display = 'none';

    this.userOrdersList.innerHTML = orders.map(order => {
      const isCancelled = order.status === 'Cancelled';
      const statusBadge = isCancelled
        ? `<span class="order-status-badge cancelled">✕ Cancelled</span>`
        : `<span class="order-status-badge confirmed">● Confirmed</span>`;

      const itemsHtml = (order.items || []).map(item => `
        <div class="order-item-line">
          <span class="order-item-icon">${item.icon}</span>
          <span class="order-item-name">${item.name} <small>×${item.quantity}</small></span>
          <span class="order-item-price">$${item.subtotal.toFixed(2)}</span>
        </div>
      `).join('');

      const cancelBtn = !isCancelled ? `
        <button type="button" class="cancel-order-btn" onclick="app.cancelOrder('${order.id}')">
          Cancel Order
        </button>
      ` : `
        <span class="order-cancelled-note">Order has been cancelled</span>
      `;

      return `
        <article class="user-order-card" id="order-${order.id.replace('#', '')}">
          <div class="user-order-header">
            <div>
              <span class="user-order-id">${order.id}</span>
              <span class="user-order-date">${order.date}</span>
            </div>
            ${statusBadge}
          </div>

          <div class="order-db-tag">
            🗄️ Database: <code>${order.databaseRef || this.userDb.dbName}</code>
          </div>

          <div class="order-items-preview">
            ${itemsHtml}
          </div>

          <div class="user-order-footer">
            <div class="order-total-info">
              <span class="order-pay-label">${order.paymentMethod}</span>
              <span class="order-total-amount">${order.totalPaid}</span>
            </div>
            ${cancelBtn}
          </div>
        </article>
      `;
    }).join('');
  }

  cancelOrder(orderId) {
    if (!this.currentUser || !this.userDb) return;

    if (confirm(`Are you sure you want to cancel order ${orderId}?`)) {
      const updated = this.userDb.updateOrder(orderId, (order) => {
        order.status = 'Cancelled';
        order.cancelledAt = new Date().toISOString();
      });

      if (updated) {
        this.renderOrders();
      }
    }
  }

  // ==========================================
  // RESET APP
  // ==========================================
  resetApp() {
    this.cart = {};
    this.budget = 35.00;
    this.activeCategory = 'all';
    this.customBudgetInput.value = 35;
    this.updatePresetButtons(35);
    this.filterCategory('all');
    this.updateCartBadges();
    this.renderCatalog();
    this.navToScreen('screen-catalog');
  }

  updateCartBadges() {
    let totalItems = 0;
    let totalCost = 0;

    Object.keys(this.cart).forEach(id => {
      const p = SAMPLE_PRODUCTS.find(item => item.id === id);
      const qty = this.cart[id];
      if (qty > 0 && p) {
        totalItems += qty;
        totalCost += p.price * qty;
      }
    });

    this.cartCount.textContent = totalItems;
    this.floatingCount.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'} selected`;
    this.floatingTotal.textContent = `$${totalCost.toFixed(2)}`;

    const isCatalogScreen = this.screens.catalog.classList.contains('active');
    if (totalItems > 0 && isCatalogScreen) {
      this.floatingBar.classList.add('visible');
    } else {
      this.floatingBar.classList.remove('visible');
    }
  }

  // ==========================================
  // FEEDBACK SYSTEM (STEP 10 REQUIREMENT)
  // ==========================================
  openFeedbackModal() {
    if (this.feedbackFormView) this.feedbackFormView.style.display = 'block';
    if (this.feedbackSuccessView) this.feedbackSuccessView.style.display = 'none';
    if (this.feedbackComment) this.feedbackComment.value = '';
    this.setFeedbackRating(5);
    if (this.feedbackModal) this.feedbackModal.classList.add('open');
  }

  closeFeedbackModal(event) {
    if (event && event.target !== this.feedbackModal) return;
    if (this.feedbackModal) this.feedbackModal.classList.remove('open');
  }

  setFeedbackRating(stars) {
    this.feedbackRating = stars;
    const starButtons = document.querySelectorAll('#feedbackStars .star-btn');
    starButtons.forEach((btn, idx) => {
      if (idx < stars) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const hints = {
      1: 'Poor (1/5)',
      2: 'Fair (2/5)',
      3: 'Good (3/5)',
      4: 'Great! (4/5)',
      5: 'Excellent! (5/5)'
    };
    if (this.ratingTextHint) {
      this.ratingTextHint.textContent = hints[stars] || `${stars}/5`;
    }
  }

  setFeedbackType(type, buttonEl) {
    this.feedbackType = type;
    document.querySelectorAll('.feedback-chips .feedback-chip').forEach(chip => {
      chip.classList.remove('active');
    });
    if (buttonEl) buttonEl.classList.add('active');
  }

  submitFeedback(event) {
    event.preventDefault();
    const comment = this.feedbackComment ? this.feedbackComment.value.trim() : '';
    if (!comment) return;

    const feedbackEntry = {
      id: `fb_${Date.now()}`,
      rating: this.feedbackRating,
      type: this.feedbackType,
      comment: comment,
      userEmail: this.currentUser ? this.currentUser.email : 'guest',
      date: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('byb_user_feedback') || '[]');
      existing.unshift(feedbackEntry);
      localStorage.setItem('byb_user_feedback', JSON.stringify(existing));
    } catch (e) {
      console.warn("Could not save feedback:", e);
    }

    if (this.feedbackFormView) this.feedbackFormView.style.display = 'none';
    if (this.feedbackSuccessView) this.feedbackSuccessView.style.display = 'block';
  }

  render() {
    this.renderCatalog();
    this.updateCartBadges();
  }
}

// Instantiate global app instance
const app = new BudgetApp();
window.app = app;
