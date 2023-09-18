"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ChevronLeftCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export default function Signin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const res = await fetch("https://todozen-backend.vercel.app/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (data.message) {
      if (data.message === "user doesn't exist") {
        setIsLoading(false);
        toast({
          title: "User Not Found!",
          variant: "destructive",
          description: "Please Create An Account And Continue",
        });
      } else if (data.message === "Invalid Credentials") {
        setIsLoading(false);
        toast({
          title: "Invalid Credentials!",
          variant: "destructive",
          description: "Try Again with Correct Credentials",
        });
      } else {
        setIsLoading(false);
        toast({
          title: "Unknown Error!",
          description: "Please Try Again Later",
          variant: "destructive",
        });
      }
    }
    if (data.token) {
      setIsLoading(false);
      toast({
        title: "User Signed In Successfully!",
        duration: 2000,
      });
      const token = (data as { token: string }).token;
      localStorage.setItem("token", token);
      form.reset();
      router.push("/dashboard");
    }
  }
  return (
    <section className="min-h-screen flex flex-col w-full items-center justify-center p-4 px-8">
      <Button className="flex gap-x-2 mb-8" asChild variant="secondary">
        <Link href="/">
          <ChevronLeftCircle />
          <p>Back To Home Page</p>
        </Link>
      </Button>
      <div className="max-w-lg px-6 py-12 mx-auto w-full dark:bg-slate-900 bg-slate-100 rounded-lg ">
        <h3 className="text-3xl mb-8 text-center">Login</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="...." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full  " disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  <span>Logging In...</span>
                </>
              ) : (
                <span>LogIn</span>
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 p-3">
          <Button
            onClick={() => setDemoOpen(!demoOpen)}
            variant="ghost"
            className="text-sm"
          >
            <AlertCircle className="h-4 w-4 mr-2 bg-yellow-500 rounded-full" />{" "}
            Are You Looking For Demo Account?
          </Button>
          {demoOpen && (
            <div className="mt-1 space-y-2 px-4  text-sm">
              <p>
                Email :
                <span className="underline underline-offset-2 decoration-yellow-500">
                  {" "}
                  jhon@gmail.com
                </span>
              </p>
              <p>
                Password :
                <span className="underline underline-offset-2 decoration-yellow-500">
                  {" "}
                  demo123
                </span>
              </p>
            </div>
          )}
        </div>
        <Button className="mt-4 " variant="link">
          <Link href="/signup" className="underline">
            Don&apos;t Have An Account?
          </Link>
        </Button>
      </div>
    </section>
  );
}
