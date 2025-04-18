// app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import { supabase } from "@/lib/superbaseclient";
import { Image } from "@imagekit/next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import ContactSeller from "@/components/ContactSeller";

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

export const dynamic = "force-dynamic";

type ProductsPageProps = {
  params: Promise<{ id?: string }>;
};

const ProductPage = async ({ params }: ProductsPageProps) => {
  const resolvedParams = await params;
  const { data: product, error } = await supabase
    .from("listing")
    .select("*")
    .eq("id", resolvedParams?.id ?? "")
    .single<Product>();

  if (error || !product) {
    return notFound();
  }

  return (
    <div className="w-full mx-auto">
      <div className="max-w-7xl flex justify-between flex-col md:flex-row mx-auto px-6 mt-16 py-8">
        {/* Product Images */}
        <Carousel className="md:w-[512px] w-full flex items-center">
          <CarouselContent>
            {product.images.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                  src={image}
                  alt={`${product.title} - ${index + 1}`}
                  width={500}
                  height={200}
                  className="object-cover rounded-md"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Product Info */}
        <div className="space-y-4 my-8">
          <h1 className="text-2xl font-bold">{product.title}</h1>
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
            <h2 className="text-lg font-medium mb-4">Description</h2>
            <p className="text-gray-700 max-w-lg">{product.description}</p>
          </div>

          <ContactSeller />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
