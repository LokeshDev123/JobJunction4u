
'use client'
import DashboardNavbar from "@/Components/DashboardNavbar";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
export default function Page() {

  const router=useRouter()
    interface blogschema{
        title:string;
        description:string;
        image:string;
        author:string;
        content:[]
    }
    
    const [content, setcontent] = useState([{headline:"",description:""}])

const addMoreContent=()=>{
    setcontent([...content,{headline:"",description:""}])
}



  useEffect(()=>{
if(!sessionStorage.getItem("adminToken")){router.push("/dashboard/signin")}
    
  },[])


const handleSubmit=async(oldData:blogschema,newData:FormData):Promise<blogschema>=>{

    
    const title=newData.get("title")
    const description=newData.get("description")
    const image=newData.get("image")
    const author=newData.get("author")

    const formdata=new FormData()
    formdata.append("file",image!)

  formdata.append("token",sessionStorage.getItem("adminToken")!)

   const uploadblogimage=await (await fetch(`/api/admin/blog/uploadblogimage`,{
        method:"POST",
        body:formdata
    })).json()

    if(uploadblogimage.success){
        const response=await (await fetch(`/api/admin/blog/createblog?token=${sessionStorage.getItem("adminToken")}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({image:uploadblogimage.image,title,author,content})
        })).json()


        
        
        if(response.success){
            toast.success("Blog Created Successfully",{duration:2000})
            setcontent([{headline:"",description:""}])
        }
        else{
            toast.error("Something went wrong",{duration:2000})
        }
    
    }
    else{
        toast.error("Something went wrong",{duration:2000})
    }

    



    
    
    

    return {
        title:"",
        description:"",
        image:"",
        author:"",
        content:[]
    }
}

const [state,formAction,isPending]=useActionState<blogschema,FormData>(handleSubmit, {
    title:"",
    description:"",
    image:"",
    author:"",
    content:[]
})
const handleupdate=(index:number,field:"headline"|"description",value:string)=>{
  
  const mycontent=[...content]
  
  mycontent[index][field]=value
  setcontent(mycontent)
  
}

    return (
      <>
       <Toaster />
      <DashboardNavbar/>



  <form action={formAction}  className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Blog Post</h2>

      {/* Image Upload */}
      <div>
        <label className="block text-gray-700 mb-1">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full border  text-black border-black rounded-md p-2"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          className="w-full border  text-black border-black rounded-md p-2"
        />
      </div>

      {/* Author */}
      <div>
        <label className="block text-gray-700 mb-1">Author</label>
        <input
          type="text"
          name="author"
          placeholder="Enter author name"
          className="w-full border  text-black border-black rounded-md p-2"
        />
      </div>

      {/* Content */}
      <div>
        <button type="button" className="bg-blue-600 my-4  text-white  p-2 rounded-md hover:bg-blue-700" onClick={addMoreContent}>Add More Content</button>
        
        
      { content.map((ele:{headline:string,description:string},i:number)=>(

          <div key={i}>

        <label className="block text-gray-700 mb-1">Content</label>
        
         <input
          type="text"
          name="headline"
            onChange={(e:ChangeEvent<HTMLInputElement>)=>handleupdate(i,"headline",e.target.value)}
          placeholder="Enter headline"
          className="w-full border my-2  text-black border-black rounded-md p-2"
          />
        <textarea
          name="description"
          onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>handleupdate(i,"description",e.target.value)}
          placeholder="Write your blog content here..."
          className="w-full border text-black border-black rounded-md p-2 h-32"
          ></textarea>
      </div>
        ))
    }


          </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>

         

      </>
    );
}