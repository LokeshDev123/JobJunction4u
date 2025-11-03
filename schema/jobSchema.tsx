import zod from "zod";


const jobCreateSchema=zod.object({
    title:zod.string().min(3).max(100),
    description:zod.string().min(10).max(5000),
    image_url:zod.url(),
    category:zod.string().min(3).max(50),
    role:zod.string().min(3).max(50),
    job_type:zod.string().min(3).max(50),
    responsibilities:zod.json(),
    skills:zod.json(),
    salary:zod.string().min(1).max(100),
    location:zod.string().min(3).max(100),
    experience:zod.string().min(3).max(100),
    job_expiry_date:zod.string().refine((date)=>{
        return !isNaN(Date.parse(date));
    },"Invalid date format"),

})

const jobUpdateSchema=jobCreateSchema.partial().extend({_id:zod.string()});


const jobDeleteSchema=zod.object({
    _id:zod.string(),
})

const jobSearchSchema=zod.object({
    search:zod.string(),
    skip:zod.int(),
})


export {jobCreateSchema,jobUpdateSchema,jobDeleteSchema,jobSearchSchema};