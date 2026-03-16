"use client";

import { UserSession } from "@/Utils/clientSideSession";
import { useState } from "react";
import { toast } from "sonner";

// types
export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  role: "STUDENT" | "ADMIN" | "INSTRUCTOR";
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
}

const UserRow = ({ user }: { user: IUser }) => {
  const loggedinUser = UserSession();

  const [userban, setUserban] = useState(user.isBanned);
  const [loading, setLoading] = useState(false);

const updateBanStatus = async (userId: string, isBanned: boolean) => {
  if (loggedinUser?.user?.id === userId) {
    return toast.error("You cannot ban yourself!");
  }

  setLoading(true);

  const prevState = userban;
  setUserban(isBanned);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/users/user-update/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isBanned }),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result?.message || "Failed to update user");
    }

    setUserban(result.data.isBanned);
    toast.success(isBanned ? "User Banned" : "User Unbanned");
  } catch (error: any) {
    setUserban(prevState);
    toast.error(error.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="p-3 font-medium">{user.name}</td>

      <td className="p-3 text-gray-600">{user.email}</td>

      <td className="p-3">
        <span
          className={`px-2 py-1 rounded text-xs ${
            user.role === "ADMIN"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {user.role}
        </span>
      </td>

      <td className="p-3 text-sm">
        {user.emailVerified ? (
          <span className="text-green-600">Verified</span>
        ) : (
          <span className="text-red-500">Unverified</span>
        )}
      </td>

      <td className="p-3 text-sm text-gray-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      <td className="p-3 text-sm text-gray-500">{user.status}</td>

      <td className="p-3 text-sm text-gray-500">
{userban ? (
  <button
    onClick={() => updateBanStatus(user.id, false)}
    disabled={loading}
    className="px-3 py-1 bg-green-500 rounded-sm shadow text-white disabled:opacity-50"
  >
    {loading ? "Processing..." : "Unban"}
  </button>
) : (
  <button
    onClick={() => updateBanStatus(user.id, true)}
    disabled={loading}
    className="px-3 py-1 bg-red-500 rounded-sm shadow text-white disabled:opacity-50"
  >
    {loading ? "Processing..." : "Ban"}
  </button>
)}
      </td>
    </tr>
  );
};

export default UserRow;