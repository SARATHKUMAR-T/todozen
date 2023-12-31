"use client";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="bg-[url('/assets/grid.svg')] bg-repeat  bg-left">
        <Hero />
        <About />
        <Footer />
      </main>
    </>
  );
}
