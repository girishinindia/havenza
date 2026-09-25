/* Havenza — content model for the home page.
   Edit collections, industries and occasions here; every section and menu reads from this file. */

export type Segment = 'b2c' | 'b2b';
export type GroupKey = 'home' | 'hospitality' | 'gifting' | 'custom';

export interface Category {
  id: number; title: string; short: string; icon: string; groups: GroupKey[];
  blurb: string; b2c: string[]; b2b: string[];
}
export interface Industry { name: string; short: string; icon: string; items: string[]; open: number }
export interface Step { n: string; t: string; icon: string; d: string }
export interface Festival { n: string; icon: string; line: string; g: [string, string] }
export interface Reason { icon: string; t: string; d: string }
type Pick = [number, string];
interface OccasionDef {
  id: string; group: 'Festivals' | 'Celebrations' | 'Corporate & venues'; name: string; icon: string;
  open: [number, Segment]; blurb: string; home: Pick[]; biz: Pick[];
}
export type Occasion = OccasionDef;

export const CATEGORIES: Category[] = [
  { id: 1, title: 'Candles & Fragrance', short: 'Candles & Fragrance', icon: 'flame', groups: ['home','hospitality','gifting'],
    blurb: 'Hand-poured soy, beeswax and designer candles — from gift sets for the home to signature scents for hotels, spas and brands.',
    b2c: ['Scented Candles','Soy Wax Candles','Beeswax Candles','Decorative Candles','Designer Candles','Flower Candles','Pillar Candles','Jar Candles','Floating Candles','Tea Light Candles','Aroma Candles','Personalized Candles','Festival & Seasonal Candles','Gift Candle Sets','Candle Holders'],
    b2b: ['Hotel Room Candles','Restaurant & Café Candles','Spa & Salon Candles','Corporate Gift Candles','Wedding & Event Candles','Custom Branded Candles','Bulk Candle Supply','Private Label Candle Manufacturing','Hospitality Fragrance Collections'] },
  { id: 2, title: 'Artificial Flowers & Floral Décor', short: 'Floral Décor', icon: 'flower-2', groups: ['home','hospitality','gifting'],
    blurb: 'Everlasting paper, crepe, fabric and foam florals — from bouquets and wreaths to lobby arrangements and stage installations.',
    b2c: ['Paper Flowers','Crepe Paper Flowers','Fabric Flowers','Foam Flowers','Artificial Flower Bouquets','Decorative Leaves','Floral Garlands','Flower Arrangements','Table Floral Décor','Wall Floral Décor','Wreaths','Mini Floral Décor','Seasonal Floral Collections'],
    b2b: ['Hotel Lobby Floral Décor','Reception Floral Arrangements','Restaurant & Café Floral Décor','Office Floral Décor','Wedding & Event Flowers','Retail Store Displays','Stage & Background Floral Décor','Custom Large Floral Installations','Corporate Floral Décor','Bulk Floral Supply'] },
  { id: 3, title: 'Resin Art & Resin Décor', short: 'Resin Art', icon: 'gem', groups: ['home','gifting','custom'],
    blurb: 'Ocean and floral resin art, coasters, trays and clocks — plus logo-embedded awards, plaques and branded corporate pieces.',
    b2c: ['Resin Coasters','Resin Trays','Resin Art Panels','Resin Wall Art','Resin Photo Frames','Resin Clocks','Resin Bookmarks','Resin Keychains','Resin Jewellery','Resin Decorative Plates','Resin Bowls','Resin Showpieces','Personalized Resin Gifts','Ocean Resin Art','Floral Resin Art'],
    b2b: ['Hotel Table Accessories','Restaurant Table Décor','Office Décor','Reception Décor','Corporate Logo Resin Products','Customized Awards & Plaques','Corporate Gifts','Branded Resin Products','Interior Décor Panels','Bulk Customized Resin Products'] },
  { id: 4, title: 'Home Décor & Decorative Art', short: 'Home Décor & Art', icon: 'lamp', groups: ['home','hospitality'],
    blurb: 'Sculptures, vases, trays and statement showpieces that layer character into shelves, mantels, lobbies and lounges.',
    b2c: ['Table Décor','Shelf Décor','Mantel Décor','Showpieces','Sculptures','Figurines','Decorative Bowls','Decorative Trays','Vases','Candle Stands','Wall Hangings','Wall Panels','Decorative Frames','Mirrors with Décor','Decorative Boxes'],
    b2b: ['Hotel Décor','Office Décor','Reception Décor','Restaurant Décor','Café Décor','Retail Store Décor','Showroom Décor','Club & Lounge Décor','Commercial Interior Accessories','Custom Décor Installations'] },
  { id: 5, title: 'Wall Art & Wall Décor', short: 'Wall Art', icon: 'frame', groups: ['home','hospitality'],
    blurb: 'Handmade, resin, botanical and 3D wall art — scaled up to corporate branding walls and large-format installations.',
    b2c: ['Handmade Wall Art','Resin Wall Art','Floral Wall Art','3D Wall Art','Decorative Wall Panels','Abstract Art','Botanical Art','Typography Art','Photo Frames','Wall Mirrors','Wall Sculptures','Wall Hangings'],
    b2b: ['Hotel Wall Art','Office Wall Art','Restaurant Wall Art','Café Wall Art','Reception Wall Art','Corporate Branding Walls','Custom Logo Walls','Large-Scale Wall Installations','Interior Designer Projects'] },
  { id: 6, title: 'Table & Dining Décor', short: 'Table & Dining', icon: 'utensils-crossed', groups: ['home','hospitality','gifting'],
    blurb: 'Centerpieces, runners, napkin rings and coasters for intimate dinners, banquets and busy restaurant floors.',
    b2c: ['Table Centerpieces','Candle Holders','Table Runners','Decorative Trays','Coasters','Napkin Rings','Decorative Bowls','Flower Arrangements','Dining Table Accessories'],
    b2b: ['Hotel Table Décor','Restaurant Table Décor','Banquet Table Décor','Wedding Table Décor','Café Table Décor','Event Table Centerpieces','Customized Table Sets','Bulk Hospitality Supply'] },
  { id: 7, title: 'Vases, Pots & Planters', short: 'Vases & Planters', icon: 'sprout', groups: ['home','hospitality'],
    blurb: 'Handmade pots, resin vases and planter arrangements — from tabletop minis to statement lobby planters.',
    b2c: ['Decorative Vases','Resin Vases','Ceramic-Style Décor','Handmade Pots','Decorative Planters','Mini Planters','Tabletop Planters','Wall Planters','Artificial Plant Arrangements'],
    b2b: ['Hotel Lobby Planters','Office Planters','Restaurant Planters','Retail Display Planters','Large Decorative Planters','Custom Planter Designs','Bulk Commercial Supply'] },
  { id: 8, title: 'Gift & Personalized Décor', short: 'Gifts & Personalised', icon: 'gift', groups: ['gifting','custom'],
    blurb: 'Name plates, photo gifts and curated décor sets — and corporate hampers, welcome kits and recognition gifts at scale.',
    b2c: ['Personalized Gifts','Name Plates','Photo Gifts','Anniversary Gifts','Birthday Gifts','Wedding Gifts','Housewarming Gifts','Festival Gifts','Couple Gifts','Customized Décor Sets','Return Gifts'],
    b2b: ['Corporate Gifts','Employee Gifts','Client Gifts','Dealer & Distributor Gifts','Festival Corporate Hampers','Welcome Kits','Employee Joining Kits','Award & Recognition Gifts','Branded Promotional Gifts','Bulk Customized Gifts'] },
  { id: 9, title: 'Wedding & Event Décor', short: 'Wedding & Events', icon: 'heart-handshake', groups: ['gifting','hospitality'],
    blurb: 'Favours, candle and floral décor for every celebration — and stage, entrance and backdrop décor for planners and venues.',
    b2c: ['Wedding Favors','Table Décor','Candle Décor','Floral Décor','Personalized Wedding Décor','Return Gifts','Engagement Décor','Anniversary Décor','Baby Shower Décor','Birthday Décor'],
    b2b: ['Wedding Planners','Event Planners','Banquet Halls','Hotels','Resorts','Event Agencies','Stage Décor','Entrance Décor','Backdrop Décor','Centerpieces','Custom Event Installations'] },
  { id: 10, title: 'Seasonal & Festival Décor', short: 'Seasonal & Festival', icon: 'sparkles', groups: ['gifting','home','hospitality'],
    blurb: 'Diwali to Christmas, Navratri to Valentine’s — festive collections for homes, hotels, offices, malls and retail.',
    b2c: ['Diwali Décor','Christmas Décor','New Year Décor','Navratri Décor','Holi Décor','Raksha Bandhan Décor',"Valentine's Décor",'Halloween Décor','Festive Candles','Seasonal Floral Décor'],
    b2b: ['Hotel Festival Décor','Office Festival Décor','Restaurant Festival Décor','Mall Décor','Retail Store Décor','Corporate Festival Décor','Event Festival Installations'] },
  { id: 11, title: 'Fragrance & Aroma Products', short: 'Fragrance & Aroma', icon: 'wind', groups: ['home','hospitality','custom'],
    blurb: 'Reed diffusers, wax melts and aroma décor — and signature room, lobby and spa scents under your own label.',
    b2c: ['Home Fragrance','Aroma Wax','Fragrance Candles','Wax Melts','Reed Diffusers','Aroma Décor','Fragrance Gift Sets'],
    b2b: ['Hotel Room Fragrance','Lobby Fragrance','Spa Fragrance','Restaurant Fragrance','Office Fragrance','Signature Hotel Fragrance','Private Label Fragrance Products'] },
  { id: 12, title: 'Handmade Craft Décor', short: 'Handmade Craft', icon: 'scissors', groups: ['home','custom'],
    blurb: 'Macramé, paper, fabric, rope, wood and upcycled mixed-media pieces — crafted by hand in small batches.',
    b2c: ['Handmade Decorative Objects','Paper Craft','Fabric Craft','Macramé Décor','Rope Décor','Wooden Décor','Mixed-Media Art','Upcycled Décor','Handmade Collectibles'],
    b2b: ['Custom Craft Projects','Interior Designer Supply','Hotel Craft Décor','Retail Display Décor','Corporate Craft Gifts','Bulk Handmade Products','Custom Theme Décor'] },
  { id: 13, title: 'Interior Décor Solutions', short: 'Interior Styling', icon: 'sofa', groups: ['home','hospitality','custom'],
    blurb: 'Room-by-room styling for living, bedroom, dining, balcony and pooja spaces — and turnkey décor for commercial interiors.',
    b2c: ['Home Styling','Room Décor Packages','Living Room Décor','Bedroom Décor','Dining Room Décor','Balcony Décor','Pooja Room Décor','Festive Home Styling'],
    b2b: ['Hotel Interior Décor','Office Interior Décor','Restaurant Interior Décor','Café Interior Décor','Salon & Spa Décor','Retail Store Décor','Showroom Décor','Reception & Lobby Styling','Custom Interior Décor Packages'] },
  { id: 14, title: 'Custom & Bespoke Creations', short: 'Custom & Bespoke', icon: 'pen-tool', groups: ['custom','gifting'],
    blurb: 'Your colours, sizes, names and themes — through to corporate branding, private label, OEM and bulk manufacturing.',
    b2c: ['Personalized Designs','Custom Colors','Custom Sizes','Name & Initial Products','Photo-Based Products','Theme-Based Décor','Custom Gift Sets'],
    b2b: ['Corporate Branding','Hotel Custom Collections','Restaurant Custom Collections','Custom Logo Products','Private Label Products','OEM Manufacturing','Bulk Manufacturing','Exclusive Product Collections','Interior Designer Custom Orders'] },
  { id: 15, title: 'Décor Rental & Event Services', short: 'Décor Rental', icon: 'tent', groups: ['custom','hospitality'],
    blurb: 'Rent candle, floral, table and backdrop décor for weddings, corporate events, hotel functions and seasonal retail displays.',
    b2c: [],
    b2b: ['Event Décor Rental','Wedding Décor Rental','Floral Installation Rental','Candle Décor Rental','Table Décor Rental','Backdrop Rental','Corporate Event Décor','Hotel Event Décor','Seasonal Display Rental','Retail/Mall Display Rental'] }
];

