'use client'
import Image from "next/image";
import {useState} from "react";
import TaskBar from "@/components/navigation/TaskBar";
import Desktop from "@/components/Desktop/Desktop";

export default function Home() {
  const [theme, setTheme] = useState()

  return (
    <div className={`${theme}  min-h-screen max-h-screen overflow-hidden`}>
      <Desktop />
      <TaskBar />
    </div>
  );
}
