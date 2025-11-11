
import zod from "zod";


const roleCreateSchema=zod.object({
    category_id:zod.string(),
    name:zod.string().min(3).max(50),
})


const deleteRoleSchema=zod.object({
    _id:zod.string(),
})


const roleFetchSchema=zod.object({
  category_id:zod.string(),

})

export {roleCreateSchema,deleteRoleSchema,roleFetchSchema}