export const INDUSTRIES: Industry[] = [
  { name: 'Hotels & Resorts', short: 'Hotels & Resorts', icon: 'hotel', items: ['Room candles & signature fragrance','Lobby florals & planters','Wall art & reception styling','Festival & event décor'], open: 11 },
  { name: 'Restaurants & Cafés', short: 'Restaurants', icon: 'coffee', items: ['Table centerpieces & candles','Floral & planter décor','Wall art & interior accents','Seasonal refreshes'], open: 6 },
  { name: 'Corporate Offices', short: 'Offices', icon: 'building-2', items: ['Reception & lobby styling','Branding & logo walls','Employee & client gifting','Festival office décor'], open: 8 },
  { name: 'Spas & Salons', short: 'Spas & Salons', icon: 'flower', items: ['Spa & salon candles','Signature spa fragrance','Calming floral décor','Salon & spa interiors'], open: 1 },
  { name: 'Weddings & Event Planners', short: 'Event Planners', icon: 'party-popper', items: ['Stage, entrance & backdrops','Centerpieces & favours','Candle & floral rentals','Custom event installations'], open: 9 },
  { name: 'Retail, Malls & Showrooms', short: 'Retail & Malls', icon: 'store', items: ['Store & showroom décor','Festival mall installations','Retail display planters','Seasonal display rental'], open: 10 },
  { name: 'Interior Designers', short: 'Interior Designers', icon: 'drafting-compass', items: ['Custom orders to spec','Large-scale wall installations','Custom planter designs','Exclusive collections'], open: 5 },
  { name: 'Brands & Private Label', short: 'Private Label', icon: 'package', items: ['Private label candles','Private label fragrance','OEM & bulk manufacturing','Custom logo products'], open: 14 }
];

