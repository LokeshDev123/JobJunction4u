'use client'
import { useEffect, useState } from "react";

const RoleManager = () => {
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<{ _id: string; name: string }[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [role, setRole] = useState<string>("");
  const [myCategory, setMyCategory] = useState<{ _id: string; name: string }>({ _id: "", name: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Fetch categories once
  const fetchCategories = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/category/fetch-category`, { method: "POST" });
      const data = await res.json();
      setCategories(data.data || []);
      if (data.data.length > 0 && !myCategory._id) {
        setMyCategory(data.data[0]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch roles based on selected category
  const fetchRoles = async (categoryId: string): Promise<void> => {
    if (!categoryId) return;
    try {
      setLoadingRoles(true);
      const res = await fetch(`/api/admin/role/fetch-role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_id: categoryId }),
      });
      const data = await res.json();
      setRoles(data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoadingRoles(false);
    }
  };
  useEffect(() => {
    if (myCategory._id) {
      fetchRoles(myCategory._id);
    }
  }, [myCategory]);

  // ✅ Run only once on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Refetch roles when `myCategory` changes

  // ✅ Add new role
  const handleAddRole = async () => {
    if (!role.trim()) {
      setError("Please enter a role name");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res:any = await fetch(
        `/api/admin/role/create-role?token=${sessionStorage.getItem("adminToken")}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: role.trim(), category_id: myCategory._id }),
        }
      );

      if (!res.success) {

        setError("Failed to add role");
        return;
      }

      setRole("");
      setSuccess("Role added successfully!");
      await fetchRoles(myCategory._id); // ✅ Refresh role list only
    } catch (err) {
      console.error(err);
      setError("Failed to add role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl backdrop-blur-xl text-white border border-white/10 rounded-2xl p-6 shadow-xl">
      <h1 className="text-center text-3xl font-semibold my-6">Role Manager</h1>
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Category List */}
        <div className="flex-1 bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">All Categories</h3>
          {loading ? (
            <p className="text-gray-400 text-center">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="text-gray-400 text-sm italic text-center">No categories found</p>
          ) : (
            <ul className="divide-y divide-gray-800 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {categories.map((cat, index) => (
                <li
                  key={cat._id}
                  onClick={() => setMyCategory(cat)}
                  className={`cursor-pointer flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-200 ${
                    cat._id === myCategory._id ? "bg-gray-800/70" : "hover:bg-gray-800/50"
                  }`}
                >
                  <span className="text-sm font-medium">
                    {index + 1}. {cat.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add Role */}
        <div className="flex-1 bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">Add New Role</h3>
          <input
            type="text"
            placeholder="Enter Role name..."
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 mb-4 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none text-sm placeholder-gray-400 transition"
          />
          <button
            onClick={handleAddRole}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 active:scale-95"
            }`}
          >
            {loading ? "Adding..." : "Add Role"}
          </button>

          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-400 text-sm mt-2">{success}</p>}
        </div>

        {/* Role List */}
        <div className="flex-1 bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">
            Roles under {myCategory.name || "—"}
          </h3>

          {loadingRoles ? (
            <p className="text-gray-400 text-center">Loading roles...</p>
          ) : roles.length === 0 ? (
            <p className="text-gray-400 text-sm italic text-center">No roles found</p>
          ) : (
            <ul className="divide-y divide-gray-800 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {roles.map((role, index) => (
                <li
                  key={role._id}
                  className="flex items-center justify-between py-3 px-4 hover:bg-gray-800/70 rounded-lg transition-all duration-200"
                >
                  <span className="text-sm font-medium">
                    {index + 1}. {role.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleManager;
