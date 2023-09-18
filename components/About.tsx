import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <section className="min-h-screen max-w-full  py-6 " id="about">
      <h1 className=" text-4xl sm:text-6xl font-bold tracking-wide text-center">
        About{" "}
      </h1>
      <div className="bg-green-600 py-12 px-6 flex flex-col sm:flex-row items-center  justify-center mt-12">
        <div className="flex-1 h-full w-full p-4 flex items-center justify-center">
          <Image
            src="/assets/people.jpg"
            alt="men"
            width={600}
            objectFit="fill"
            height={800}
            className="rounded-lg drop-shadow-xl shadow-blue-500"
          />
        </div>
        <div className="flex-1 max-w-lg mx-auto px-4 py-6">
          <p className="text-bold">Simplifying Your Productivity Goals!</p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-6">
            Celebrate the creators of Todozen
          </h1>
          <p className="mt-3 text-sm sm:text-base">
            Our team is dedicated to creating a seamless task management
            experience, striving to make your life simpler and more organized.
            With a shared passion for innovation and a commitment to
            user-centric design, we are here to empower you on your productivity
            journey. Get to know the faces behind Todozen and embark on a path
            to enhanced efficiency.
          </p>
        </div>
      </div>
    </section>
  );
}
