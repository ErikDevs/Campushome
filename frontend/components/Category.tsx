import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { Slider } from "@/components/ui/slider";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Category = () => {
  return (
    <div className="px-6 hidden md:flex">
      <Card>
        <CardHeader>Filter Items</CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label>Category</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          Price Rage
          <span className=" text-sm"> KES 1000 - 100k</span>
          <div className="my-4">
            {" "}
            <Slider defaultValue={[33]} max={100} step={1} />
          </div>
          <div className="my-6">
            <Label>University</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select University" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6">
            <Label>Location</Label>
            <Input placeholder="Location" />
          </div>
          <div className="flex gap-2 mt-4">
            <Button>Apply Filters</Button>
            <Button variant="outline">Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Category;
