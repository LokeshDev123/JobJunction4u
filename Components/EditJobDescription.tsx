/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import DashboardNavbar from "./DashboardNavbar";

export default function EditJobDescription({
  myjob,
}: {
  myjob: {
    _id: string;
    title: string;
    description: string;
    image_url: string;
    category: string;
    role: string;
    job_type: string;
    location: string;
    responsibilities: string[];
    skills: string[];
    salary: string;
    experience: string;
    job_link: string;
    created_at: string;
    job_expiry_date: string;
  };
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(true);

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [roles, setRoles] = useState<{ _id: string; name: string }[]>([]);

  const [form, setForm] = useState({ ...myjob });

  useEffect(() => {
    if (!sessionStorage.getItem("adminToken")) {
      router.push("/signin");
    }
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    const res = await (
      await fetch("/api/admin/category/fetch-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    if (res.success) setCategories(res.data);
  };

  // Fetch roles based on category
  const fetchRoles = async (categoryId: string) => {
    const res = await (
      await fetch("/api/admin/role/fetch-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_id: categoryId }),
      })
    ).json();

    if (res.success) setRoles(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (form.category) {
      fetchRoles(form.category);
    }
  }, [form.category]);

  // Save updated job
  const updateJob = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `/api/admin/jobs/updatejob?token=${sessionStorage.getItem("adminToken")?sessionStorage.getItem("adminToken"):sessionStorage.getItem("recruiterToken")}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    if (data.success) {
      alert("Job updated successfully!");
      setIsEditing(false);
    } else {
      alert("Error updating job");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: "skills" | "responsibilities"
  ) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayField = (field: "skills" | "responsibilities") => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayField = (field: "skills" | "responsibilities", index: number) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updated });
  };

  if (!myjob) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Job not found
      </div>
    );
  }

  return (
    <>
      <DashboardNavbar />

      <div className="min-h-screen bg-gray-50 py-6 px-3 sm:px-6">
        {/* Header */}
        <div className="mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Edit Job Details</h2>
          <button onClick={() => router.back()}>
            <XMarkIcon className="h-7 w-7 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={updateJob}
          className="mx-auto bg-white mt-4 rounded-xl shadow-md p-4 sm:p-8 space-y-8"
        >
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img src={form.image_url} className="w-24 h-24 rounded-xl" />

            <div className="flex flex-col gap-3 w-full">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
                placeholder="Job Title"
              />

              {/* Category, Role, Job Type Row */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">

                {/* Category */}
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-md w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                {/* Role */}
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-md w-full"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>

                {/* Job Type */}
                <select
                  name="job_type"
                  value={form.job_type}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-md w-full"
                >
                  <option value="">Select Job Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>
          </div>

          {/* Meta Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["location", "experience", "salary"].map((field) => (
              <input
                key={field}
                name={field}
                value={(form as any)[field]}
                onChange={handleChange}
                placeholder={field}
                className="border p-2 rounded-md w-full"
              />
            ))}
          </div>

          <hr />

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold">Job Description</h2>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border p-3 mt-3 w-full rounded-md"
              rows={4}
            />
          </div>

          {/* Responsibilities */}
          <div>
            <h2 className="text-xl font-semibold">Responsibilities</h2>

            <div className="mt-3 space-y-3">
              {form.responsibilities.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <input
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(i, e.target.value, "responsibilities")
                    }
                    className="border p-2 rounded-md w-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField("responsibilities", i)}
                    className="bg-red-500 text-white px-3 rounded-md"
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addArrayField("responsibilities")}
                className="bg-gray-200 px-3 py-1 rounded-md"
              >
                + Add Responsibility
              </button>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold">Skills</h2>

            <div className="mt-3 space-y-3">
              {form.skills.map((skill, i) => (
                <div key={i} className="flex gap-3">
                  <input
                    value={skill}
                    onChange={(e) => handleArrayChange(i, e.target.value, "skills")}
                    className="border p-2 rounded-md w-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField("skills", i)}
                    className="bg-red-500 text-white px-3 rounded-md"
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addArrayField("skills")}
                className="bg-gray-200 px-3 py-1 rounded-md"
              >
                + Add Skill
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
