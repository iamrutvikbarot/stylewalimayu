import { Product } from '@/data/products';

export const GOOGLE_SHEET_ID = '1wuVOr3UqXmRXEKHYYN97Ecq-xacre1tXzpfPRYfvfiw';
export const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv`;

/**
 * RFC 4180 compliant CSV parser that handles commas, quotes, and newlines inside cells
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
 * Standardize category strings into our system slugs:
 * 'ethnic' | 'western' | 'accessories' | 'home'
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
 * Check if an image URL is valid and reachable
 */
function isValidUrl(url: string | undefined): boolean {
  if (!url) return false;
  const clean = url.trim();
  return (
    (clean.startsWith('http://') || clean.startsWith('https://')) &&
    !clean.includes('[link removed]') &&
    !clean.includes('[link')
  );
}

/**
 * Fetch and parse products from the live Google Sheet
 */
export async function fetchProductsFromGoogleSheets(): Promise<Product[]> {
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StyleWaliMayu/1.0; +https://stylewalimayu.vercel.app)',
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

      // Only import active products that have a title
      if (!productName || (status !== 'active' && status !== 'published')) {
        continue;
      }

      const productCode = (record['Product Code'] || '').trim();
      const storeRaw = (record['Store'] || 'Myntra').trim();
      const store = (storeRaw as Product['store']) || 'Myntra';
      const category = normalizeCategory(record['Category'] || '');
      const mrp = parsePrice(record['MRP']);
      const offerPrice = parsePrice(record['Offer Price']);
      const affiliateLink = (record['Affiliate Link'] || '').trim();
      const company = (record['Company'] || '').trim();

      // Collect all valid images from Image URL 1..5
      const images: string[] = [];
      const imageKeys = ['Image URL 1', 'Image URL 2', 'Image URL 3', 'Image URL 4', 'Image URL 5'];
      for (const key of imageKeys) {
        const imgVal = record[key];
        if (isValidUrl(imgVal)) {
          images.push(imgVal.trim());
        }
      }

      const primaryImage =
        images.length > 0
          ? images[0]
          : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

      const finalPrice = offerPrice > 0 ? offerPrice : mrp;
      const finalOriginal = mrp > 0 ? mrp : finalPrice;

      products.push({
        id: productCode ? productCode.replace('#', 'swm-') : `swm-${products.length + 1}`,
        title: productName,
        category,
        price: finalPrice,
        originalPrice: finalOriginal,
        store: ['Myntra', 'Ajio', 'Amazon', 'Meesho', 'Flipkart'].includes(store)
          ? store
          : 'Myntra',
        imageUrl: primaryImage,
        affiliateUrl: affiliateLink || 'https://myntra.com',
        isTrending: true,
        badge: company ? `${company} ✨` : 'Trending Pick 🌸',
        rating: 4.8,
        reviewCount: Math.floor(Math.random() * 400) + 150,
        stylingTip: `Pair this gorgeous ${company || ''} piece with minimal silver jewelry, open curls, and nude flats for an effortless chic style!`,
      });
    }

    return products;
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    return [];
  }
}
