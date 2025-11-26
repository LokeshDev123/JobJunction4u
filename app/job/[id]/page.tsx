import JobDescriptionPage from "@/Components/JobDescription";

export default async function Page({params}:{params:{id:string}}) {

const { id } = await params;
   
    
    const data=await(await fetch(`http://localhost:3000/api/admin/jobs/fetch-jobs-by-id`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id:id})})).json()
  
    
    return (
        <JobDescriptionPage myjob={data.job}/>
    );
}