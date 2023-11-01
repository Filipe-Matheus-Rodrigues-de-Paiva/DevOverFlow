"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { answerSchema } from "@/lib/validations";
import { useTheme } from "@/context/ThemeProvider";
import { createAnswer } from "@/lib/actions/answer.actions";
import { usePathname } from "next/navigation";

const type: string = "create";

export default function AnswerForm({
  authorId,
  questionId,
}: {
  authorId: string;
  questionId: string;
}) {
  const pathname = usePathname();
  const { mode } = useTheme();
  const editorRef = useRef(null);
  const [isSubmitting, setisSubmitting] = useState(false);
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof answerSchema>) {
    setisSubmitting(true);
    try {
      await createAnswer({
        content: values.content,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        // @ts-ignore
        editorRef.current.setContent("");
      }
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) =>
                    // @ts-ignore
                    (editorRef.current = editor)
                  }
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Inter,Arial,sans-serif; font-size:16px }",
                    skin: mode === "dark" ? "oxide-dark" : "oxide",
                    content_css: mode === "dark" ? "dark" : "light",
                  }}
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
          {isSubmitting ? (
            <>{type === "edit" ? "editing..." : "submitting..."}</>
          ) : (
            <>{type === "edit" ? "Edit answer" : "Post Answer"}</>
          )}
        </Button>
      </form>
    </Form>
  );
}
