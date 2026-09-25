import {
  ArrowLeft, ArrowRight, GraduationCap, Hammer, Laptop, RefreshCw, Smile, Users, Clock, BarChart3, ArrowUp, ArrowUpRight, Award, Baby, Briefcase, Building2, Check, ChevronDown, ChevronRight,
  Coffee, DraftingCompass, Flame, Flower, Flower2, Frame, Gem, Ghost, Gift, Hand, Heart, HeartHandshake, Hotel, House,
  Lamp, Layers, Mail, MapPin, Menu, MessageCircle, Package, Palette, PartyPopper, PenTool, Phone, Scissors, Search, Send,
  ShieldCheck, ShoppingBag, Sofa, Sparkles, Sprout, Star, Store, Sun, Tent, Trees, Truck, UtensilsCrossed, Wind, X,
  type LucideIcon,
} from 'lucide-react';

/* Only the icons the site uses are imported, so the bundle stays small. */
const ICONS: Record<string, LucideIcon> = {
  'arrow-left': ArrowLeft, 'arrow-right': ArrowRight, 'arrow-up': ArrowUp, 'arrow-up-right': ArrowUpRight, award: Award,
  baby: Baby, briefcase: Briefcase, 'building-2': Building2, check: Check, 'chevron-down': ChevronDown,
  'chevron-right': ChevronRight, coffee: Coffee, 'drafting-compass': DraftingCompass, flame: Flame, flower: Flower,
  'flower-2': Flower2, frame: Frame, gem: Gem, ghost: Ghost, gift: Gift, hand: Hand, heart: Heart,
  'heart-handshake': HeartHandshake, hotel: Hotel, house: House, lamp: Lamp, layers: Layers, mail: Mail, 'map-pin': MapPin,
  menu: Menu, 'message-circle': MessageCircle, package: Package, palette: Palette, 'party-popper': PartyPopper,
  'pen-tool': PenTool, phone: Phone, scissors: Scissors, search: Search, send: Send, 'shield-check': ShieldCheck,
  'shopping-bag': ShoppingBag, sofa: Sofa, sparkles: Sparkles, sprout: Sprout, star: Star, store: Store, sun: Sun,
  tent: Tent, trees: Trees, 'graduation-cap': GraduationCap, hammer: Hammer, laptop: Laptop, 'refresh-cw': RefreshCw, smile: Smile, users: Users, clock: Clock, 'bar-chart-3': BarChart3, truck: Truck, 'utensils-crossed': UtensilsCrossed, wind: Wind, x: X,
};

export default function Icon({ name, className, strokeWidth = 1.5 }: { name: string; className?: string; strokeWidth?: number }) {
  const C = ICONS[name];
  if (!C) return null;
  return <C className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
