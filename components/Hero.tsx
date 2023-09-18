import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 py-6  max-w-full px-4">
      <div className="max-w-3xl  mx-auto text-center space-y-5 ">
        <h1 className=" text-3xl sm:text-5xl font-bold leading-normal">
          Crafting a better tomorrow
          <br />
          <span className="text-4xl sm:text-6xl text-green-600">O</span>ne Task
          at a Time
        </h1>
        <p className="max-w-xl mx-auto text-muted-foreground font-semibold pt-4">
          <span className="underline underline-offset-2 decoration-green-600">
            {" "}
            Your streamlined task companion
          </span>
          <br /> A clutter-free way to organize, prioritize, and conquer your
          to-do list. Experience simplicity and efficiency in managing your
          daily tasks.
        </p>
        <div className="pt-8">
          <Button asChild className="rounded-sm">
            <Link href="/signup" className="flex">
              Signup to continue
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
