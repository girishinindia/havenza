/* Havenza — content model for the home page.
   Edit collections, industries and occasions here; every section and menu reads from this file. */

export type Segment = 'b2c' | 'b2b';
export type GroupKey = 'home' | 'hospitality' | 'gifting' | 'custom' | 'craft';

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
    b2c: ['Scented Candles','Soy Wax Candles','Beeswax Candles','Decorative Candles','Designer Candles','Flower Candles','Pillar Candles','Jar Candles','Floating Candles','Tea Light Candles','Aroma Candles','Personalized Candles','Festival & Seasonal Candles','Gift Candle Sets','Candle Holders','Gel Candles','Dessert Candles','Sculpted & Bubble Candles','Taper Candles','Votive Candles'],
    b2b: ['Hotel Room Candles','Restaurant & Café Candles','Spa & Salon Candles','Corporate Gift Candles','Wedding & Event Candles','Custom Branded Candles','Bulk Candle Supply','Private Label Candle Manufacturing','Hospitality Fragrance Collections','Custom Mould Candles'] },
  { id: 2, title: 'Artificial Flowers & Floral Décor', short: 'Floral Décor', icon: 'flower-2', groups: ['home','hospitality','gifting'],
    blurb: 'Everlasting paper, crepe, fabric and foam florals — from bouquets and wreaths to lobby arrangements and stage installations.',
    b2c: ['Paper Flowers','Crepe Paper Flowers','Fabric Flowers','Foam Flowers','Artificial Flower Bouquets','Decorative Leaves','Floral Garlands','Flower Arrangements','Table Floral Décor','Wall Floral Décor','Wreaths','Mini Floral Décor','Seasonal Floral Collections'],
    b2b: ['Hotel Lobby Floral Décor','Reception Floral Arrangements','Restaurant & Café Floral Décor','Office Floral Décor','Wedding & Event Flowers','Retail Store Displays','Stage & Background Floral Décor','Custom Large Floral Installations','Corporate Floral Décor','Bulk Floral Supply'] },
  { id: 3, title: 'Resin Art & Resin Décor', short: 'Resin Art', icon: 'gem', groups: ['home','gifting','custom','craft'],
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
    b2c: ['Decorative Vases','Resin Vases','Ceramic-Style Décor','Handmade Pots','Decorative Planters','Mini Planters','Tabletop Planters','Wall Planters','Artificial Plant Arrangements','Concrete & Jesmonite Planters'],
    b2b: ['Hotel Lobby Planters','Office Planters','Restaurant Planters','Retail Display Planters','Large Decorative Planters','Custom Planter Designs','Bulk Commercial Supply'] },
  { id: 8, title: 'Gift & Personalized Décor', short: 'Gifts & Personalised', icon: 'gift', groups: ['gifting','custom'],
    blurb: 'Name plates, photo gifts and curated décor sets — and corporate hampers, welcome kits and recognition gifts at scale.',
    b2c: ['Personalized Gifts','Name Plates','Photo Gifts','Anniversary Gifts','Birthday Gifts','Wedding Gifts','Housewarming Gifts','Festival Gifts','Couple Gifts','Customized Décor Sets','Return Gifts','Luxury Gift Boxes','Hamper Boxes'],
    b2b: ['Corporate Gifts','Employee Gifts','Client Gifts','Dealer & Distributor Gifts','Festival Corporate Hampers','Welcome Kits','Employee Joining Kits','Award & Recognition Gifts','Branded Promotional Gifts','Bulk Customized Gifts','Custom Packaging & Hamper Design'] },
  { id: 9, title: 'Wedding & Event Décor', short: 'Wedding & Events', icon: 'heart-handshake', groups: ['gifting','hospitality'],
    blurb: 'Favours, candle and floral décor for every celebration — and stage, entrance and backdrop décor for planners and venues.',
    b2c: ['Wedding Favors','Table Décor','Candle Décor','Floral Décor','Personalized Wedding Décor','Return Gifts','Engagement Décor','Anniversary Décor','Baby Shower Décor','Birthday Décor'],
    b2b: ['Wedding Planners','Event Planners','Banquet Halls','Hotels','Resorts','Event Agencies','Stage Décor','Entrance Décor','Backdrop Décor','Centerpieces','Custom Event Installations'] },
  { id: 10, title: 'Seasonal & Festival Décor', short: 'Seasonal & Festival', icon: 'sparkles', groups: ['gifting','home','hospitality'],
    blurb: 'Diwali to Christmas, Navratri to Valentine’s — festive collections for homes, hotels, offices, malls and retail.',
    b2c: ['Diwali Décor','Christmas Décor','New Year Décor','Navratri Décor','Holi Décor','Raksha Bandhan Décor',"Valentine's Décor",'Halloween Décor','Festive Candles','Seasonal Floral Décor','Diyas','Designer Diyas','Pooja Thali Sets','Torans','Rangoli Décor','Kalash Décor'],
    b2b: ['Hotel Festival Décor','Office Festival Décor','Restaurant Festival Décor','Mall Décor','Retail Store Décor','Corporate Festival Décor','Event Festival Installations','Bulk Festive Diyas','Corporate Diwali Kits'] },
  { id: 11, title: 'Fragrance & Aroma Products', short: 'Fragrance & Aroma', icon: 'wind', groups: ['home','hospitality','custom'],
    blurb: 'Reed diffusers, wax melts and aroma décor — and signature room, lobby and spa scents under your own label.',
    b2c: ['Home Fragrance','Aroma Wax','Fragrance Candles','Wax Melts','Reed Diffusers','Aroma Décor','Fragrance Gift Sets','Wax Sachets','Scented Wax Tablets','Wardrobe & Car Fresheners'],
    b2b: ['Hotel Room Fragrance','Lobby Fragrance','Spa Fragrance','Restaurant Fragrance','Office Fragrance','Signature Hotel Fragrance','Private Label Fragrance Products','Branded Wax Sachets'] },
  { id: 12, title: 'Handmade Craft Décor', short: 'Handmade Craft', icon: 'scissors', groups: ['home','custom','craft'],
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
    b2b: ['Event Décor Rental','Wedding Décor Rental','Floral Installation Rental','Candle Décor Rental','Table Décor Rental','Backdrop Rental','Corporate Event Décor','Hotel Event Décor','Seasonal Display Rental','Retail/Mall Display Rental'] },
  { id: 16, title: 'Handmade Soap & Bath', short: 'Soap & Bath', icon: 'droplets', groups: ['home','hospitality','gifting','craft'],
    blurb: 'Melt & pour, cold and hot process soaps — botanical bars and gift sets for the home, guest and spa soaps for hospitality.',
    b2c: ['Handmade Soaps','Melt & Pour Soaps','Cold Process Soaps','Hot Process Soaps','Botanical & Herbal Soaps','Gift Soap Sets','Wedding Favour Soaps','Festive Soaps','Soap Dishes & Trays'],
    b2b: ['Hotel Guest Soaps','Spa & Salon Soaps','Private Label Soaps','Corporate Gift Soaps','Wedding & Event Favour Soaps','Bulk Soap Supply'] },
  { id: 17, title: 'Concrete & Jesmonite Décor', short: 'Concrete & Jesmonite', icon: 'box', groups: ['home','hospitality','custom','craft'],
    blurb: 'Minimal cast vessels, planters and trays in concrete and Jesmonite — terrazzo, marbled and pastel finishes.',
    b2c: ['Concrete Planters','Jesmonite Planters','Candle Vessels','Trays','Coasters','Bowls','Incense Holders','Bookends','Terrazzo Décor','Décor Objects'],
    b2b: ['Hotel & Café Planters','Custom Logo Trays','Branded Candle Vessels','Retail Display Pieces','Bulk Concrete Décor','Interior Designer Custom Pieces'] },
  { id: 18, title: 'Craft Supplies, Moulds & DIY Kits', short: 'Supplies & DIY Kits', icon: 'package-open', groups: ['craft','custom'],
    blurb: 'Everything our students and makers use — DIY kits, silicone moulds, waxes, soap bases, resin and fragrance oils.',
    b2c: ['Candle Making Kits','Soap Making Kits','Resin Art Kits','Concrete & Jesmonite Kits','Silicone Moulds','Candle Waxes','Soap Bases','Fragrance Oils','Pigments & Micas','Wicks & Tools'],
    b2b: ['Bulk Raw Materials','Custom Silicone Moulds','3D-Printed Masters','Workshop Kits for Institutes','Wholesale for Makers'] },
];

