"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./input";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState("");
  const router = useRouter();

  useEffect(() => {
    router.push(`?title=${searchKey}`, { scroll: false });
  }, [searchKey, router]);

  return (
    <Input
      type="text"
      value={searchKey}
      onChange={(e) => setSearchKey(e.target.value)}
      placeholder="Search"
    />
  );
};

export default SearchBar;
