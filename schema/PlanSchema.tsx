

import zod from "zod";

const createplanSchema=zod.object({
    period:zod.enum(["daily","weekly","monthly","yearly"]),
    
    amount:zod.number().min(5),


})

const fetchplanSchema=zod.object({
   plan_id:zod.string(),
})


export {createplanSchema,fetchplanSchema}