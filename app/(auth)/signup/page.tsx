"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeftCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export default function Signup() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // const { mutate, isLoading } = useMutation(
  //   async values => {
  //     try {
  //       const response = await axios.post(
  //         "https://zemo-backend.vercel.app/api/signup",
  //         values
  //       );
  //       return response.data;
  //     } catch (error) {
  //       throw error; // Re-throw the error to be handled in onError
  //     }
  //   },
  //   {
  //     onSuccess: data => {
  //       toast({
  //         title: "New User Created Successfully!",
  //       });
  //       const token = (data as { token: string }).token;
  //       localStorage.setItem("token", token);
  //       form.reset();
  //       router.push("/dashboard");
  //     },
  //     onError: (error: unknown) => {
  //       if (error instanceof AxiosError && error.response?.status === 400) {
  //         toast({
  //           title: "User Already Exists",
  //           variant: "destructive",
  //         });
  //       } else {
  //         toast({
  //           title: "Signup Failed!",
  //           variant: "destructive",
  //         });
  //       }
  //     },
  //   }
  // );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const res = await fetch("http://localhost:9000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (data.message === "User Already Exists!") {
      toast({
        title: "User Already Exists!",
        description: "Redirecting To Signin Page...",
        variant: "destructive",
        duration: 3000,
      });
      setIsLoading(false);
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    } else if (data.message === "internal server error") {
      toast({
        title: "Unknow Error!",
        description: "Please Try Again",
        variant: "destructive",
      });
    } else {
      toast({
        title: "New User Created Successfully!",
      });
      const token = (data as { token: string }).token;
      localStorage.setItem("token", token);
      setIsLoading(false);
      form.reset();
      router.push("/dashboard");
    }
  }

  return (
    <section className="min-h-screen flex flex-col w-full items-center justify-center  p-4 px-8">
      <Button className="flex gap-x-2 mb-8" asChild variant="secondary">
        <Link href="/">
          <ChevronLeftCircle />
          <p>Back To Home Page</p>
        </Link>
      </Button>
      <div className="max-w-lg px-6 py-12 mx-auto w-full dark:bg-slate-900 bg-slate-100 rounded-lg ">
        <h3 className="text-3xl mb-8 text-center">Signup</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  <span>Signing Up...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
            </Button>
          </form>
        </Form>
        <Button className="mt-4 " variant="link">
          <Link href="/signin" className=" underline">
            Already Have An Account?
          </Link>
        </Button>
      </div>
    </section>
  );
}
