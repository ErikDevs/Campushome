// app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import { supabase } from "@/lib/superbaseclient";
import { Image } from "@imagekit/next";

interface Product {
  id: number;
  title: string;
  description: string;
  email: string;
  price: number;
  images: string[];
  university?: string;
  location?: string;
}

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { data: product, error } = await supabase
    .from("listing")
    .select("*")
    .eq("id", params?.id ?? "")
    .single<Product>();

  if (error || !product) {
    return notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Product Images */}
        <div className="flex flex-col">
          {product.images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                src={image}
                alt={`${product.title} - ${index + 1}`}
                fill
                className="object-contain rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold">KES {product.price}</p>

          {product.university && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">University:</span>{" "}
              {product.university}
            </p>
          )}

          {product.location && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Location:</span> {product.location}
            </p>
          )}

          <div className="pt-4 border-t">
            <h2 className="text-lg font-medium">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
