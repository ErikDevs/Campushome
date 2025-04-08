export async function fetchProducts(page: number, limit: number) {
  const offset = (page - 1) * limit;
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
  );
  const products = await res.json();

  // NOTE: this API doesn’t return `total`, so for now we’ll fake it
  const total = 50; // Replace with actual count if the API supports it

  return { products, total };
}
