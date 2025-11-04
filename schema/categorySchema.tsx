import zod from "zod";


const categoryCreateSchema=zod.object({
    name:zod.string().min(3).max(50),
})

const deleteCategorySchema=zod.object({
    _id:zod.string(),
})


export {categoryCreateSchema,deleteCategorySchema}