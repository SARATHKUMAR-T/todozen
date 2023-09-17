import React from "react";
import { Card, CardContent, CardDescription } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import HoverDisplay from "./HoverDisplay";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "./ui/use-toast";

export default function TodoCard({ todo }: { todo: any }) {
  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["x-auth-token"] = token;
  }
  const completeChange = (id: string) => {
    console.log(id);
  };

  //   delete function
  const handleDelete = async (id: string) => {
    const response = await fetch(
      `https://zemo-backend.vercel.app/api/streak/delete/${id}`,
      {
        method: "DELETE",
        headers,
      }
    );
    const result = await response.json();
    if (result.message === "Streak Deleted Successfully!") {
      queryClient.invalidateQueries();
      toast({
        title: result.message,
        description: "Don't forget to comeback again!",
        duration: 3000,
      });
    } else if (result.message === "error occured") {
      toast({
        title: result.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: result.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex gap-1">
      <HoverDisplay title="Mark As Completed">
        <Card className=" flex items-center justify-center px-4 py-2">
          <Checkbox
            id="checked"
            onCheckedChange={() => completeChange(todo._id)}
            className="rounded-sm h-6 w-6"
          />
        </Card>
      </HoverDisplay>
      <Card className="flex justify-between items-center px-3 py-2 gap-3 w-full ">
        <h3 className="capitalize font-semibold">{todo.todoname}</h3>
        <CardDescription>{todo.description}</CardDescription>
        {todo.deadline && <p className="text-red-500">{todo.deadline}</p>}

        <Button variant="secondary">Delete</Button>
      </Card>
    </div>
  );
}
