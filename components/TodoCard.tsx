import React, { useEffect, useState } from "react";
import { Card, CardDescription } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "./ui/use-toast";
import { Trash2 } from "lucide-react";

export default function TodoCard({ todo }: { todo: any }) {
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(todo.isDone);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsChecked(todo.isDone);
  }, [todo.isDone]);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["x-auth-token"] = token;
  }

  // update functionality
  const completeChange = async (id: string) => {
    const response = await fetch(
      `https://todozen-backend.vercel.app/api/todo/update/${id}`,
      { method: "PUT", headers }
    );
    const result = await response.json();
    console.log(result);
    if (result.message === "ToDo Updated Successfully!") {
      setIsChecked(!isChecked);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: result.message,
        duration: 3000,
      });
    } else {
      toast({
        title: result.message,
        variant: "destructive",
      });
    }
  };

  //   delete function
  const handleDelete = async (id: string) => {
    const response = await fetch(
      `https://todozen-backend.vercel.app/api/todo/delete/${id}`,
      {
        method: "DELETE",
        headers,
      }
    );
    const result = await response.json();
    if (result.message === "ToDo Deleted Successfully!") {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
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
      <Card className=" flex items-center justify-center px-4 py-2">
        <Checkbox
          checked={isChecked}
          id="checked"
          onCheckedChange={() => completeChange(todo._id)}
          className="rounded-sm h-6 w-6"
        />
      </Card>
      <Card className="flex justify-between items-center px-3 py-2 gap-3 w-full ">
        <h3 className="capitalize font-semibold">{todo.todoname}</h3>
        <CardDescription>{todo.description}</CardDescription>
        {todo.deadline && <p className="text-red-500">{todo.deadline}</p>}

        <Button variant="ghost" onClick={() => handleDelete(todo._id)}>
          <Trash2 />
        </Button>
      </Card>
    </div>
  );
}
