

import zod from 'zod';

const createSubscriptionSchema=zod.object({
    plan_id:zod.string(),
    user_id:zod.string(),
    plan_name:zod.string(),
    razorpay_payment_id:zod.string(),
    subscription_id:zod.string(),
    subscription_end:zod.date(),
    authpasscode:zod.string(),

})

export {createSubscriptionSchema}