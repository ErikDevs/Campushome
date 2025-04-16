import { supabase } from "@/lib/superbaseclient";
import { Image } from "@imagekit/next";
import Link from "next/link";

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

export default async function Listing({
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
      <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-md pb-5">
            <Link href={`/product/${product.id}`}>
              <div>
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={`${product.images[0]}?${Date.now()}`}
                  width={500}
                  height={500}
                  alt={product.title}
                />
              </div>
              <div className="px-5 mt-4">
                <div className="flex justify-between">
                  <p className="font-semibold line-clamp-1">{product.title}</p>
                  <p className="flex items-center">
                    Seller rating {product.rating}
                  </p>
                </div>
                <p className="text-sm text-gray-500">KES {product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
