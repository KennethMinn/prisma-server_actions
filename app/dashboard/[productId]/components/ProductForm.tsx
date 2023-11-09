"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import AlertModal from "@/components/modals/alert-modal";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Image, Product } from "@prisma/client";
// import ImageUpload from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/components/ui/image-upload";
import { addProduct, updateProduct } from "@/actions/product-actions";
import AlertModal from "@/components/ui/alert-modal";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  title: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  category: z.string().min(1),
  color: z.string().min(1),
  size: z.string().min(1),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  // ( {id:string , ...} & {images : Image[]} )
  initialValues:
    | (Product & {
        images: Image[]; // type annotation
      })
    | null;
}

export const categories = ["shirts", "pants"];
const colors = [
  {
    name: "black",
    value: "#000000",
  },
  {
    name: "white",
    value: "#fffff",
  },
];
const sizes = ["md", "lg"];

const ProductForm: React.FC<ProductFormProps> = ({ initialValues }) => {
  const { productId } = useParams();
  const router = useRouter();
  const { userId } = useAuth();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialValues ? "Edit product" : "Create product";
  const description = initialValues ? "Edit a product." : "Add a new product";
  const toastMessage = initialValues ? "Product updated." : "Product created.";
  const action = initialValues ? "Save changes" : "Create";

  const defaultValues = initialValues
    ? {
        ...initialValues,
        price: parseFloat(String(initialValues?.price)),
      }
    : {
        title: "",
        images: [], // watch carefully
        price: 0,
        category: "",
        color: "",
        size: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProductFormValues) => {
    if (!userId) return;
    const data = {
      ...values,
      userId,
      productId: typeof productId === "string" ? productId : undefined,
    };
    try {
      setLoading(true);
      if (initialValues) {
        await updateProduct(data);
      } else {
        await addProduct(data);
      }
      router.refresh();
      router.push(`/dashboard`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.", error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    // try {
    //   setLoading(true);
    //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
    //   router.refresh();
    //   router.push(`/${params.storeId}/products`);
    //   toast.success("Product deleted.");
    // } catch (error: any) {
    //   toast.error("Something went wrong.");
    // } finally {
    //   setLoading(false);
    //   setOpen(false);
    // }
  };

  return (
    <>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Header title={title} description={description} />
        {initialValues && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)} //['url','url']
                    disabled={loading}
                    onChange={
                      (url) => field.onChange([...field.value, { url }]) //[{ulr:string},{url:string} ]
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
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
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
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
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a size"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.name} value={color.name}>
                          <div className=" flex items-center gap-3">
                            {color.name}
                            <div
                              className=" rounded-full w-5 h-5 border"
                              style={{ backgroundColor: color.value }}
                            />
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
