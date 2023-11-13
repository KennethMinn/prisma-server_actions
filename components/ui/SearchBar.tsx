"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Input } from "./input";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchKey = form.search.value;
    if (!searchKey) return;
    newParams.set("title", searchKey);

    router.push(`?${newParams}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        name="search"
        placeholder="Search"
        defaultValue={searchParams?.get("title") || ""}
      />
    </form>
  );
};

export default SearchBar;
