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

const formSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(50),
  price: z.preprocess((val) => Number(val), z.number().positive()),
  images: z.array(z.string()),
  category: z.enum(["Electronics", "Furniture", "Clothing", "Books", "Other"]),
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
      category: undefined,
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
    <div className="w-full md:w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
                  <Textarea placeholder="Describe your item" {...field} />
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
                  <Input placeholder="Electronic, Furniture, " {...field} />
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
