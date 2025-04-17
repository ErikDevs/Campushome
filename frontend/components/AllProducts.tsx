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
import { ArrowRight } from "lucide-react";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

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

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      if (fetchedProducts && fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
      }
    };
    fetchProducts();
  }, []);

  if (products.length === 0) {
    return <div>No Products Found</div>;
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
                  <TableHead className="w-[100px]">Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Owner Email</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Review</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.title}
                    </TableCell>
                    <TableCell>
                      <p className="max-w-md overflow-x-clip">
                        {product.description}
                      </p>
                    </TableCell>
                    <TableCell>{product.email}</TableCell>
                    <TableCell>{product.location}</TableCell>
                    <TableCell>{product.university}</TableCell>
                    <TableCell>
                      <p
                        className={`capitalize ${
                          product.status === "approved"
                            ? "text-green-500 bg-green-200"
                            : product.status === "pending"
                            ? "text-yellow-500 bg-yellow-200"
                            : "text-red-500 bg-red-200"
                        } rounded-md px-2 py-1`}
                      >
                        {product.status}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      KES {product.price}
                    </TableCell>
                    <TableCell>
                      <Button>
                        <Link
                          className="flex items-center gap-1"
                          href={`/product-review/${product.id}`}
                        >
                          Review
                          <ArrowRight />
                        </Link>
                      </Button>
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
