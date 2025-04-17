import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { NavigationMenu } from "./ui/navigation-menu";

const SearchItem = () => {
  return (
    <div className="relative">
      <Search className="absolute top-1/4 left-2" size={20} />
      <Input className="px-8" placeholder="Search for items" />
    </div>
  );
};

export default SearchItem;
