"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  gender: z.string().min(1, { message: "Gender is required." }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  university: z
    .string()
    .min(2, { message: "University name must be at least 2 characters." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export function ProfileForm() {
  const { data: session, status } = useSession();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "",
      phone_number: "",
      university: "",
      location: "",
    },
  });

  const router = useRouter();

  const userEmail = session?.user.email;

  const onSubmit = async (data: ProfileFormValues) => {
    const { error } = await supabase
      .from("users")
      .insert([
        { ...data, username: session?.user.name, email: session?.user.email },
      ]);

    const { data: userData } = await supabase
      .from("users")
      .select("email")
      .eq("email", userEmail)
      .single();

    if (userData) {
      toast.error("User already exist in the database");
    } else if (!userData) {
      toast.success("Profile saved successfully!");
      router.push("/");
    } else if (error) {
      toast.error("An error occured try again");
    }
  };

  if (status === "loading") {
    <div>Loading ...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Male, Female, Other" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+2547..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University</FormLabel>
              <FormControl>
                <Input placeholder="University of Nairobi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Nairobi, Kenya" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
