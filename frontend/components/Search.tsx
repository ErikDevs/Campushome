import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";

const SearchItem = () => {
  return (
    <div className="flex relative items-center  gap-2 border px-6 py-2 rounded-md">
      <Search size={20} />
      <Dialog>
        <DialogTrigger>Search items ...</DialogTrigger>
        <DialogContent className="w-[50rem]">
          <Input />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchItem;
