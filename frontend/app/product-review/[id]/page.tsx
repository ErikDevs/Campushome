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
import EditStatus from "@/components/EditStatus";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  title: string;
  description: string;
  email: string;
  status: string;
  price: number;
  images: string[];
  university?: string;
  location?: string;
}

export const dynamic = "force-dynamic";

type ProductsPageProps = {
  params: Promise<{ id?: string }>;
};

const ProductReview = async ({ params }: ProductsPageProps) => {
  const resolvedParams = await params;
  const { data: product, error } = await supabase
    .from("listing")
    .select("*")
    .eq("id", resolvedParams?.id ?? "")
    .single<Product>();

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", product?.email)
    .single();

  if (error || !product) {
    return notFound();
  }

  return (
    <div className="w-full mx-auto">
      <div className="max-w-7xl flex px-6 justify-between flex-col md:flex-row gap-y-8 mx-auto py-8">
        {/* Product Images */}
        <Carousel>
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
        <div className="space-y-4 ">
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
            <p className="text-gray-700 max-w-lg">{product.description}</p>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-lg font-medium">Owner Contact</h2>
            <p className="text-gray-700">{user.phone_number}</p>
          </div>
          <EditStatus productId={product.id} />
          <Button>
            <Link className="flex items-center gap-2" href="/admin/products">
              <ArrowLeft />
              Go back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
