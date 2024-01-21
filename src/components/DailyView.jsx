import React, { useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfDay,
  startOfMonth,
  getDay,
  isToday,
  startOfISOWeek,
  endOfWeek,
  startOfWeek,
} from "date-fns";
import { clsx } from "clsx";

const Weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const DailyView=()=>{
    const currentDate=new Date()
    const firstDay=startOfWeek(currentDate)
    const lastDay=endOfWeek(currentDate)

    const daysinWeek=eachDayOfInterval({
        start:firstDay,
        end:lastDay,
    })


    return (
        <div>
             <div className="container mx-auto p-4">
        <h2 className="text-center ">{format(currentDate, "MMMM yyyy")}</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        <div
          className={clsx("text-center border rounded-md p-2", {
            "bg-[#0369a0]": format(firstDay, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"),
            "text-[#ffffff]": format(firstDay, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"),
          })}
          
        >
          {format(firstDay, "d")}

       </div>
       </div>
       </div>
    );
}

export default DailyView