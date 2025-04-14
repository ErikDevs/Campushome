"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Box } from "lucide-react";
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

const Page = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();

      if (fetchedProducts && fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
      }
    };

    fetchProducts();
  }, []);

  if (products.length < 0) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="w-full">
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <h2>Total Products</h2>
                <Box />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{products.length}</p>
          </CardContent>
          <CardFooter>
            <p>All products in the marketplace</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <h2>Total Products</h2>
                <Box />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{products.length}</p>
          </CardContent>
          <CardFooter>
            <p>All products in the marketplace</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <h2>Total Products</h2>
                <Box />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{products.length}</p>
          </CardContent>
          <CardFooter>
            <p>All products in the marketplace</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <h2>Total Products</h2>
                <Box />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{products.length}</p>
          </CardContent>
          <CardFooter>
            <p>All products in the marketplace</p>
          </CardFooter>
        </Card>
      </div>
      <div className="my-10">stats</div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              <h1>Recently added Listing</h1>
            </CardTitle>
            <CardDescription>
              <p>Last 5 products added to the marketplace</p>
            </CardDescription>
          </CardHeader>
          <div>
            <CardContent className="mt-8">
              <Table>
                <TableCaption>A list of all products </TableCaption>
                <TableHeader>
                  <TableRow>
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
                    <TableRow key={product}>
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
                      {product.status === "pending" ? (
                        <TableCell>
                          <p className="bg-yellow-200 capitalize text-white rounded-xl p-1 flex justify-center">
                            <button>{product.status}</button>
                          </p>
                        </TableCell>
                      ) : product.status === "rejected" ? (
                        <TableCell>
                          <p className="bg-red-300 capitalize text-white  rounded-xl p-1 flex justify-center">
                            <button>{product.status}</button>
                          </p>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <p className="bg-green-300 capitalize text-white  rounded-xl p-1 flex justify-center">
                            <button>{product.status}</button>
                          </p>
                        </TableCell>
                      )}
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
    </div>
  );
};

export default Page;
