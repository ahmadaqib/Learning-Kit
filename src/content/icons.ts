/**
 * The fixed list of icon names a lesson question may attach to a choice, a sort item or a sort bin
 * (`icon` field in schema.ts). Names only, no component imports, so the schema and the content validator
 * can import this file without pulling lucide-react. `src/components/ui/ContentIcon.tsx` maps each name
 * to its lucide-react component.
 */
export const CONTENT_ICONS = [
  'globe',
  'server',
  'database',
  'cloud',
  'wifi',
  'mail',
  'mailbox',
  'send',
  'package',
  'truck',
  'store',
  'utensils',
  'chef-hat',
  'bell',
  'phone',
  'smartphone',
  'monitor',
  'key',
  'lock',
  'shield',
  'search',
  'code',
  'file-text',
  'image',
  'palette',
  'layout-dashboard',
  'link',
  'clock',
  'map-pin',
  'user',
  'users',
  'message-circle',
  'radio',
  'plug',
  'settings',
  'bug',
  'zap',
  'book-open',
  'box',
  'lightbulb',
] as const;

export type ContentIconName = (typeof CONTENT_ICONS)[number];

export function isContentIcon(name: string): name is ContentIconName {
  return (CONTENT_ICONS as readonly string[]).includes(name);
}
