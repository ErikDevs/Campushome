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
import { redirect } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(50),
  price: z.preprocess((val) => Number(val), z.number().positive()),
  image: z.string(),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export function ListingForm() {
  const { data: session } = useSession(); // Assuming session contains user info

  const [loading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState<{
    university: string;
    location: string;
    id: string;
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
            id: user.id,
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
      price: "0",
      image: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true); // start loading

    const dataToInsert = {
      ...data,
      location: userData?.location,
      university: userData?.university,
      user_id: userData?.id,
    };

    try {
      console.log("Data to insert:", dataToInsert);
      const { error } = await supabase.from("listing").insert([dataToInsert]);

      if (error) {
        toast(`Submission error, ${error.message}`);
      } else {
        toast("Profile saved successfully!");
      }
    } catch (error) {
      console.error(error);
      toast("Unexpected error occurred.");
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  return (
    <div>
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload onFileChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex-col gap-y-4 flex">
            <Button type="submit" disabled={loading}>
              {loading ? "saving..." : "Save post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
