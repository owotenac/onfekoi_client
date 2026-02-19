import { ProductProps } from '@/model/products';

export type ListItem =
    | { type: 'item'; data: ProductProps }
    | { type: 'ad'; id: string };

// utils/injectAds.js
export const injectAdSlots = (
  items: ProductProps[],
  frequency: number = 7
): ListItem[] => {
  const result: ListItem[] = [];
  items.forEach((item, index) => {
    result.push({ type: 'item', data: item });
    if ((index + 1) % frequency === 0) {
      result.push({ type: 'ad', id: `ad-${index}` });
    }
  });
  console.log("Ads injection" + result.length);
  return result;
};