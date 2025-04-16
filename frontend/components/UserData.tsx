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
import { Box, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { OrphanedImagesCount } from "./StrayImages";

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

const getUsers = async () => {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.log(error);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getApproved = async () => {
  try {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("status", "approved");

    if (error) {
      console.log(error);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getRejected = async () => {
  try {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("status", "rejected");

    if (error) {
      console.log(error);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
const getPending = async () => {
  try {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("status", "pending");

    if (error) {
      console.log(error);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

const UserData = () => {
  interface Product {
    title: string;
    description: string;
    location: string;
    university: string;
    status: string;
    price: number;
  }

  interface User {
    username: string;
    email: string;
    role: string;
    phone_number: string;
  }

  const [products, setProducts] = useState<Product[]>([]);

  const [users, setUsers] = useState<User[]>([]);
  const [approvedListing, setApproved] = useState<Product[]>([]);
  const [sales, setSales] = useState<number>(0);
  const [rejectedListing, setRejected] = useState<Product[]>([]);
  const [pendingListing, setPending] = useState<Product[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();

      if (fetchedUsers && fetchedUsers.length > 0) {
        setUsers(fetchedUsers);
      }
    };
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();

      if (fetchedProducts && fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
      }
    };

    const fetchApprovedProducts = async () => {
      const fetchedProducts = await getApproved();

      if (fetchedProducts && fetchedProducts.length > 0) {
        setApproved(fetchedProducts);
      }
    };

    const fetchRejectedProducts = async () => {
      const fetchedProducts = await getRejected();

      if (fetchedProducts && fetchedProducts.length > 0) {
        setRejected(fetchedProducts);
      }
    };

    const fetchPendingProducts = async () => {
      const fetchedProducts = await getPending();

      if (fetchedProducts && fetchedProducts.length > 0) {
        setPending(fetchedProducts);
      }
    };
    const fetchSales = async () => {
      // Replace this with the actual logic to fetch sales data
      const fetchedSales = 0; // Example: Replace with API call or calculation
      setSales(fetchedSales);
    };

    fetchSales();
    fetchApprovedProducts();
    fetchApprovedProducts();
    fetchPendingProducts();
    fetchRejectedProducts();
    fetchProducts();
    fetchUsers();
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
                <h2 className="text-indigo-500">Total Products</h2>
                <Box />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="font-bold text-xl">{products.length}</h2>
          </CardContent>
          <CardFooter>
            <p>All products posted in this platform</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <h2 className="text-orange-400">Total Users</h2>
                <User />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold">{users.length}</h2>
          </CardContent>
          <CardFooter>
            <p>All registed users</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <h2 className="text-red-400">Total Rejected Listings</h2>
                <Box />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold">{rejectedListing.length}</h2>
          </CardContent>
          <CardFooter>
            <p>Total Rejected products</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <h2 className="text-green-300">Total Approved Listings</h2>
                <Box />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold">{approvedListing.length}</h2>
          </CardContent>
          <CardFooter>
            <p>Total Approved products</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <h2 className="text-yellow-300">Total Pending Listings</h2>
                <Box />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold">{pendingListing.length}</h2>
          </CardContent>
          <CardFooter>
            <p>Total Approved products</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <h2 className="text-teal-400">Total Sales</h2>
                <Box />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold">{sales}</h2>
          </CardContent>
          <CardFooter>
            <p>Total sales</p>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <OrphanedImagesCount />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
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
                  {products.slice(0, 5).map((product) => (
                    <TableRow key={product.title}>
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

export default UserData;
