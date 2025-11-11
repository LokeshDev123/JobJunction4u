"use client";
import { useEffect, useState } from "react";

export default function CategoryManager() {
  const [categories, setCategories] = useState<{ _id: number; name: string }[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`/api/admin/category/fetch-category`, {
        method: "POST",
      });
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category
  const handleAddCategory = async () => {
    if (!category.trim()) {
      setError("Please enter a category name");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(
        `/api/admin/category/create-category?token=${sessionStorage.getItem("adminToken")}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: category.trim() }),
        }
      );

   if (!res.success) {

        setError("Failed to add category");
        return;
      }
      setCategory("");
      setSuccess("Category added successfully!");
      await fetchCategories();
    } catch (err) {
      console.error(err);
      setError("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="  flex justify-center items-center text-white">
      <div className="w-full max-w-7xl backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-10  text-white">
          Category Manager
        </h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Add Category */}
          <div className="flex-1 bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-indigo-300">Add New Category</h3>
            <input
              type="text"
              placeholder="Enter category name..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 mb-4 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none text-sm placeholder-gray-400 transition"
            />
            <button
              onClick={handleAddCategory}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 active:scale-95"
              }`}
            >
              {loading ? "Adding..." : "Add Category"}
            </button>

            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
            {success && <p className="text-green-400 text-sm mt-3">{success}</p>}
          </div>

          {/* Right: Category List */}
          <div className="flex-1 bg-gray-900/60 border border-gray-800 rounded-2xl p-6 overflow-hidden">
            <h3 className="text-xl font-semibold mb-4 text-indigo-300">
              All Categories
            </h3>

            {categories.length === 0 ? (
              <p className="text-gray-400 text-sm italic text-center">
                No categories found
              </p>
            ) : (
              <ul className="divide-y divide-gray-800  max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                {categories.map((cat, index) => (
                  <li
                    key={cat._id}
                    className="flex items-center justify-between py-3 px-4 hover:bg-gray-800/70 rounded-lg transition-all duration-200"
                  >
                    <span className="text-sm font-medium">
                      {index + 1}. {cat.name}
                    </span>
                  
                  </li>
                ))}

                 
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
