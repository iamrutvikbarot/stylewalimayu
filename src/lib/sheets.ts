import { Product } from '@/data/products';
import { MediaItem } from '@/components/MediaCarousel';

export const GOOGLE_SHEET_ID = '1wuVOr3UqXmRXEKHYYN97Ecq-xacre1tXzpfPRYfvfiw';
export const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv`;

/**
 * RFC 4180 compliant CSV parser
 */
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentCell.trim());
      if (currentRow.some((c) => c !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c !== '')) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Extract Google Drive file ID from any Google Drive URL format:
 * - https://drive.google.com/file/d/{id}/view...
 * - https://drive.google.com/open?id={id}
 * - https://drive.google.com/uc?id={id}
 * - https://drive.usercontent.google.com/download?id={id}
 * - https://lh3.googleusercontent.com/d/{id}
 */
export function extractGoogleDriveId(url: string | undefined): string | null {
  if (!url) return null;
  const clean = url.trim();
  const fileMatch = clean.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) return fileMatch[1];

  const idParamMatch = clean.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1];

  const dPathMatch = clean.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dPathMatch && dPathMatch[1]) return dPathMatch[1];

  return null;
}

/**
 * Optimize and upgrade image URLs to crystal-clear direct resolution.
 * Supports Myntra, Meesho, and Google Drive links!
 */
export function optimizeImageUrl(url: string | undefined): string {
  if (!url) return '';
  const clean = url.trim();

  // If it's a Google Drive link, convert to Google's direct high-res CDN image URL
  const driveId = extractGoogleDriveId(clean);
  if (driveId) {
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }

  // If it's Myntra CDN, upgrade to 1080x1440 ultra-high-definition resolution with 100% quality
  if (clean.includes('assets.myntassets.com')) {
    return clean.replace(/h_\d+,q_\d+,w_\d+/, 'h_1440,q_100,w_1080');
  }

  return clean;
}

/**
 * Standardize category strings into our system slugs
 */
function normalizeCategory(categoryStr: string): string {
  const c = (categoryStr || '').toLowerCase().trim();
  if (c.includes('ethnic') || c.includes('kurta') || c.includes('saree') || c.includes('anarkali')) {
    return 'ethnic';
  }
  if (c.includes('west') || c.includes('top') || c.includes('shirt') || c.includes('jean') || c.includes('dress') || c.includes('trouser')) {
    return 'western';
  }
  if (c.includes('bag') || c.includes('accessor') || c.includes('jewel') || c.includes('watch') || c.includes('earring') || c.includes('tote')) {
    return 'accessories';
  }
  if (c.includes('home') || c.includes('decor') || c.includes('vase') || c.includes('candle') || c.includes('aesthetic')) {
    return 'home';
  }
  return 'ethnic';
}

/**
 * Parse numeric prices from strings like "₹2,499" or "999"
 */
function parsePrice(val: string | undefined): number {
  if (!val) return 0;
  const digits = val.replace(/[^\d]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

/**
 * Check if a URL is valid and reachable
 */
export function isValidUrl(url: string | undefined): url is string {
  if (!url) return false;
  const clean = url.trim();
  return (
    (clean.startsWith('http://') || clean.startsWith('https://')) &&
    !clean.includes('[link removed]') &&
    !clean.includes('[link')
  );
}

/**
 * Convert Google Drive / YouTube video links into embeddable preview URLs
 */
export function getEmbedVideoUrl(url: string | undefined): string | null {
  if (!isValidUrl(url)) return null;
  const clean = (url || '').trim();

  // Google Drive
  const driveId = extractGoogleDriveId(clean);
  if (driveId) {
    return `https://drive.google.com/file/d/${driveId}/preview`;
  }

  // YouTube / Shorts
  const ytMatch = clean.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]+)/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  return clean;
}

/**
 * Convert a product's images and videos into a unified list of MediaItems for the carousel
 */
