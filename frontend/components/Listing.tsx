import { supabase } from "@/lib/superbaseclient";
import { Image } from "@imagekit/next";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const dynamic = "force-dynamic";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  status: string;
  rating: number;
}

const fetchProducts = async (
  page: number,
  limit: number
): Promise<{ products: Product[]; total: number }> => {
  const offset = (page - 1) * limit;
  const { data, error, count } = await supabase
    .from("listing")
    .select("*", { count: "exact" })
    .eq("status", "approved")
    .range(offset, offset + limit - 1);

  if (error) throw new Error(error.message);

  return {
    products: data || [],
    total: count || 0,
  };
};

export default async function Products({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page || "1");
  const limit = 10;
  const { products } = await fetchProducts(currentPage, limit);

  return (
    <section className="flex flex-col w-full">
      <p className="text-slate-500">Latest Listing</p>
      {/* Products Grid */}
      <div className="grid grid-cols-2 mt-8 md:grid-cols-3 lg:grid-cols-4 ">
        {products.map((product) => (
          <Link href={`product/${product.id}`} key={product.id}>
            <div className="hover:shadow-lg border rounded-md transition-shadow">
              <div className="flex justify-center">
                {product.images?.length > 0 ? (
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                    src={product.images[0]}
                    width={500}
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
      {products.length > 10 && (
        <div className="border max-w-md mx-auto w-full my-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="/products" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}
