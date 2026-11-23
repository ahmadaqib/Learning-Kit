import React from 'react';
import {
  BookOpen,
  Box,
  Bell,
  Bug,
  ChefHat,
  Clock,
  Cloud,
  Code,
  Database,
  FileText,
  Globe,
  Image,
  Key,
  LayoutDashboard,
  Lightbulb,
  Link,
  Lock,
  Mail,
  Mailbox,
  MapPin,
  MessageCircle,
  Monitor,
  Package,
  Palette,
  Phone,
  Plug,
  Radio,
  Search,
  Send,
  Server,
  Settings,
  Shield,
  Smartphone,
  Store,
  Truck,
  User,
  Users,
  Utensils,
  Wifi,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { ContentIconName } from '@/content/icons';

/** Every name in CONTENT_ICONS maps to one lucide component. The record type makes a missing one a compile error. */
const ICONS: Record<ContentIconName, LucideIcon> = {
  globe: Globe,
  server: Server,
  database: Database,
  cloud: Cloud,
  wifi: Wifi,
  mail: Mail,
  mailbox: Mailbox,
  send: Send,
  package: Package,
  truck: Truck,
  store: Store,
  utensils: Utensils,
  'chef-hat': ChefHat,
  bell: Bell,
  phone: Phone,
  smartphone: Smartphone,
  monitor: Monitor,
  key: Key,
  lock: Lock,
  shield: Shield,
  search: Search,
  code: Code,
  'file-text': FileText,
  image: Image,
  palette: Palette,
  'layout-dashboard': LayoutDashboard,
  link: Link,
  clock: Clock,
  'map-pin': MapPin,
  user: User,
  users: Users,
  'message-circle': MessageCircle,
  radio: Radio,
  plug: Plug,
  settings: Settings,
  bug: Bug,
  zap: Zap,
  'book-open': BookOpen,
  box: Box,
  lightbulb: Lightbulb,
};

interface ContentIconProps {
  name: ContentIconName;
  /** px. 28 on a choice, 40 above a Junior sort bin. */
  size?: number;
  className?: string;
}

/** Resolves a `CONTENT_ICONS` name to its lucide icon. Decorative: the label next to it carries the meaning. */
export const ContentIcon: React.FC<ContentIconProps> = ({ name, size = 28, className }) => {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon width={size} height={size} aria-hidden="true" focusable="false" className={className} />;
};
