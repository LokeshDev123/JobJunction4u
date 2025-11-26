import EditJobDescription from "@/Components/EditJobDescription";

export default async function Page({params}:{params:{id:string}}) {

const { id } = await params;
   
    
    const data=await(await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/jobs/fetch-jobs-by-id`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id:id})})).json()
  
    
    return (
        <EditJobDescription myjob={data.job}/>
    );
}