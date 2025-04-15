"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/superbaseclient";
import { Image } from "@imagekit/next";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const getProducts = async () => {
  try {
    const { data, error } = await supabase.from("listing").select("*");
    if (error) {
      console.log(error);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const AllProducts = () => {
  interface Product {
    title: string;
    description: string;
    location: string;
    university: string;
    status: string;
    price: number;
    email: string;
    id: string;
    images: string[];
  }

  const [products, setProducts] = useState<Product[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      if (fetchedProducts && fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
      }
    };
    fetchProducts();
  }, []);

  const handleStatusChange = async (productId: string, newStatus: string) => {
    // Only allow admins to change status
    if (session?.user.role !== "admin") {
      alert("Only admins can change product status");
      return;
    }

    try {
      // Update in Supabase
      const { error } = await supabase
        .from("listing")
        .update({ status: newStatus })
        .eq("id", productId);

      if (error) {
        throw error;
      }

      // Update local state
      setProducts(
        products.map((product) =>
          product.id === productId ? { ...product, status: newStatus } : product
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  if (products.length === 0) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="w-full mt-12">
      <Card>
        <CardHeader>
          <CardTitle>All Products in the system</CardTitle>
          <CardDescription>
            <p>Products added to the marketplace</p>
          </CardDescription>
        </CardHeader>
        <div>
          <CardContent className="mt-8">
            <Table>
              <TableCaption>A list of all products</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Images</TableHead>
                  <TableHead className="w-[100px]">Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.images.map((image) => (
                        <Image
                          key={image}
                          urlEndpoint={
                            process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
                          }
                          src={image}
                          width={500}
                          height={500}
                          alt="Picture of the author"
                        />
                      ))}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.title}
                    </TableCell>
                    <TableCell>
                      <p className="max-w-lg overflow-x-clip">
                        {product.description}
                      </p>
                    </TableCell>
                    <TableCell>{product.location}</TableCell>
                    <TableCell>{product.university}</TableCell>
                    <TableCell
                      className={`capitalize ${
                        product.status === "approved"
                          ? "text-green-500"
                          : product.status === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      <select
                        value={product.status}
                        onChange={(e) =>
                          handleStatusChange(product.id, e.target.value)
                        }
                        disabled={session?.user.role !== "admin"}
                        className={`${
                          product.status === "pending"
                            ? "bg-yellow-100"
                            : product.status === "approved"
                            ? "bg-green-200"
                            : "bg-red-200"
                        } border p-2  rounded-md`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </TableCell>
                    <TableCell className="text-right">
                      KES {product.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default AllProducts;