export const INDUSTRIES: Industry[] = [
  { name: 'Hotels & Resorts', short: 'Hotels & Resorts', icon: 'hotel', items: ['Room candles & signature fragrance','Lobby florals & planters','Wall art & reception styling','Festival & event décor'], open: 11 },
  { name: 'Restaurants & Cafés', short: 'Restaurants', icon: 'coffee', items: ['Table centerpieces & candles','Floral & planter décor','Wall art & interior accents','Seasonal refreshes'], open: 6 },
  { name: 'Corporate Offices', short: 'Offices', icon: 'building-2', items: ['Reception & lobby styling','Branding & logo walls','Employee & client gifting','Festival office décor'], open: 8 },
  { name: 'Spas & Salons', short: 'Spas & Salons', icon: 'flower', items: ['Spa & salon candles','Signature spa fragrance','Calming floral décor','Salon & spa interiors'], open: 1 },
  { name: 'Weddings & Event Planners', short: 'Event Planners', icon: 'party-popper', items: ['Stage, entrance & backdrops','Centerpieces & favours','Candle & floral rentals','Custom event installations'], open: 9 },
  { name: 'Retail, Malls & Showrooms', short: 'Retail & Malls', icon: 'store', items: ['Store & showroom décor','Festival mall installations','Retail display planters','Seasonal display rental'], open: 10 },
  { name: 'Interior Designers', short: 'Interior Designers', icon: 'drafting-compass', items: ['Custom orders to spec','Large-scale wall installations','Custom planter designs','Exclusive collections'], open: 5 },
  { name: 'Brands & Private Label', short: 'Private Label', icon: 'package', items: ['Private label candles','Private label fragrance','OEM & bulk manufacturing','Custom logo products'], open: 14 },
  { name: 'Makers & Craft Brands', short: 'Makers & Brands', icon: 'palette', items: ['Craft supplies & DIY kits','Custom moulds & 3D masters','Private label soaps & candles','Product photography'], open: 18 }
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

export const MATERIALS: string[] = ['Soy Wax','Beeswax','Crepe Paper','Ocean Resin','Macramé','Reed Diffusers','Botanical Art','Wax Melts','Fabric Florals','Floating Candles','3D Wall Art','Upcycled Décor','Signature Fragrance','Floral Resin','Jesmonite','Cold Process Soap','Silicone Moulds','Gel Wax','Terrazzo'];


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
  { key: 'craft', label: 'Craft & DIY' },
];

