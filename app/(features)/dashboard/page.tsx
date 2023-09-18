"use client";
import DashboardCard from "@/components/DashboardCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getTodo } from "@/services/todo";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, PenSquare, Swords } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Todo {
  _id: string;
  todoname: string;
  description: string;
  deadline: string;
  isDone: boolean;
  startdate: string;
}

export default function Dashboard() {
  const router = useRouter();
  useEffect(
    function token() {
      if (!localStorage.getItem("token")) {
        router.push("/");
      }
    },
    [router]
  );
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodo,
  });
  const todos: Todo[] | undefined = data?.data?.todos;
  console.log(todos);

  const compltetdTodos = todos?.filter(todo => todo.isDone === true);
  const remainingTodos = todos?.filter(todo => todo.isDone === false);
  const cards = [
    {
      title: "Number of Tasks",
      icon: <PenSquare className="h-8 w-8 " />,
      count: todos?.length,
      style: {
        outer: "bg-yellow-200",
        icon: "bg-yellow-300",
        box: "bg-yellow-500",
      },
    },
    {
      title: "Number of Remaining Tasks",

      icon: <Swords className="h-8 w-8 " />,
      count: remainingTodos?.length,
      style: {
        outer: "bg-blue-200",
        icon: "bg-blue-300",
        box: "bg-blue-500",
      },
    },
    {
      title: "Number of Tasks Completed",
      icon: <CheckCircle2 className="h-8 w-8 " />,
      count: compltetdTodos?.length,
      style: {
        outer: "bg-green-200",
        icon: "bg-green-300",
        box: "bg-green-600",
      },
    },
  ];
  return (
    <section className="max-w-4xl mx-auto p-4 ">
      <div className="pt-16 min-h-screen w-full">
        {isLoading ? (
          <Skeleton className="max-w-2xl mx-auto pt-8 px-6 pb-6 w-full h-40 bg-gray-300">
            <Skeleton className="h-12 w-12 rounded-full" />
          </Skeleton>
        ) : (
          <div className="max-w-3xl flex flex-col mx-auto  px-8 min-h-screen py-16">
            {cards.map(card => (
              <DashboardCard key={card.title} card={card} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