export const PROCESS: Step[] = [
  { n: '01', t: 'Consult', icon: 'message-circle', d: 'Share your space, brand, occasion, quantities and timeline. We map the brief to the right collections and finishes.' },
  { n: '02', t: 'Design & sample', icon: 'palette', d: 'Moodboards, colours, fragrances and materials — with samples for approval before a single batch is made.' },
  { n: '03', t: 'Handcraft & produce', icon: 'hand', d: 'Your approved sample is made by hand or scaled through private-label and OEM production, batch by batch.' },
  { n: '04', t: 'Deliver & style', icon: 'truck', d: 'Carefully packed and delivered — and for projects and events, installed and styled on site.' }
];

export const FESTIVALS: Festival[] = [
  { n: 'Diwali', icon: 'flame', line: 'Diyas, festive candles & gifting', g: ['#F6D9B8','#D9955F'] },
  { n: 'Navratri', icon: 'sun', line: 'Colour-rich florals & festive décor', g: ['#F5D4C8','#C9786B'] },
  { n: 'Christmas', icon: 'trees', line: 'Wreaths, candles & festive tables', g: ['#EAD9C8','#9C6B4E'] },
  { n: 'New Year', icon: 'star', line: 'Sparkle décor for homes & offices', g: ['#F3E3D1','#B8906F'] },
  { n: 'Holi', icon: 'palette', line: 'Joyful colour for homes & tables', g: ['#F7D8D8','#D3877D'] },
  { n: 'Raksha Bandhan', icon: 'gift', line: 'Personalised sibling gift sets', g: ['#F6E0CF','#C48B67'] },
  { n: "Valentine's", icon: 'heart', line: 'Couple gifts & candlelit décor', g: ['#F4D2CC','#B96A62'] },
  { n: 'Halloween', icon: 'ghost', line: 'Playful seasonal displays', g: ['#EBD8C8','#8A5A3B'] }
];