export function getProductMedia(product: Product): MediaItem[] {
  const items: MediaItem[] = [];

  // Add all valid images with high-definition resolution optimization
  if (product.images && product.images.length > 0) {
    product.images.forEach((img) => {
      if (isValidUrl(img)) {
        items.push({ type: 'image', url: optimizeImageUrl(img) });
      }
    });
  } else if (isValidUrl(product.imageUrl)) {
    items.push({ type: 'image', url: optimizeImageUrl(product.imageUrl) });
  }

  // Add video if provided
  const video = product.videoUrl || (product.videoUrls && product.videoUrls[0]);
  if (video && isValidUrl(video)) {
    const clean = video.trim();
    const driveId = extractGoogleDriveId(clean);
    if (driveId) {
      items.push({
        type: 'video',
        url: video,
        directUrl: `/api/video?id=${driveId}`, // High quality original 4K/1080p stream
        embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      });
    } else {
      const embed = getEmbedVideoUrl(video);
      items.push({
        type: 'video',
        url: video,
        directUrl: clean.endsWith('.mp4') ? clean : undefined,
        embedUrl: embed || video,
      });
    }
  }

  return items;
}

/**
 * Fetch and parse products strictly from the live Google Sheet
 */
export async function fetchProductsFromGoogleSheets(): Promise<Product[]> {
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL, {
      cache: 'no-store', // Always fetch fresh
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StyleWaliMayu/1.0)',
      },
    });

    if (!response.ok) {
      console.error(`Google Sheets responded with status ${response.status}`);
      return [];
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length === 0) {
      return [];
    }

    // Locate the header row containing "Product Name" and "Affiliate Link"
    let headerIdx = -1;
    for (let i = 0; i < rows.length; i++) {
      const rowStr = rows[i].join(' ');
      if (rowStr.includes('Product Name') && rowStr.includes('Affiliate Link')) {
        headerIdx = i;
        break;
      }
    }

    if (headerIdx === -1) {
      console.warn('Could not locate header row in Google Sheet');
      return [];
    }

    const headers = rows[headerIdx];
    const products: Product[] = [];

    for (let i = headerIdx + 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length === 0) continue;

      const record: Record<string, string> = {};
      headers.forEach((h, colIdx) => {
        if (h && colIdx < row.length) {
          record[h] = row[colIdx];
        }
      });

      const productName = (record['Product Name'] || '').trim();
      const status = (record['Status'] || 'Active').toLowerCase().trim();

      // Only import active products that have a product title
      if (!productName || (status !== 'active' && status !== 'published')) {
        continue;
      }

      const productCode = (record['Product Code'] || '').trim() || `#${products.length + 1 < 10 ? '0' : ''}${products.length + 1}`;
      const storeRaw = (record['Store'] || 'Myntra').trim();
      const store = storeRaw || 'Myntra';
      const company = (record['Company'] || '').trim();
      const category = normalizeCategory(record['Category'] || '');
      const mrp = parsePrice(record['MRP']);
      const offerPrice = parsePrice(record['Offer Price']);
      const rawAffiliateLink = (record['Affiliate Link'] || '').trim();
      const affiliateLink = isValidUrl(rawAffiliateLink) ? rawAffiliateLink : '#';

      // Collect all valid images from Image URL 1..5
      const images: string[] = [];
      const imageKeys = ['Image URL 1', 'Image URL 2', 'Image URL 3', 'Image URL 4', 'Image URL 5'];
      for (const key of imageKeys) {
        const imgVal = record[key];
        if (isValidUrl(imgVal)) {
          images.push(optimizeImageUrl(imgVal));
        }
      }

      // Collect video URLs
      const videoUrls: string[] = [];
      ['Video URL 1', 'Video URL 2'].forEach((k) => {
        const v = record[k];
        if (isValidUrl(v)) {
          videoUrls.push(v.trim());
        }
      });

      const primaryImage = images.length > 0 ? images[0] : '';
      const finalPrice = offerPrice > 0 ? offerPrice : mrp;
      const finalOriginal = mrp > 0 ? mrp : finalPrice;

      products.push({
        id: productCode.replace('#', 'swm-').toLowerCase(),
        code: productCode, // e.g. "#01", "#02"
        title: productName,
        company: company || undefined,
        category,
        price: finalPrice,
        originalPrice: finalOriginal,
        store,
        imageUrl: primaryImage,
        images,
        videoUrls,
        videoUrl: videoUrls.length > 0 ? videoUrls[0] : undefined,
        affiliateUrl: affiliateLink,
        isTrending: true,
        badge: company ? `${company}` : undefined,
      });
    }

    return products;
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    return [];
  }
}
