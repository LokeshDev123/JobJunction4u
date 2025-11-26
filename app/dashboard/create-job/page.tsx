"use client";

import DashboardNavbar from "@/Components/DashboardNavbar";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface JobFormData {
  jobTitle: string;
  jobDescription: string;
  image: File | null;
  jobCategory: string;
  jobRole: string;
  jobType: string;
  responsibilities: string[];
  skills: string[];
  salary: string;
  location: string;
  experience: string;
  jobLink: string;
  jobExpiryDate: string;
}

const jobOptions = {
  "Development": ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile App Developer"],
  "Design": ["UI/UX Designer", "Graphic Designer", "Product Designer"],
  "Marketing": ["Digital Marketer", "SEO Specialist", "Content Strategist"],
  "Management": ["Project Manager", "Product Manager", "Operations Manager"],
  "Sales": ["Sales Executive", "Account Manager", "Business Development"],
};

export default function Page() {
   const [categories, setCategories] = useState<{ _id: number; name: string }[]>([]);
  const [roles, setRoles] = useState<{ _id: string; name: string }[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
   const [loading, setloading] = useState(false)
   const router=useRouter()
   
   const [formloading, setformloading] = useState(false)
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: "",
    jobDescription: "",
    image: null,
    jobCategory: "",
    jobRole: "",
    jobType: "",
    responsibilities: [""],
    skills: [""],
    salary: "",
    location: "",
    experience: "",
    jobLink: "",
    jobExpiryDate: "",
  });


  useEffect(()=>{

    if(!sessionStorage.getItem("adminToken") && !sessionStorage.getItem("recruiterToken")){

      router.push("/dashboard/signin")
    }
  },[])


    const fetchCategories = async () => {
      try {
        setloading(true)
        const res = await fetch(`/api/admin/category/fetch-category`, {
          method: "POST",
        });
        const data = await res.json();
        setCategories(data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
      finally{
        setloading(false)
      }
    };
  
    useEffect(() => {
      fetchCategories();
    }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Reset job role when category changes
    if (name === "jobCategory") {
      setFormData((prev) => ({ ...prev, jobCategory: value, jobRole: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
    key: "responsibilities" | "skills"
  ) => {
    const values = [...formData[key]];
    values[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: values }));
  };

  const addArrayField = (key: "responsibilities" | "skills") => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const removeArrayField = (index: number, key: "responsibilities" | "skills") => {
    const values = [...formData[key]];
    values.splice(index, 1);
    setFormData((prev) => ({ ...prev, [key]: values }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();


    try {
      
   const token=sessionStorage.getItem("adminToken") || sessionStorage.getItem("recruiterToken")

       const formdata=new FormData()
    formdata.append("file",formData.image!)
    formdata.append("token",token!)
    
    setformloading(true)

    const uploadfile =await (await fetch(`/api/admin/jobs/uploadjobimage`,{
      method:'POST',
      body:formdata
    })).json()

    
    if(uploadfile.success){
      
      const response=await(await fetch(`/api/admin/jobs/createjob?token=${token}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },body:JSON.stringify({
          title:formData.jobTitle,
          description:formData.jobDescription,
          image_url:uploadfile.image,
          category:formData.jobCategory,
          role:formData.jobRole,
          job_type:formData.jobType,
          responsibilities:formData.responsibilities,
          skills:formData.skills,
          salary:formData.salary,
          location:formData.location,
          experience:formData.experience,
          job_link:formData.jobLink,
          job_expiry_date:formData.jobExpiryDate
        })
      })).json()
      
      if(response.success){
        setFormData({
          jobTitle: "",
          jobDescription: "",
          image: null,
          jobCategory: "",
          jobRole: "",
          jobType: "",
          responsibilities: [""],
          skills: [""],
          salary: "",
          location: "",
          experience: "",
          jobLink: "",
          jobExpiryDate: "",
        })
        setformloading(false)
        alert("Job is created Successfully")
      }else{
        setformloading(false)
        alert(response.message)
      }

    }

   
     } catch (error) {
      
      console.log(error);
      
    }

  };



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
    if (formData.jobCategory) {
      fetchRoles(formData.jobCategory);
    }
  }, [formData.jobCategory]);
  return (
    <>
    <DashboardNavbar/>
    <div className="min-h-screen  text-white flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl w-full max-w-3xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          🧾 Post a New Job
        </h2>

        {/* Job Title */}
        <div>
          <label className="block text-sm mb-2">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-500"
            placeholder="Enter job title"
            required
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm mb-2">Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:ring focus:ring-blue-500"
            placeholder="Enter job description"
            rows={4}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm mb-2">Upload Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-300"
            accept="image/*"
          />
        </div>

        {/* Job Category / Role / Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Job Category Dropdown */}
          <div>
            <label className="block text-sm mb-2">Job Category</label>
            <select
              name="jobCategory"
              value={formData.jobCategory}
              onChange={(e)=>setFormData((prev) => ({ ...prev, jobCategory: e.target.value, jobRole: "" }))}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category:{ _id: number; name: string },i: number) => (
                <option key={i} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Job Role Dropdown (depends on category) */}
          <div>
            <label className="block text-sm mb-2">Job Role</label>
            <select
              name="jobRole"
              value={formData.jobRole}
              onChange={(e)=>setFormData((prev) => ({ ...prev, jobRole: e.target.value }))}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              required
              disabled={!formData.jobCategory}
            >
              <option value="">
                {formData.jobCategory
                  ? "Select Role"
                  : "Select Category First"}
              </option>
              {roles.map((role: { _id: string; name: string },i: number) => (
                  <option key={i} value={role.name}>
                    {role.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Job Type Dropdown */}
          <div>
            <label className="block text-sm mb-2">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              required
            >
              <option value="">Select Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-sm mb-2">Responsibilities</label>
          {formData.responsibilities.map((res, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={res}
                onChange={(e) => handleArrayChange(index, e, "responsibilities")}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                placeholder={`Responsibility ${index + 1}`}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(index, "responsibilities")}
                  className="bg-red-600 px-3 rounded text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("responsibilities")}
            className="text-blue-400 text-sm"
          >
            + Add Responsibility
          </button>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm mb-2">Skills</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayChange(index, e, "skills")}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                placeholder={`Skill ${index + 1}`}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(index, "skills")}
                  className="bg-red-600 px-3 rounded text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("skills")}
            className="text-blue-400 text-sm"
          >
            + Add Skill
          </button>
        </div>

        {/* Salary / Location / Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2">Salary</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              placeholder="₹60,000/month"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              placeholder="Mumbai / Remote"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              placeholder="2+ years"
            />
          </div>
        </div>

        {/* Job Link */}
        <div>
          <label className="block text-sm mb-2">Job Link</label>
          <input
            type="url"
            name="jobLink"
            value={formData.jobLink}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600"
            placeholder="https://example.com/job"
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm mb-2">Job Expiry Date</label>
          <input
            type="date"
            name="jobExpiryDate"
            value={formData.jobExpiryDate}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600"
          />
        </div>

        {/* Submit Button */}
       {!formloading && <button
          type="submit"
          disabled={formloading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
        >
          Submit Job
        </button>}
      </form>
    </div>
    </>

  );
}
