import React from "react";
import "./app.css";
import InputSection from "./Components/InputSection";
export default function App() {
  return (
    <>
      <div className="font-helvetica font-light h-screen bg-background">
        <section className="flex flex-col w-full align-center items-center bg-background">
          <header className="mt-7">
            <h1 className="text-todo text-7xl font-thin">todos</h1>
          </header>
          <InputSection />
          <div className="flex flex-col align-center md:mt-20 items-center text-gray text-xs">
            <p className="mt-2">Double-click to edit a todo</p>
            <p className="mt-2">Created by the TodoMVC Team</p>
            <p className="mt-2">Part of TodoMVC</p>
          </div>
        </section>
      </div>
    </>
  );
}
