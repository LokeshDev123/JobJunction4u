
import zod from "zod";


const roleCreateSchema=zod.object({
    name:zod.string().min(3).max(50),
})


const deleteRoleSchema=zod.object({
    _id:zod.string(),
})


const roleFetchSchema=zod.object({
    category_name:zod.string(),

})

export {roleCreateSchema,deleteRoleSchema,roleFetchSchema}