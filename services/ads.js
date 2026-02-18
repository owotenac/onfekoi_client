

// utils/injectAds.js
export const injectAdSlots = (items, frequency = 5) => {
  const result = [];
  items.forEach((item, index) => {
    result.push({ type: 'item', data: item });
    if ((index + 1) % frequency === 0) {
      result.push({ type: 'ad', id: `ad-${index}` });
    }
  });
  return result;
};