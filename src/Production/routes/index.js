import { Router } from 'express'
import { customerRouter } from './customerRoutes.js'
import { authRouter } from './authRoutes.js'
import { shopRouter } from './shopRoutes.js';
import { searchRouter } from './searchRotes.js';
import { productRouter } from './productRoutes.js';
import { reviewRouter } from './reviewRoutes.js';
import { cartRouter } from './cartRoutes.js';
import { orderRouter } from './orderRoutes.js';
const userRouter = Router()

//layout
userRouter.use('/shop', shopRouter);

//authentication
userRouter.use('/auth', authRouter);

//customer
userRouter.use('/customer', customerRouter);

//product
userRouter.use('/product', productRouter);

//search
userRouter.use('/search', searchRouter);

//review
userRouter.use('/review', reviewRouter);

//cart
userRouter.use('/cart', cartRouter);

//orders
userRouter.use('/orders', orderRouter);



export { userRouter }