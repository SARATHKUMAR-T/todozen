"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const formSchema = z.object({
  todoname: z.string().min(1, { message: "Task Name is Required" }),
  deadline: z.string(),
  description: z.string(),
});

export default function ToDoForm({
  setIsFormOpen,
  isFormOpen,
}: {
  setIsFormOpen: any;
  isFormOpen: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const router = useRouter();
  const { toast } = useToast();
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["x-auth-token"] = token;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      todoname: "",
      deadline: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const data = {
      ...values,
    };
    console.log(data);

    const res = await fetch(`https://todozen-backend.vercel.app/api/addtodo`, {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    });
    const result = await res.json();
    if (result.message === "New ToDo Created Successfully!") {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsLoading(false);
      toast({
        title: result.message,
        description: "Here You Go🚀",
        duration: 5000,
      });
      setIsFormOpen(false);
    } else {
      setIsLoading(false);
      toast({
        title: result.message,
        description: "Try Again🚀",
        duration: 3000,
      });
    }
  }
  return (
    <div className="max-w-lg bg-slate-200 dark:bg-slate-900 rounded-md px-8 pb-12 pt-8 w-2/4 relative">
      <X
        className="absolute right-4 top-4 z-20 cursor-pointer"
        onClick={() => {
          setIsFormOpen(!isFormOpen);
        }}
      />
      <h4 className="text-3xl text-center mb-5 font-medium">Todo</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="todoname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DeadLine</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
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
                    rows={4}
                    {...field}
                    placeholder="Be Specific About Your Task"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full  " disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                <span>Creating...</span>
              </>
            ) : (
              <span>Create</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
