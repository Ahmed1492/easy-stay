// Ask Cloudinary for a resized, compressed version (WebP/AVIF when supported)
// instead of the original upload. Non-Cloudinary URLs are returned unchanged.
export const optimizeImage = (url, width = 800) => {
  if (typeof url !== "string" || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  return url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${width}/`);
};

// Start downloading images ahead of time (e.g. when hovering a card)
const preloaded = new Set();
export const preloadImages = (urls) => {
  urls.forEach((url) => {
    if (!url || preloaded.has(url)) return;
    preloaded.add(url);
    const img = new Image();
    img.src = url;
  });
};
