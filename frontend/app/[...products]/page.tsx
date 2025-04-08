//@ts-nocheck

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

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
  limit: number = 10
): Promise<{
  products: Product[];
  total: number;
}> => {
  const offset = (page - 1) * limit;
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
  );
  const products = await res.json();

  // Note: This API doesn't return total count, so we'll simulate it
  // In production, use an API endpoint that returns total count
  return { products, total: 100 }; // Assuming 100 total products
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page || "1");
  const limit = 10;
  const { products, total } = await fetchProducts(currentPage, limit);
  const totalPages = Math.ceil(total / limit);

  // Calculate the range being displayed
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  return (
    <section className="flex flex-col container mx-auto w-full space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>
      <p className="text-slate-500">
        Showing {startItem}–{endItem} of {total} products
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Image
                src={product.images[0] || "/placeholder-product.jpg"}
                alt={product.title}
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

      {/* Pagination Controls */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${currentPage - 1}`}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {/* Display page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`?page=${pageNum}`}
                  isActive={pageNum === currentPage}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href={`?page=${currentPage + 1}`}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
