import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const fetchProducts = async (
  page: number,
  limit: number
): Promise<{ products: Product[]; total: number }> => {
  const offset = (page - 1) * limit;
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
  );
  const products = await res.json();

  // Note: This API doesn't return total count, so we'll simulate it
  // In a real app, you'd need an endpoint that returns total count
  const total = 100; // Assuming we have 100 products total
  return { products, total };
};

export default async function Listing({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page || "1");
  const limit = 10;
  const { products } = await fetchProducts(currentPage, limit);

  return (
    <section className="flex flex-col w-full space-y-6">
      <p className="text-slate-500">Letest Listing</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <Image
                src={product.images[0] || "/placeholder-product.jpg"}
                alt={product.title}
                width={200}
                height={200}
                className="rounded-md object-cover w-full h-48"
              />
            </CardHeader>
            <CardContent>
              <p className="font-semibold line-clamp-1">{product.title}</p>
              <p className="text-sm text-gray-500">${product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