// TODO: replace with real Havenza contact details
export const CONTACT = { email: 'hello@havenza.in', phone: '+91 00000 00000', tel: '+910000000000', location: 'India' };

export const pad = (n: number) => String(n).padStart(2, '0');


/* ================= Courses (Havenza Studio) & Services ================= */

export type CourseFormat = 'studio' | 'online' | 'kids' | 'pro';
export type CourseTrack = 'mega' | 'craft' | 'business' | 'workshop';

export const COURSE_FORMATS: { key: CourseFormat; label: string; short: string; icon: string; line: string }[] = [
  { key: 'studio', label: 'Studio workshops', short: 'Studio', icon: 'hand', line: 'Hands-on, one-day & weekend classes' },
  { key: 'online', label: 'Online courses', short: 'Online', icon: 'laptop', line: 'Live & recorded, learn at your pace' },
  { key: 'kids', label: 'Kids & hobby classes', short: 'Kids & hobby', icon: 'smile', line: 'Short, fun sessions & craft parties' },
  { key: 'pro', label: 'Business / pro training', short: 'Pro', icon: 'graduation-cap', line: 'Certificate courses & team workshops' },
];

export const COURSE_TRACKS: { key: CourseTrack; label: string }[] = [
  { key: 'mega', label: 'Mega courses · certificate' },
  { key: 'craft', label: 'Craft & décor courses' },
  { key: 'business', label: 'Business & skills' },
  { key: 'workshop', label: 'Workshops' },
];

