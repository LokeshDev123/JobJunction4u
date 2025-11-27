/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import DashboardNavbar from "./DashboardNavbar";

export default function EditJobDescription({ myjob }: { myjob: any }) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [form, setForm] = useState({ ...myjob });
  const [myCategory, setmyCategory] = useState(myjob.category);

  // Authenticate Admin/Recruiter
  useEffect(() => {
    if (!sessionStorage.getItem("adminToken") && !sessionStorage.getItem("recruiterToken")) {
      router.push("/signin");
    }
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    const res = await fetch("/api/admin/category/fetch-category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    if (json.success) setCategories(json.data);
  };

  // Fetch roles based on selected category
  const fetchRoles = async (categoryId: string) => {
    if (!categoryId) return;
    const res = await fetch("/api/admin/role/fetch-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category_id: categoryId }),
    });
    const json = await res.json();
    if (json.success) {
      setRoles(json.data);
      setmyCategory(json.category);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (form.category) {
      fetchRoles(form.category);
    }
  }, [form.category]);

  // Save Job Update
  const updateJob = async (e: FormEvent) => {
    e.preventDefault();

    const token =
      sessionStorage.getItem("adminToken") || sessionStorage.getItem("recruiterToken");

    const res = await fetch(`/api/admin/jobs/updatejob?token=${token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, category: myCategory }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Job updated successfully!");
    } else {
      alert(data.message || "Error updating job");
    }
  };

  // Basic field handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Skills & Responsibilities handler
  const handleArrayChange = (i: number, value: string, field: "skills" | "responsibilities") => {
    const updated = [...form[field]];
    updated[i] = value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayField = (field: "skills" | "responsibilities") => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayField = (field: "skills" | "responsibilities", index: number) => {
    const updated = form[field].filter((_: any, i: number) => i !== index);
    setForm({ ...form, [field]: updated });
  };

  if (!myjob)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Job Not Found
      </div>
    );

  return (
    <>
      <DashboardNavbar />

      <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-6">

        {/* Header */}
        <div className="mx-auto bg-white rounded-xl shadow p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Edit Job Posting</h2>
          <button onClick={() => router.back()}>
            <XMarkIcon className="h-7 w-7 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={updateJob}
          className="mx-auto bg-white mt-4 rounded-xl shadow p-4 sm:p-8 space-y-8"
        >
          {/* Job Preview */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img src={form.image_url} className="w-24 h-24 rounded-lg border shadow-sm" />

            <div className="flex flex-col gap-3 w-full">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
                placeholder="Job Title"
              />

              {/* Category, Role, Job Type */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                >
                  <option defaultChecked>{myCategory} (Default)</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                >
                  <option defaultChecked>{form.role?form.role:"Select Role"} (Default)</option>
                  {roles.map((r) => (
                    <option key={r._id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>

                <select
                  name="job_type"
                  value={form.job_type}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
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

          {/* Salary / Experience / Location / Expiry Date / Job Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="border p-2 rounded-md"
            />

            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="Experience"
              className="border p-2 rounded-md"
            />

            <input
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="border p-2 rounded-md"
            />

            <input
              type="date"
              name="job_expiry_date"
              value={form.job_expiry_date?.substring(0, 10)}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />

            {/* NEW JOB LINK FIELD */}
            <input
              name="job_link"
              value={form.job_link}
              onChange={handleChange}
              placeholder="Job Link"
              className="border p-2 rounded-md col-span-1 sm:col-span-2 lg:col-span-4"
            />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold">Job Description</h2>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border p-3 mt-3 w-full rounded-md"
              rows={5}
            />
          </div>

          {/* Responsibilities */}
          <div>
            <h2 className="text-xl font-semibold">Responsibilities</h2>

            <div className="mt-3 space-y-3">
              {form.responsibilities.map((item: string, i: number) => (
                <div key={i} className="flex gap-3">
                  <input
                    value={item}
                    onChange={(e) => handleArrayChange(i, e.target.value, "responsibilities")}
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
                className="bg-gray-200 px-4 py-1 rounded-md"
              >
                + Add Responsibility
              </button>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold">Skills</h2>

            <div className="mt-3 space-y-3">
              {form.skills.map((skill: string, i: number) => (
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
                className="bg-gray-200 px-4 py-1 rounded-md"
              >
                + Add Skill
              </button>
            </div>
          </div>

          {/* Save */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
