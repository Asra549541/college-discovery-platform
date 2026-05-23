"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import { College } from "@/types/college";

export default function ComparePage() {
  const [allColleges, setAllColleges] =
    useState<College[]>([]);

  const [selected, setSelected] = useState<
    string[]
  >([]);

  const [compared, setCompared] = useState<
    College[]
  >([]);

  const fetchColleges = async () => {
    try {
      const response = await api.get("/colleges");

      setAllColleges(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(
        selected.filter((item) => item !== id)
      );
    } else {
      if (selected.length < 3) {
        setSelected([...selected, id]);
      }
    }
  };

  const compareColleges = async () => {
    try {
      const response = await api.post(
        "/colleges/compare",
        {
          ids: selected
        }
      );

      setCompared(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center text-blue-600">
        Compare Colleges
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {allColleges.map((college) => (
          <div
            key={college.id}
            className={`p-6 rounded-xl shadow-md cursor-pointer ${
              selected.includes(college.id)
                ? "bg-blue-200"
                : "bg-white"
            }`}
            onClick={() =>
              handleSelect(college.id)
            }
          >
            <h2 className="text-2xl font-bold">
              {college.name}
            </h2>

            <p className="mt-2">
              📍 {college.location}
            </p>

            <p className="mt-2">
              💰 ₹{college.fees}
            </p>

            <p className="mt-2">
              ⭐ {college.rating}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={compareColleges}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl"
        >
          Compare Selected Colleges
        </button>
      </div>

      {compared.length > 0 && (
        <div className="overflow-x-auto mt-12">
          <table className="w-full bg-white shadow-lg rounded-xl">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">
                  Feature
                </th>

                {compared.map((college) => (
                  <th
                    key={college.id}
                    className="p-4"
                  >
                    {college.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-4 font-bold">
                  Location
                </td>

                {compared.map((college) => (
                  <td
                    key={college.id}
                    className="p-4 text-center"
                  >
                    {college.location}
                  </td>
                ))}
              </tr>

              <tr className="border-b">
                <td className="p-4 font-bold">
                  Fees
                </td>

                {compared.map((college) => (
                  <td
                    key={college.id}
                    className="p-4 text-center"
                  >
                    ₹{college.fees}
                  </td>
                ))}
              </tr>

              <tr className="border-b">
                <td className="p-4 font-bold">
                  Rating
                </td>

                {compared.map((college) => (
                  <td
                    key={college.id}
                    className="p-4 text-center"
                  >
                    ⭐ {college.rating}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold">
                  Placement
                </td>

                {compared.map((college) => (
                  <td
                    key={college.id}
                    className="p-4 text-center"
                  >
                    {college.placement}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}