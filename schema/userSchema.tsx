import zod from "zod";


const createUserSchema=zod.object({
    name:zod.string().min(3).max(26).trim(),
    email:zod.email(),
    mobile_no:zod.string().min(10).max(10),
    user_type:zod.enum(["admin","user","recruiter"]),
    password:zod.string().min(6).max(20),
    cpassword:zod.string().min(6).max(20),
    authpasscode:zod.string(),
})

const loginUserSchema=zod.object({
    mobile_no:zod.string().min(10).max(10),
    password:zod.string().min(6).max(20),
})


const forgetPasswordSchena=zod.object({
    mobile_no:zod.string().min(10).max(10),
    newpassword:zod.string().min(6).max(20),
     cpassword:zod.string().min(6).max(20),
})

const deleteUserSchema=zod.object({
    _id:zod.string(),
})

const userSearchSchema=zod.object({
    search:zod.string(),
})

export {createUserSchema,loginUserSchema,deleteUserSchema,forgetPasswordSchena,userSearchSchema};