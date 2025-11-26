import { title } from "process";
import * as z from "zod";

const blogSchema=z.object({
    title:z.string().min(5,"Title must be at least 5 characters long").max(100,"Title must be at most 100 characters long"),
    author:z.string().min(3,"Author must be at least 3 characters long").max(100,"Author must be at most 100 characters long"),
    image:z.url("Image must be a valid URL"),
    content:z.array(z.object({
        headline:z.string().min(5,"Headline must be at least 5 characters long"),
        description:z.string().min(10,"Content must be at least 10 characters long")
    }))
})


const deleteSchema=z.object({
    _id:z.string()
})

export {blogSchema,deleteSchema}