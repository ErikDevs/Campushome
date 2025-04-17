"use client";

import { supabase } from "@/lib/superbaseclient";
import React, { useState } from "react";

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

const EditStatus = ({ productId }: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleStatusChange = async (newStatus: string) => {
    // Only allow admins to change status
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

  return (
    <select
      value={productId.status}
      onChange={(e) => handleStatusChange(e.target.value)}
      className={`border p-2 w-full rounded-md`}
    >
      <option value="pending">Set pending</option>
      <option value="approved">Approve</option>
      <option value="rejected">Reject</option>
    </select>
  );
};

export default EditStatus;
