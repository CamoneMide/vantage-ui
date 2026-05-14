import {
  Clock, Palette, Settings, Sparkles, Zap,
} from 'lucide-react';

import type { TabId } from '../store/ui-slice';

/** Navigation item definition for the side panel tab bar. */
interface NavItem {
  id: TabId
  label: string
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
}

/** Ordered list of all side panel navigation items. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'extract', label: 'Extract', Icon: Sparkles },
  { id: 'history', label: 'History', Icon: Clock },
  { id: 'design', label: 'Design', Icon: Palette },
  { id: 'credits', label: 'Credits', Icon: Zap },
  { id: 'settings', label: 'Settings', Icon: Settings },
];
