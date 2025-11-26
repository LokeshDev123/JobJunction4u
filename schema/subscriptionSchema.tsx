

import zod from 'zod';

const createSubscriptionSchema=zod.object({
   razorpayOrderId:zod.string(),
   razorpayPaymentId:zod.string(),
   razorpaySignature:zod.string(),

})

export {createSubscriptionSchema}