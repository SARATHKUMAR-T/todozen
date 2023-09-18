"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, PlusCircleIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTodo } from "@/services/todo";
import ToDoForm from "@/components/ToDoForm";
import { Skeleton } from "@/components/ui/skeleton";
import TodoCard from "@/components/TodoCard";

interface Todo {
  _id: string;
  todoname: string;
  description: string;
  deadline: string;
  isDone: boolean;
  startdate: string;
}

export default function TodoList() {
  const router = useRouter();
  useEffect(() => {
    function token() {
      if (!localStorage.getItem("token")) {
        router.push("/");
      }
    }
    token();
  }, [router]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodo,
  });
  const todos: Todo[] | undefined = data?.data?.todos;
  console.log(todos);

  return (
    <section className="max-w-4xl mx-auto p-4 ">
      {isFormOpen ? (
        <div className="w-full h-full  min-h-screen backdrop-blur-md flex items-center justify-center">
          <ToDoForm setIsFormOpen={setIsFormOpen} isFormOpen={isFormOpen} />
        </div>
      ) : (
        <div className="pt-16 min-h-screen w-full">
          <div className="flex justify-end px-12 py-8">
            <Button
              variant="default"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              <>
                <PlusCircleIcon className="mr-2" />
                Create A Task
              </>
            </Button>
          </div>
          <div className="max-w-2xl px-6 pb-6 flex flex-col gap-6 w-full mx-auto">
            {isLoading && (
              <Skeleton className="max-w-2xl mx-auto pt-8 px-6 pb-6 w-full h-40 bg-gray-300">
                <Skeleton className="h-12 w-12 rounded-full" />
              </Skeleton>
            )}
            {todos && (
              <div>
                <h1 className="text-3xl text-center font-semibold mb-6">
                  Todo List
                </h1>
                <div className="flex flex-col gap-4">
                  {todos.map(todo => (
                    <TodoCard key={todo._id} todo={todo} />
                  ))}
                </div>
              </div>
            )}
            {todos?.length === 0 && (
              <div className="flex gap-4 w-full items-center justify-center">
                <Button
                  className="rounded-full"
                  size="icon"
                  onClick={() => setIsFormOpen(!isFormOpen)}
                >
                  <PlusCircle />
                </Button>
                <p>
                  <span className="underline underline-offset-2 decoration-yellow-500 ">
                    Please Add Some Streaks To Continue
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
