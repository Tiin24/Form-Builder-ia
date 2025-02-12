"use client";
import GradientBg from "@/app/_data/GradientBg";
import Styles from "@/app/_data/Styles";
import Themes from "@/app/_data/Themes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerProps } from "@/types";
import Image from "next/image";
import React, { useState } from "react";

function Controller({ selectedTheme, selectedBackground,selectedStyle }: ControllerProps) {
  const [showMore, setShowMore] = useState(6);
  return (
    <div>
      <h2 className="my-1">Themes</h2>
      <Select onValueChange={(value) => selectedTheme(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes.map((theme, index) => (
            <SelectItem value={theme.theme} key={index}>
              <div className="flex gap-3">
                <div className="flex">
                  <div
                    className="h-5 w-5 rounded-l-md"
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.accent }}
                  ></div>
                  <div
                    className="h-5 w-5 rounded-r-md"
                    style={{ backgroundColor: theme.neutral }}
                  ></div>
                </div>
                {theme.theme}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Background Selection Controller  */}
      <h2 className="mt-8 my-1"> Background </h2>
      <div className="grid grid-cols-3 gap-5">
        {GradientBg.map(
          (bg, index) =>
            index < showMore && (
              <div
                key={index}
                onClick={() => selectedBackground(bg.gradient)}
                className=" w-full h-[70px] rounded-lg cursor-pointer
                hover:border-black hover:border-2 flex items-center justify-center
                "
                style={{ background: bg.gradient }}
              >
                {index == 0 && "None"}
              </div>
            )
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="w-full my-1 "
        onClick={() => setShowMore(showMore > 6 ? 6 : 20)}
      >
        {showMore > 6 ? "Show Less" : "Show More"}
      </Button>

       {/* Style Selection Controller  */}
       <div>
          <label>Style</label>
          <div className='grid grid-cols-3  gap-3'>
            {Styles.map((item,index)=>(
                <div key={index}>
              <div className='cursor-pointer hover:border-2 rounded-lg' onClick={() => selectedStyle({ key: item.key, value: item.value })}>
                <Image src={item.img} width={600} height={80} className='rounded-lg' alt="style"/>
              
              </div>
                <h2 className='text-center'>{item.name}</h2>
                </div>
            ))}
          </div>
        </div>
    </div>
  );
}

export default Controller;
