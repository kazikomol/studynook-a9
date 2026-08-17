"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = ({ value = "" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    value || searchParams.get("searchTerm") || ""
  );

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (search.trim()) {
      params.set("searchTerm", search.trim());
    } else {
      params.delete("searchTerm");
    }
    
    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-4 focus-within:ring-blue-600/10 focus-within:border-blue-600 transition-all overflow-hidden w-full"
    >
      <div className="pl-4 text-slate-400 shrink-0">
        <Search className="w-5 h-5" />
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search rooms..."
        className="w-full min-w-0 h-14 px-3 outline-none bg-transparent text-slate-700 placeholder:text-slate-400"
      />

      <button
        type="submit"
        className="shrink-0 h-10 px-4 mr-2 rounded-xl bg-default text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
};

export default SearchBar;