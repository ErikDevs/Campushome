"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "../app/index.css";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/superbaseclient";
import { Textarea } from "./ui/textarea";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(50),
  price: z.preprocess((val) => Number(val), z.number().positive()),
  images: z.array(z.string()),
  category: z.string(),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export function ListingForm() {
  const { data: session } = useSession(); // Assuming session contains user info

  const [loading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState<{
    university: string;
    location: string;
    email: string;
  } | null>(null);

  const userId = session?.user?.email; // Extracting userId from session

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const { data } = await supabase
          .from("users")
          .select("id, email, university, location")
          .eq("email", userId);

        if (data && data.length > 0) {
          const user = data[0];

          // Set state
          setUserData({
            university: user.university,
            location: user.location,
            email: user.email,
          });
        }
      }
    };

    fetchData();
  }, [userId]);

  if (!userData) console.log("waiting for data"); // Or a spinner

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      images: [],
      category: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true); // start loading

    const dataToInsert = {
      ...data,
      location: userData?.location,
      university: userData?.university,
      email: userData?.email,
    };

    try {
      console.log("Data to insert:", dataToInsert);
      const { error } = await supabase.from("listing").insert([dataToInsert]);

      if (error) {
        console.log(error);
      }

      if (!session) {
        toast.error(
          `You must be logged in and completed your profile to create a listing `
        );
      } else {
        toast.success("Your list was saved successfully!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Create your listing</h1>
        <p className="text-gray-500 text-base max-w-md">
          Enter the details about what you would like to sell
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Product title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A short description of your item"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price in KES</FormLabel>
                <FormControl>
                  <Input
                    placeholder="2000"
                    {...field}
                    value={field.value as string | number}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <ImageUpload onFilesChange={(urls) => field.onChange(urls)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex-col gap-y-4 flex">
            <Button type="submit" disabled={loading || !session}>
              {loading ? "saving..." : "Post your ad"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
