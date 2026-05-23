"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import { College } from "@/types/college";

import CollegeCard from "@/components/CollegeCard";

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");

  const fetchColleges = async () => {
    try {
      const response = await api.get(
        `/colleges?search=${search}`
      );

      setColleges(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center text-blue-600">
        College Discovery Platform
      </h1>

      <div className="max-w-xl mx-auto mt-8">
        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-4 rounded-xl border"
        />

        <button
          onClick={fetchColleges}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-4 w-full"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {colleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
          />
        ))}
      </div>
    </main>
  );
}