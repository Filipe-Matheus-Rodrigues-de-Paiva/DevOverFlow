"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { editProfileSchema } from "@/lib/validations";
import React, { useState } from "react";
import { updateUser } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  mongoUser?: string;
}

export default function EditProfileForm({ mongoUser }: Props) {
  const [isSubmitting, setisSubmitting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const parsedMongoUser = JSON.parse(mongoUser || "");

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: parsedMongoUser.name || "",
      username: parsedMongoUser.username || "",
      portfolioWebsite: parsedMongoUser.portfolioWebsite || "",
      location: parsedMongoUser.location || "",
      bio: parsedMongoUser.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof editProfileSchema>) {
    setisSubmitting(true);

    try {
      await updateUser({
        clerkId: parsedMongoUser.clerkId,
        path: pathname,
        updateData: values,
      });

      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setisSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Portfolio Link
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Location <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Bio <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <textarea
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[100px] w-full rounded-md border p-2"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-9 w-36 self-end rounded-md bg-primary-500 text-white"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
