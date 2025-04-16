import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

import { supabase } from "@/lib/superbaseclient";
import { Image } from "@imagekit/next";
import Link from "next/link";

// Removed unused Product interface

interface ProductsPageProps {
  searchParams: {
    page?: string;
  };
}

const ITEMS_PER_PAGE = 10;

async function fetchProducts(page: number) {
  const offset = (page - 1) * ITEMS_PER_PAGE;

  // Fetch products with pagination
  const {
    data: products,
    error,
    count,
  } = await supabase
    .from("listing")
    .select("*", { count: "exact" })
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .range(offset, offset + ITEMS_PER_PAGE - 1);

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return {
    products: products || [],
    total: count || 0,
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const currentPage = Number(searchParams?.page || "1");
  const { products, total } = await fetchProducts(currentPage);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, total);

  return (
    <section className="flex flex-col mt-10 mx-auto max-w-7xl w-full space-y-6">
      <h1 className="text-2xl font-bold">All Products</h1>
      <p className="text-slate-500">
        Showing {startItem}–{endItem} of {total} products
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link href={`product/${product.id}`} key={product.id}>
            <div className="hover:shadow-lg border rounded-md transition-shadow">
              <div className="flex justify-center py-2 h-[300px]">
                {product.images?.length > 0 ? (
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={product.images[0]}
                    width={250}
                    height={100}
                    alt="Picture of the author"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-t-md flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold line-clamp-1">{product.title}</p>
                <p className="text-sm text-gray-500">KES {product.price}</p>
                <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                  {product.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
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
      )}
    </section>
  );
}
