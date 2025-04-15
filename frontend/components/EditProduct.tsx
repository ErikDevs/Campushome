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
import { Textarea } from "./ui/textarea";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" }),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive({ message: "Price must be a positive number" }),
  images: z
    .array(z.string())
    .min(1, { message: "At least one image is required" }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface EditProductProps {
  productId: string;
  initialData?: {
    title: string;
    description: string;
    price: number;
    images: string[];
  };
}

const EditProduct = ({ productId, initialData }: EditProductProps) => {
  const [loading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      price: 0,
      images: [],
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("listing")
        .update({
          title: data.title,
          description: data.description,
          price: data.price,
          images: data.images,
        })
        .eq("id", productId);

      if (error) {
        throw error;
      }

      toast.success("Listing updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update listing");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Your Listing</DialogTitle>
        </DialogHeader>
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
                      placeholder="Describe your product in detail"
                      {...field}
                      className="min-h-[120px]"
                    />
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
                  <FormLabel>Price (KES)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="2000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
                    <ImageUpload
                      onFilesChange={(filePaths) => field.onChange(filePaths)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Listing"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
