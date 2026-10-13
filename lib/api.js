import fallbackData from "./fallback-data.json";

const API_BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchFromAnyBase(endpoint) {
  for (const base of API_BASE_URLS) {
    try {
      const res = await fetch(`${base}${endpoint}`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && !data.error) {
          return data;
        }
      }
    } catch {
      // try next url
    }
  }
  return null;
}

export async function getProducts(category = null) {
  let endpoint = "/products";
  if (category) {
    endpoint = `/products?category=${encodeURIComponent(category)}`;
  }

  const data = await fetchFromAnyBase(endpoint);
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }

  // Fallback data
  let list = fallbackData.products || [];
  if (category) {
    list = list.filter(
      (p) =>
        p.category?.toLowerCase() === category.toLowerCase() ||
        p.categorySlug?.toLowerCase() === category.toLowerCase()
    );
  }
  return list;
}

export async function getCategories() {
  const data = await fetchFromAnyBase("/categories");
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  return fallbackData.categories || [];
}

export async function getCategoryBySlug(slug) {
  if (!slug) return null;
  const categories = await getCategories();
  const cat = categories.find(
    (c) =>
      c.slug?.toLowerCase() === slug.toLowerCase() ||
      c.id?.toLowerCase() === slug.toLowerCase()
    );
  return cat || null;
}

export async function getProductByIdOrSlug(idOrSlug) {
  if (!idOrSlug) return null;
  const str = String(idOrSlug).trim();

  // If numeric, try /products/${id}
  if (/^\d+$/.test(str)) {
    const directData = await fetchFromAnyBase(`/products/${str}`);
    if (directData && !directData.error && directData.id) {
      return directData;
    }
  }

  // Otherwise get all products and find matching id or slug
  const all = await getProducts();
  const matched = all.find(
    (p) =>
      String(p.id) === str ||
      p.slug?.toLowerCase() === str.toLowerCase()
  );

  return matched || null;
}
