import { College } from "@/types/college";
import Link from "next/link";

interface Props {
  college: College;
}

export default function CollegeCard({
  college
}: Props) {
  return (
  <Link href={`/college/${college.id}`}>
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
      <h2 className="text-2xl font-bold text-blue-600">
        {college.name}
      </h2>

      <p className="text-gray-600 mt-2">
        📍 {college.location}
      </p>

      <p className="mt-2">
        💰 Fees: ₹{college.fees}
      </p>

      <p className="mt-2">
        ⭐ Rating: {college.rating}
      </p>

      <p className="mt-2">
        🎯 Placement: {college.placement}%
      </p>

      <p className="text-gray-500 mt-3">
        {college.description}
      </p>
    </div>
  </Link>
);
}