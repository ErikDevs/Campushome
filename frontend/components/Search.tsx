import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const SearchItem = () => {
  return (
    <div className="flex">
      <form action="/">
        <Input
          type="text"
          placeholder="search items"
          className="relative flex px-8 items-center"
        />
        <Search className="absolute top-[40%] md:top-[30%] mx-2" size={16} />
      </form>
    </div>
  );
};

export default SearchItem;
