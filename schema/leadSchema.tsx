import * as z from "zod";

const leadSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits long"),
    message: z.string().min(10, "Message must be at least 10 characters long").max(1000, "Message must be at most 1000 characters long"),
})

export default leadSchema;