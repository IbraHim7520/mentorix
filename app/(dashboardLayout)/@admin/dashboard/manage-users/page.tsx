import UserRow from "@/components/ui/UserRow";
import { IUser } from "@/Interfaces/LoggedInUser.interface";
import { cookies } from "next/headers";

const UserManagementPage = async() => {
    const cookieStore = (await cookies()).getAll();

    const cookieHeader = cookieStore
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join("; ");

    const usersResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKKEND_URL}/api/v1/users/all-users`,
        {
            method: "GET",
            headers: {
                Cookie: cookieHeader,
            },
            cache: "no-cache",
        }
    );

    const data = await usersResponse.json();
    console.log(data)
    const usersData : IUser[] = data?.data || []
 
    return (
        <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-100">
            <tr className="text-sm">
              <th className="p-3 font-semibold text-gray-700">Name</th>
              <th className="p-3 font-semibold text-gray-700">Email</th>
              <th className="p-3 font-semibold text-gray-700">Role</th>
              <th className="p-3 font-semibold text-gray-700">Email Verified</th>
              <th className="p-3 font-semibold text-gray-700">Join Date</th>
              <th className="p-3 font-semibold text-gray-700">Status</th>
              <th className="p-3 font-semibold text-gray-700">Ban</th>
            </tr>
          </thead>
          <tbody>
            {usersData.length > 0 ? (
              usersData.map((user: any) => (
                <UserRow key={user.id} user={user} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default UserManagementPage;