export const WHY: Reason[] = [
  { icon: 'hand', t: 'Handcrafted detail', d: 'Hand-poured, hand-shaped and hand-finished pieces — each carrying the quiet imperfections of real craft.' },
  { icon: 'pen-tool', t: 'Made to your brief', d: 'Colours, sizes, names, fragrances and logos — customised from a single gift to an exclusive hotel collection.' },
  { icon: 'hotel', t: 'Hospitality-grade finish', d: 'Designed for guest-facing spaces — lobbies, rooms, tables and receptions that are seen by everyone.' },
  { icon: 'layers', t: 'One partner, fifteen collections', d: 'Candles, florals, resin, art, gifting and events under one roof — one brief, one quality standard.' },
  { icon: 'package', t: 'Sample to scale', d: 'Start with samples, then move to bulk, private-label or OEM production without changing partners.' },
  { icon: 'shield-check', t: 'End-to-end service', d: 'Consultation, production, delivery, installation and rental — so your team can focus on your guests.' }
];

/* Occasions → curated items from the collections (catId, exact item name) */
const OCCASION_DEFS: OccasionDef[] = [
  { id: 'diwali', group: 'Festivals', name: 'Diwali', icon: 'flame', open: [10, 'b2c'], blurb: 'Festive candles, garlands, pooja décor and gifting for the festival of lights.',
    home: [[10,'Diwali Décor'],[1,'Festival & Seasonal Candles'],[1,'Floating Candles'],[1,'Tea Light Candles'],[2,'Floral Garlands'],[13,'Pooja Room Décor'],[8,'Festival Gifts'],[13,'Festive Home Styling']],
    biz: [[8,'Festival Corporate Hampers'],[10,'Hotel Festival Décor'],[10,'Office Festival Décor'],[10,'Mall Décor'],[10,'Retail Store Décor'],[15,'Seasonal Display Rental']] },
  { id: 'navratri', group: 'Festivals', name: 'Navratri', icon: 'sun', open: [10, 'b2c'], blurb: 'Colour-rich florals, garlands and stage décor for nine nights of celebration.',
    home: [[10,'Navratri Décor'],[2,'Floral Garlands'],[2,'Wall Floral Décor'],[1,'Decorative Candles'],[13,'Pooja Room Décor'],[10,'Seasonal Floral Décor']],
    biz: [[10,'Event Festival Installations'],[9,'Stage Décor'],[9,'Backdrop Décor'],[2,'Stage & Background Floral Décor'],[15,'Event Décor Rental'],[10,'Corporate Festival Décor']] },
  { id: 'christmas', group: 'Festivals', name: 'Christmas', icon: 'trees', open: [10, 'b2c'], blurb: 'Wreaths, candlelight and festive tables — at home, in the lobby and on the shop floor.',
    home: [[10,'Christmas Décor'],[2,'Wreaths'],[1,'Pillar Candles'],[6,'Table Centerpieces'],[8,'Festival Gifts'],[1,'Gift Candle Sets']],
    biz: [[10,'Hotel Festival Décor'],[10,'Restaurant Festival Décor'],[10,'Mall Décor'],[8,'Client Gifts'],[15,'Seasonal Display Rental']] },
  { id: 'newyear', group: 'Festivals', name: 'New Year', icon: 'star', open: [10, 'b2c'], blurb: 'Sparkling tables, candles and gifting to welcome the year in style.',
    home: [[10,'New Year Décor'],[1,'Designer Candles'],[6,'Table Centerpieces'],[11,'Fragrance Gift Sets']],
    biz: [[8,'Client Gifts'],[8,'Employee Gifts'],[10,'Corporate Festival Décor'],[15,'Corporate Event Décor'],[10,'Event Festival Installations']] },
  { id: 'holi', group: 'Festivals', name: 'Holi', icon: 'palette', open: [10, 'b2c'], blurb: 'Joyful colour for homes, tables and festive gatherings.',
    home: [[10,'Holi Décor'],[2,'Paper Flowers'],[6,'Table Runners'],[8,'Festival Gifts']],
    biz: [[10,'Restaurant Festival Décor'],[10,'Office Festival Décor'],[10,'Event Festival Installations']] },
  { id: 'rakhi', group: 'Festivals', name: 'Raksha Bandhan', icon: 'gift', open: [10, 'b2c'], blurb: 'Personalised gift sets and keepsakes for brothers and sisters.',
    home: [[10,'Raksha Bandhan Décor'],[8,'Personalized Gifts'],[3,'Personalized Resin Gifts'],[1,'Personalized Candles'],[14,'Custom Gift Sets']],
    biz: [[8,'Festival Corporate Hampers'],[8,'Dealer & Distributor Gifts'],[8,'Bulk Customized Gifts']] },
  { id: 'valentine', group: 'Festivals', name: "Valentine's", icon: 'heart', open: [10, 'b2c'], blurb: 'Couple gifts, everlasting roses and candlelit settings.',
    home: [[10,"Valentine's Décor"],[8,'Couple Gifts'],[1,'Flower Candles'],[2,'Artificial Flower Bouquets'],[3,'Personalized Resin Gifts'],[11,'Fragrance Gift Sets']],
    biz: [[10,'Restaurant Festival Décor'],[10,'Hotel Festival Décor'],[10,'Retail Store Décor']] },
  { id: 'halloween', group: 'Festivals', name: 'Halloween', icon: 'ghost', open: [10, 'b2c'], blurb: 'Playful seasonal pieces and themed displays.',
    home: [[10,'Halloween Décor'],[1,'Decorative Candles'],[12,'Paper Craft']],
    biz: [[10,'Mall Décor'],[10,'Restaurant Festival Décor'],[15,'Seasonal Display Rental']] },

  { id: 'wedding', group: 'Celebrations', name: 'Weddings', icon: 'heart-handshake', open: [9, 'b2c'], blurb: 'From favours and return gifts to stage, entrance and table décor.',
    home: [[9,'Wedding Favors'],[9,'Personalized Wedding Décor'],[9,'Return Gifts'],[8,'Wedding Gifts'],[9,'Candle Décor'],[9,'Floral Décor']],
    biz: [[9,'Wedding Planners'],[9,'Banquet Halls'],[9,'Stage Décor'],[9,'Entrance Décor'],[6,'Wedding Table Décor'],[1,'Wedding & Event Candles'],[2,'Wedding & Event Flowers'],[15,'Wedding Décor Rental']] },
  { id: 'engagement', group: 'Celebrations', name: 'Engagements', icon: 'gem', open: [9, 'b2c'], blurb: 'Romantic florals, candles and personalised keepsakes.',
    home: [[9,'Engagement Décor'],[8,'Couple Gifts'],[1,'Personalized Candles'],[2,'Flower Arrangements']],
    biz: [[9,'Event Planners'],[9,'Centerpieces'],[15,'Floral Installation Rental'],[15,'Backdrop Rental']] },
  { id: 'anniversary', group: 'Celebrations', name: 'Anniversaries', icon: 'heart', open: [9, 'b2c'], blurb: 'Photo gifts, resin keepsakes and candlelit décor for milestones.',
    home: [[9,'Anniversary Décor'],[8,'Anniversary Gifts'],[3,'Resin Photo Frames'],[8,'Photo Gifts']],
    biz: [[9,'Hotels'],[9,'Resorts'],[15,'Candle Décor Rental']] },
  { id: 'birthday', group: 'Celebrations', name: 'Birthdays', icon: 'party-popper', open: [9, 'b2c'], blurb: 'Theme décor, gifts and return gifts for every age.',
    home: [[9,'Birthday Décor'],[8,'Birthday Gifts'],[9,'Return Gifts'],[14,'Theme-Based Décor']],
    biz: [[9,'Event Agencies'],[15,'Table Décor Rental'],[15,'Backdrop Rental']] },
  { id: 'babyshower', group: 'Celebrations', name: 'Baby Showers', icon: 'baby', open: [9, 'b2c'], blurb: 'Soft florals, theme décor and thoughtful return gifts.',
    home: [[9,'Baby Shower Décor'],[9,'Return Gifts'],[14,'Theme-Based Décor'],[2,'Mini Floral Décor']],
    biz: [[9,'Event Planners'],[15,'Event Décor Rental']] },
  { id: 'housewarming', group: 'Celebrations', name: 'Housewarming', icon: 'house', open: [8, 'b2c'], blurb: 'Gifts and styling that make a new house feel like home.',
    home: [[8,'Housewarming Gifts'],[13,'Room Décor Packages'],[7,'Decorative Planters'],[11,'Reed Diffusers'],[4,'Showpieces']],
    biz: [[8,'Client Gifts'],[8,'Dealer & Distributor Gifts']] },

  { id: 'corporate', group: 'Corporate & venues', name: 'Corporate Events', icon: 'briefcase', open: [15, 'b2b'], blurb: 'Event décor, awards and branded gifting for conferences, launches and annual days.',
    home: [], biz: [[15,'Corporate Event Décor'],[9,'Custom Event Installations'],[2,'Corporate Floral Décor'],[3,'Customized Awards & Plaques'],[8,'Award & Recognition Gifts'],[8,'Welcome Kits']] },
  { id: 'onboarding', group: 'Corporate & venues', name: 'Employee Gifting', icon: 'award', open: [8, 'b2b'], blurb: 'Joining kits, recognition gifts and logo-branded keepsakes for your people.',
    home: [], biz: [[8,'Employee Joining Kits'],[8,'Welcome Kits'],[8,'Employee Gifts'],[8,'Award & Recognition Gifts'],[3,'Customized Awards & Plaques'],[14,'Custom Logo Products']] },
  { id: 'venue', group: 'Corporate & venues', name: 'Hotel & Venue Events', icon: 'hotel', open: [15, 'b2b'], blurb: 'Banquet tables, lobby florals and signature scent for functions of every size.',
    home: [], biz: [[15,'Hotel Event Décor'],[6,'Banquet Table Décor'],[6,'Event Table Centerpieces'],[2,'Hotel Lobby Floral Décor'],[11,'Lobby Fragrance']] },
  { id: 'retail', group: 'Corporate & venues', name: 'Store Launches', icon: 'store', open: [15, 'b2b'], blurb: 'Window, display and seasonal décor for stores, malls and showrooms.',
    home: [], biz: [[15,'Retail/Mall Display Rental'],[2,'Retail Store Displays'],[7,'Retail Display Planters'],[12,'Retail Display Décor'],[10,'Mall Décor']] }
];