/** Who a course or service is for: public (B2C) and/or business (B2B). */
export const AUDIENCE_LABEL: Record<Segment, string> = { b2c: 'For you', b2b: 'For business' };

export interface Course {
  id: string; name: string; short: string; icon: string; track: CourseTrack; for: Segment[]; level: string; duration: string;
  formats: CourseFormat[]; blurb: string; modules: string[]; related: number; // related collection id
}

// TODO: confirm course names, durations and formats with the Havenza team
export const COURSES: Course[] = [
  /* ---- Mega courses ---- */
  { id: 'candle', name: 'Wax Candle Making Mega Course', short: 'Wax Candle Mega', icon: 'flame', track: 'mega', for: ['b2c', 'b2b'], level: 'Beginner → Pro · Certificate', duration: '4 – 6 weeks', formats: ['studio', 'online', 'pro'], related: 1,
    blurb: 'Everything in wax — soy, paraffin, beeswax and gel — from jars and pillars to sculpted, dessert and designer candles.',
    modules: ['Soy, paraffin, beeswax & gel wax', 'Wick sizing & burn testing', 'Fragrance loads & blending', 'Colour, layering & effects', 'Container, pillar, votive & taper', 'Floating, flower & sculpted candles', 'Dessert & bubble candles', 'Troubleshooting defects', 'Finishing, labelling & packaging', 'Costing & pricing'] },
  { id: 'mould', name: 'Mould Making for Candles Mega Course', short: 'Mould Making Mega', icon: 'layers', track: 'mega', for: ['b2c', 'b2b'], level: 'Intermediate → Pro · Certificate', duration: '3 – 5 weeks', formats: ['studio', 'online', 'pro'], related: 18,
    blurb: 'Design and pour your own silicone moulds — the skill behind every signature candle, resin and concrete piece.',
    modules: ['Silicone types & shore hardness', 'Making & preparing masters', 'One-part block moulds', 'Two-part & cut moulds', 'Brush-on & glove moulds', 'Release agents & degassing', 'Moulds for resin & concrete', 'Care, storage & repairs'] },
  { id: 'soap', name: 'Soap Making Mega Course', short: 'Soap Making Mega', icon: 'droplets', track: 'mega', for: ['b2c', 'b2b'], level: 'Beginner → Pro · Certificate', duration: '4 – 6 weeks', formats: ['studio', 'online', 'pro'], related: 16,
    blurb: 'Melt & pour, cold process and hot process soap — recipes, safety, design and curing for gifts or a soap brand.',
    modules: ['Melt & pour soap', 'Cold process soap', 'Hot process soap', 'Lye safety & handling', 'Oils, butters & recipe calculation', 'Colours, swirls & embeds', 'Botanicals & fragrance', 'Curing, cutting & stamping', 'Packaging & labelling'] },
  { id: 'resin', name: 'Resin Art Mega Course', short: 'Resin Art Mega', icon: 'gem', track: 'mega', for: ['b2c', 'b2b'], level: 'Beginner → Pro · Certificate', duration: '4 – 6 weeks', formats: ['studio', 'online', 'pro'], related: 3,
    blurb: 'Coasters, trays, jewellery and resin décor — with safe, professional technique from first pour to finished piece.',
    modules: ['Resin safety & tools', 'Mixing, pigments & bubbles', 'Coasters & trays', 'Resin jewellery & keychains', 'Ocean & wave art', 'Flower preservation', 'Clocks, panels & wall art', 'Large pours & décor pieces', 'Sanding, polish & finish'] },

  /* ---- Craft & décor ---- */
  { id: 'concrete', name: 'Concrete & Jesmonite Décor Course', short: 'Concrete & Jesmonite', icon: 'box', track: 'craft', for: ['b2c', 'b2b'], level: 'Beginner → Intermediate', duration: '1 – 3 weeks', formats: ['studio', 'online', 'pro'], related: 17,
    blurb: 'Cast vessels, planters, trays and home décor in concrete and Jesmonite — terrazzo, marbled and pastel finishes.',
    modules: ['Concrete vs Jesmonite', 'Moulds for casting', 'Mixing & pigments', 'Candle vessels & planters', 'Trays, coasters & bowls', 'Terrazzo & marbling', 'Demoulding & sanding', 'Sealing & waterproofing'] },
  { id: 'sachet', name: 'Wax Sachet & Scented Décor Course', short: 'Wax Sachets', icon: 'flower', track: 'craft', for: ['b2c'], level: 'Beginner', duration: '1 day – 1 week', formats: ['studio', 'online', 'kids'], related: 11,
    blurb: 'Botanical wax sachets and scented décor for wardrobes, cars and gifting.',
    modules: ['Waxes for sachets', 'Dried flowers & botanicals', 'Scent strength & safety', 'Wardrobe & car sachets', 'Scented wax tablets', 'Gift packs & tags'] },
  { id: 'aroma', name: 'Aroma & Home Fragrance', short: 'Aroma & Fragrance', icon: 'wind', track: 'craft', for: ['b2c', 'b2b'], level: 'Beginner → Intermediate', duration: '1 day – 2 weeks', formats: ['studio', 'online', 'pro'], related: 11,
    blurb: 'Blend signature scents and make reed diffusers, wax melts and aroma décor.',
    modules: ['Fragrance notes & families', 'Blending a signature scent', 'Reed diffusers', 'Wax melts & aroma wax', 'Room & linen sprays', 'Gift sets & labelling'] },
  { id: 'paperflowers', name: 'Paper & Crepe Flowers', short: 'Paper Flowers', icon: 'flower-2', track: 'craft', for: ['b2c'], level: 'Beginner → Intermediate', duration: '1 day – 2 weeks', formats: ['studio', 'online', 'kids'], related: 2,
    blurb: 'Everlasting paper, crepe and giant flowers for bouquets, walls and backdrops.',
    modules: ['Paper & crepe essentials', 'Roses, peonies & lilies', 'Leaves & stems', 'Bouquets & arrangements', 'Giant backdrop flowers', 'Wall floral décor'] },
  { id: 'floral', name: 'Floral Arrangement & Styling', short: 'Floral Styling', icon: 'flower', track: 'craft', for: ['b2c', 'b2b'], level: 'All levels', duration: '1 day – 3 weeks', formats: ['studio', 'online', 'pro'], related: 2,
    blurb: 'Design table, wall and event arrangements with fabric, foam and artificial florals.',
    modules: ['Colour & form', 'Table centrepieces', 'Wreaths & garlands', 'Reception & lobby arrangements', 'Wedding & stage florals', 'Care & display'] },
  { id: 'macrame', name: 'Macramé & Rope Craft', short: 'Macramé', icon: 'scissors', track: 'craft', for: ['b2c'], level: 'Beginner → Intermediate', duration: '1 day – 2 weeks', formats: ['studio', 'online', 'kids'], related: 12,
    blurb: 'Knot wall hangings, plant hangers and rope décor for calm, textured spaces.',
    modules: ['Core knots', 'Wall hangings', 'Plant hangers', 'Rope baskets & trays', 'Upcycled rope décor'] },
  { id: 'wallart', name: 'Wall Art & Mixed Media', short: 'Wall Art', icon: 'frame', track: 'craft', for: ['b2c'], level: 'All levels', duration: '1 day – 3 weeks', formats: ['studio', 'online'], related: 5,
    blurb: 'Create texture, 3D, botanical and typography art for homes and commercial walls.',
    modules: ['Texture & 3D art', 'Botanical art', 'Abstract composition', 'Typography art', 'Floral & resin wall art', 'Framing & hanging'] },
  { id: 'festive', name: 'Diya, Pooja & Festive Craft Course', short: 'Diya & Pooja Craft', icon: 'sparkles', track: 'craft', for: ['b2c', 'b2b'], level: 'All levels', duration: '2 hours – 2 weeks', formats: ['studio', 'online', 'kids'], related: 10,
    blurb: 'Diyas, pooja thalis, torans and festive décor — make it, gift it, or sell it before every festival.',
    modules: ['Diya painting & decoration', 'Wax & gel diyas', 'Pooja thali decoration', 'Torans & door hangings', 'Rangoli & kalash décor', 'Rakhi making', 'Christmas wreaths', 'Festive gift packs'] },

  /* ---- Business & skills ---- */
  { id: 'business', name: 'Handmade Business & Online Selling Course', short: 'Handmade Business', icon: 'briefcase', track: 'business', for: ['b2c', 'b2b'], level: 'Certificate', duration: '4 – 8 weeks', formats: ['pro', 'online', 'studio'], related: 14,
    blurb: 'Turn your craft into a business — branding, pricing, Instagram and marketplaces, through to bulk and B2B orders.',
    modules: ['Product range planning', 'Branding & packaging', 'Costing & pricing', 'Instagram & social selling', 'Marketplaces (Amazon, Etsy, Meesho)', 'Own website & WhatsApp orders', 'GST & business basics', 'Bulk & B2B orders', 'Certificate & mentoring'] },
  { id: 'photo', name: 'Product Photography for Handmade Products', short: 'Product Photography', icon: 'camera', track: 'business', for: ['b2c', 'b2b'], level: 'Beginner → Intermediate', duration: '1 day – 2 weeks', formats: ['studio', 'online', 'pro'], related: 14,
    blurb: 'Scroll-stopping photos with a phone or camera — lighting, styling and editing for Instagram and marketplaces.',
    modules: ['Phone & camera setup', 'Natural & studio lighting', 'Props, backdrops & styling', 'Flat lays & lifestyle shots', 'Marketplace-ready photos', 'Editing & consistency', 'Short videos & reels'] },
  { id: 'print3d', name: '3D Design & Printing for Crafts Course', short: '3D Design & Printing', icon: 'printer', track: 'business', for: ['b2c', 'b2b'], level: 'Intermediate', duration: '3 – 5 weeks', formats: ['studio', 'online', 'pro'], related: 18,
    blurb: 'Design and 3D-print masters for moulds — create your own unique candle, resin and concrete shapes.',
    modules: ['3D design basics (CAD)', 'Designing masters for moulds', 'Slicing & printer settings', 'Printing & finishing masters', 'From print to silicone mould', 'Designing custom logo pieces'] },
  { id: 'hampers', name: 'Gift Hamper & Luxury Packaging Course', short: 'Hampers & Packaging', icon: 'gift', track: 'business', for: ['b2c', 'b2b'], level: 'Beginner → Pro', duration: '1 day – 2 weeks', formats: ['studio', 'online', 'pro'], related: 8,
    blurb: 'Curate, box and brand luxury hampers for festivals, weddings and corporate clients.',
    modules: ['Hamper curation', 'Rigid & luxury boxes', 'Wrapping, ribbons & fillers', 'Branding & custom tags', 'Wedding & return gifts', 'Corporate hampers at scale', 'Costing & pricing'] },
  { id: 'styling', name: 'Home Styling Essentials', short: 'Home Styling', icon: 'sofa', track: 'business', for: ['b2c'], level: 'All levels', duration: '1 day – 2 weeks', formats: ['studio', 'online'], related: 13,
    blurb: 'Style shelves, tables, mantels and pooja corners like a professional.',
    modules: ['Styling principles', 'Shelf & mantel styling', 'Table & dining styling', 'Pooja room décor', 'Balcony & small spaces', 'Festive home styling'] },

  /* ---- Workshops ---- */
  { id: 'kids', name: 'Kids Craft Club', short: 'Kids Craft Club', icon: 'smile', track: 'workshop', for: ['b2c'], level: 'Ages 6 – 14', duration: '1 – 2 hours', formats: ['kids', 'studio', 'online'], related: 12,
    blurb: 'Playful, safe craft sessions and birthday craft parties for young makers.',
    modules: ['Mini candles', 'Paper craft & flowers', 'Clay & painting', 'Festival crafts', 'Birthday craft parties'] },
  { id: 'teams', name: 'Corporate Team Workshops', short: 'Team Workshops', icon: 'users', track: 'workshop', for: ['b2b'], level: 'Groups of 10 – 200', duration: '2 – 4 hours', formats: ['pro', 'studio'], related: 8,
    blurb: 'On-site or studio team-building sessions — candles, soap, resin or florals, with branded take-aways.',
    modules: ['Candle-making team session', 'Soap-making session', 'Resin coaster workshop', 'Floral styling session', 'Festive décor workshop', 'Branded take-home kits'] },
];

