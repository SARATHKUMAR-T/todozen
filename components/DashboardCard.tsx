import React from "react";
import { Card } from "./ui/card";

export default function DashboardCard({ card }: { card: any }) {
  return (
    <Card className="mb-4  flex h-32 cursor-pointer rounded-sm">
      <div
        className={`flex w-3/5 items-center ${card.style.box} justify-center`}
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full  ${card.style.icon}`}
        >
          {card.icon}
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="mt-6 mb-2 text-center text-sm">{card.title} </p>
        <p className="text-center text-3xl font-bold">{card.count}</p>
      </div>
    </Card>
  );
}