export const MATERIALS: string[] = ['Soy Wax','Beeswax','Crepe Paper','Ocean Resin','Macramé','Reed Diffusers','Botanical Art','Wax Melts','Fabric Florals','Floating Candles','3D Wall Art','Upcycled Décor','Signature Fragrance','Floral Resin'];


export const catById = (id: number) => CATEGORIES.find((c) => c.id === id)!;

// Keep only occasion picks that exist in the collection lists (guards against typos).
export const OCCASIONS: Occasion[] = OCCASION_DEFS.map((o) => ({
  ...o,
  home: o.home.filter(([id, n]) => catById(id)?.b2c.includes(n)),
  biz: o.biz.filter(([id, n]) => catById(id)?.b2b.includes(n)),
}));

export const TOTAL_B2C = CATEGORIES.reduce((a, c) => a + c.b2c.length, 0);
export const TOTAL_B2B = CATEGORIES.reduce((a, c) => a + c.b2b.length, 0);
export const TOTAL = TOTAL_B2C + TOTAL_B2B;

export const FILTERS: { key: 'all' | GroupKey; label: string }[] = [
  { key: 'all', label: 'All collections' },
  { key: 'home', label: 'Home & Living' },
  { key: 'hospitality', label: 'Hospitality & Corporate' },
  { key: 'gifting', label: 'Gifts & Celebrations' },
  { key: 'custom', label: 'Bespoke & Services' },
];

// TODO: replace with real Havenza contact details
export const CONTACT = { email: 'hello@havenza.in', phone: '+91 00000 00000', tel: '+910000000000', location: 'India' };

export const pad = (n: number) => String(n).padStart(2, '0');