export interface Service { id: string; name: string; short: string; icon: string; for: Segment[]; audience: string; blurb: string; includes: string[]; related: number[] }

export const SERVICES: Service[] = [
  { id: 'bespoke', name: 'Custom & Bespoke Orders', short: 'Custom & Bespoke', icon: 'pen-tool', for: ['b2c', 'b2b'], audience: 'Home & business', related: [14, 8],
    blurb: 'Your colours, sizes, names, photos and themes — one-off pieces or exclusive collections.',
    includes: ['Personalised designs', 'Custom colours & sizes', 'Names, initials & photos', 'Theme-based décor', 'Exclusive collections', 'Sampling before production'] },
  { id: 'oem', name: 'Private Label & OEM', short: 'Private Label & OEM', icon: 'package', for: ['b2b'], audience: 'Brands & retailers', related: [14, 1, 16],
    blurb: 'Your brand on our craft — candles, soaps, fragrance, resin and décor made to your spec.',
    includes: ['Private label candles', 'Private label soaps', 'Private label fragrance', 'OEM manufacturing', 'Custom packaging & labels', 'Bulk production & batch testing'] },
  { id: 'moulds', name: 'Custom Moulds & 3D Masters', short: 'Moulds & 3D Masters', icon: 'printer', for: ['b2c', 'b2b'], audience: 'Makers & brands', related: [18, 17, 1],
    blurb: 'Signature shapes for your products — 3D-designed masters and production-ready silicone moulds.',
    includes: ['3D design of your shape', '3D-printed masters', 'Silicone mould production', 'Logo & branded moulds', 'Moulds for candles, resin & concrete', 'Small & bulk quantities'] },
  { id: 'gifting', name: 'Corporate Gifting', short: 'Corporate Gifting', icon: 'gift', for: ['b2b'], audience: 'Companies', related: [8, 3, 16],
    blurb: 'Branded gifts for clients, employees and dealers — curated, packed and delivered.',
    includes: ['Festival corporate hampers', 'Employee joining kits', 'Client & dealer gifts', 'Awards & recognition', 'Logo-branded products', 'Pan-India dispatch'] },
  { id: 'packaging', name: 'Packaging & Hamper Design', short: 'Packaging & Hampers', icon: 'package-open', for: ['b2c', 'b2b'], audience: 'Gifting & brands', related: [8, 14],
    blurb: 'Luxury boxes, hamper design and branded packaging that make every product feel premium.',
    includes: ['Luxury & rigid gift boxes', 'Hamper curation & design', 'Branded labels & tags', 'Wedding & festive packaging', 'Eco-friendly options', 'Bulk packing & dispatch'] },
  { id: 'photo', name: 'Product Photography & Catalogue Shoots', short: 'Product Photography', icon: 'camera', for: ['b2c', 'b2b'], audience: 'Makers & brands', related: [14],
    blurb: 'Styled product photos and catalogues for websites, marketplaces and Instagram.',
    includes: ['Styled product photos', 'White-background marketplace shots', 'Lifestyle & flat-lay images', 'Catalogue & lookbook shoots', 'Reels & short videos', 'Editing & retouching'] },
  { id: 'styling', name: 'Interior Styling', short: 'Interior Styling', icon: 'sofa', for: ['b2c', 'b2b'], audience: 'Homes & commercial', related: [13, 4, 5],
    blurb: 'Room-by-room décor styling for homes, and reception, lobby and café styling for businesses.',
    includes: ['Home styling packages', 'Living, bedroom & dining', 'Pooja room décor', 'Reception & lobby styling', 'Café & restaurant styling', 'Showroom & retail styling'] },
  { id: 'hospitality', name: 'Hospitality Supply', short: 'Hospitality Supply', icon: 'hotel', for: ['b2b'], audience: 'Hotels, cafés & spas', related: [1, 16, 11],
    blurb: 'Consistent, repeat supply of room candles, guest soaps, signature fragrance, table décor and florals.',
    includes: ['Hotel room candles', 'Guest & spa soaps', 'Signature scent programme', 'Table & banquet décor', 'Lobby florals & planters', 'Scheduled replenishment'] },
  { id: 'events', name: 'Wedding & Event Décor', short: 'Wedding & Events', icon: 'heart-handshake', for: ['b2c', 'b2b'], audience: 'Couples, planners & venues', related: [9, 2, 6],
    blurb: 'Favours, candles, florals, stage and entrance décor — designed, delivered and set up.',
    includes: ['Stage & backdrop décor', 'Entrance décor', 'Centerpieces & table décor', 'Favours & return gifts', 'Candle & floral décor', 'Custom installations'] },
  { id: 'rental', name: 'Décor Rental', short: 'Décor Rental', icon: 'tent', for: ['b2c', 'b2b'], audience: 'Events & retail', related: [15],
    blurb: 'Rent premium candle, floral, table and backdrop décor — no storage, no fuss.',
    includes: ['Event & wedding décor rental', 'Floral installation rental', 'Candle & table décor rental', 'Backdrop rental', 'Seasonal display rental', 'Delivery, setup & pickup'] },
  { id: 'install', name: 'Installation & Setup', short: 'Installation', icon: 'hammer', for: ['b2b'], audience: 'Projects & venues', related: [5, 2, 4],
    blurb: 'Large wall art, floral installations and décor — installed and styled on site.',
    includes: ['Large-scale wall installations', 'Custom logo walls', 'Floral installations', 'Mall & retail displays', 'On-site styling', 'Interior designer projects'] },
  { id: 'refresh', name: 'Seasonal Décor Refresh', short: 'Seasonal Refresh', icon: 'refresh-cw', for: ['b2b'], audience: 'Offices, malls & hotels', related: [10, 2],
    blurb: 'Festive change-outs for Diwali, Christmas and more — planned, installed and removed.',
    includes: ['Festival décor calendar', 'Office festival décor', 'Hotel & restaurant festive décor', 'Mall & store installations', 'Install & removal', 'Annual refresh contracts'] },
  { id: 'supplies', name: 'Bulk Craft Supplies', short: 'Craft Supplies', icon: 'truck', for: ['b2c', 'b2b'], audience: 'Makers, schools & brands', related: [18],
    blurb: 'Waxes, soap bases, resin, moulds, fragrance oils and DIY kits — for students, makers and institutes.',
    includes: ['DIY kits for every course', 'Silicone moulds', 'Waxes & soap bases', 'Resin & pigments', 'Fragrance oils', 'Wholesale & institute pricing'] },
  { id: 'mentoring', name: 'Maker Business Mentoring', short: 'Business Mentoring', icon: 'graduation-cap', for: ['b2c'], audience: 'New makers & graduates', related: [14],
    blurb: 'One-to-one help to launch your handmade brand — product, pricing, packaging and first sales.',
    includes: ['Product range review', 'Pricing & costing check', 'Brand & packaging feedback', 'Instagram & marketplace setup', 'First bulk order guidance', 'Monthly check-ins'] },
];
