import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeRole = async (userId, newRole) => {
    try {
      await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
      refetch();
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-white flex items-center gap-3">
        <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Manage Users
        </span>
        <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></div>
      </h2>

      <div className="overflow-hidden bg-slate-900/50 rounded-xl shadow-2xl border border-slate-700">
        <table className="table w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-800 to-slate-700">
              <th className="py-5 px-6 text-left text-teal-400 font-semibold">
                #
              </th>
              <th className="py-5 px-6 text-left text-teal-400 font-semibold">
                Name
              </th>
              <th className="py-5 px-6 text-left text-teal-400 font-semibold">
                Email
              </th>
              <th className="py-5 px-6 text-left text-teal-400 font-semibold">
                Role
              </th>
              <th className="py-5 px-6 text-left text-teal-400 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300"
              >
                <td className="py-4 px-6 text-slate-300">{index + 1}</td>
                <td className="py-4 px-6">
                  <span className="font-medium text-white">{user.name}</span>
                </td>
                <td className="py-4 px-6 text-slate-300">{user.email}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium inline-block
                    ${
                      user.role === "admin"
                        ? "bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-400 border border-purple-500/30"
                        : user.role === "moderator"
                        ? "bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-400 border border-blue-500/30"
                        : "bg-gradient-to-r from-slate-500/20 to-slate-500/10 text-slate-400 border border-slate-500/30"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-3">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeRole(user._id, "admin")}
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:hover:scale-100"
                        disabled={user.role === "admin"}
                      >
                        Make Admin
                      </button>
                    )}
                    {user.role !== "moderator" && (
                      <button
                        onClick={() => handleMakeRole(user._id, "moderator")}
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(45,212,191,0.5)] disabled:opacity-50 disabled:hover:scale-100"
                        disabled={user.role === "moderator"}
                      >
                        Make Moderator
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
