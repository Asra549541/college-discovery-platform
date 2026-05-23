"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

interface Props {
  params: {
    id: string;
  };
}

export default function CollegeDetail({
  params
}: Props) {
  const [college, setCollege] = useState<any>(null);

  const fetchCollege = async () => {
    try {
      const response = await api.get(
        `/colleges/${params.id}`
      );

      setCollege(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCollege();
  }, []);

  if (!college) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-600">
          {college.name}
        </h1>

        <p className="text-gray-600 mt-3">
          📍 {college.location}
        </p>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-100 p-4 rounded-xl">
            <h2 className="font-bold">Fees</h2>
            <p>₹{college.fees}</p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl">
            <h2 className="font-bold">Rating</h2>
            <p>{college.rating}</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-xl">
            <h2 className="font-bold">
              Placement
            </h2>
            <p>{college.placement}%</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">
            Overview
          </h2>

          <p className="mt-4 text-gray-700">
            {college.description}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">
            Courses Offered
          </h2>

          <ul className="list-disc ml-6 mt-4 text-gray-700">
            <li>B.Tech Computer Science</li>
            <li>B.Tech Mechanical</li>
            <li>B.Tech Civil</li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">
            Placements
          </h2>

          <p className="mt-4 text-gray-700">
            Average placement rate:
            {college.placement}%
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold">
            Reviews
          </h2>

          <div className="mt-4 bg-gray-100 p-4 rounded-xl">
            ⭐ Great campus and placements.
          </div>

          <div className="mt-4 bg-gray-100 p-4 rounded-xl">
            ⭐ Faculty is supportive.
          </div>
        </div>
      </div>
    </main>
  );
}