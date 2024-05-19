"use client";
import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const Menu = (props) => {
  const { title, onData, onToggle, idx, subject } = props;
  const [searchInput, setSearchInput] = useState("");
  const [activeComponent, setActiveComponent] = useState("OtherComponent"); // State to manage active component
  const router = useRouter();
  const handleChange = (event) => {
    const data = event.target.value;
    setSearchInput(data);

    // Call the parent callback function with the data
    onData(data);
  };

  const toggleComponent = () => {
    setActiveComponent((prev) =>
      prev === "Lesson" ? "OtherComponent" : "Lesson"
    );
    onToggle(activeComponent);
  };
  const takeHome = () => {
    router.push("/");
  };

  const takeProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="z-50 flex w-full absolute top-0 py-3 items-center  shadow-md shadow-yellow-500/40 bg-gradient-to-r from-[#131862] to-[#546bab]">
      <IconButton
        variant="text"
        className="rounded-full text-lime-200 flex-1 w-14"
        size="lg"
      >
        <i className="fas fa-bars fa-lg" />
      </IconButton>
      <IconButton
        onClick={takeProfile}
        color="lime"
        variant="text"
        className="rounded-full flex-1 hover:text-white"
      >
        <i className="fa fa-user fa-lg" />
      </IconButton>
      <h1 className="ml-2 text-lime-700 text-2xl flex-0 mr-2">
        {subject ? subject + " " + title : idx ? title + idx : title}
      </h1>
      <div className="flex flex-initial md:w-[42%] min-w-32 mx-2 py-1 items-center rounded-3xl bg-gray-200 bg-opacity-50 focus-within:shadow-md focus-within:shadow-red-700 ">
        <IconButton
          color="lime"
          variant="text"
          className="rounded-full"
          size="lg"
        >
          <i className="fa fa-search fa-lg" />
        </IconButton>
        <input
          type="search"
          placeholder="Search"
          className="bg-transparent text-lime-200 outline-none flex-grow"
          value={searchInput}
          onChange={handleChange}
        />
      </div>
      {title === "Lesson " ? (
        <IconButton onClick={takeHome} className="rounded-full">
          <i className="fa fa-save fa-lg" />
        </IconButton>
      ) : title === "Journeys" ? (
        <IconButton onClick={takeHome} className="rounded-full">
          <i className="fa fa-home fa-lg" />
        </IconButton>
      ) : (
        <IconButton onClick={toggleComponent} className="rounded-full">
          <i className="fa fa-toggle-on fa-lg" />
        </IconButton>
      )}
    </div>
  );
};

export default Menu;
