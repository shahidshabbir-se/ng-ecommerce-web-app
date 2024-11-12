import { Router } from 'express'
import { getProduct } from '../routes/get/getProduct.routes'
import { createCategory } from './create/createCategory.routes'
import { getCategory } from './get/getCategory.routes'
import { getProductByTerm } from './get/getProductByTerm.routes'
import { createProduct } from './create/createProduct.routes'
import { createUser } from './create/createUser.routes'
import { createBrand } from './create/createBrand.routes'
import { getCartItems } from './get/getCart.routes'
import { updateOrAddCartItem } from './add/addCart.routes'
import { getProductsByTerm } from '@routes/get/getProductsByTerm.routes'
import { delFromCart } from '@routes/del/delFromCart.routes'
import { handleGoogleAuthCallback } from './auth/googleAuth.routes'
import { verifyByTokens } from './auth/verifyByTokens.routes'
import { verifyByCredentials } from './auth/verifyByCredentials.routes'
import { createAddress } from './create/createAddress.routes'
import { createOrder } from './create/createOrder.routes'

import passport from 'passport'
import { getAdress } from './get/getAdress.routes'
import { createPayment } from './payment/payment.routes'
import { retrieveIntent } from './payment/retrieveIntent.routes'

const router = Router()

const product_route = '/product'
const category_route = '/category'
const user_route = '/user'
const cart_route = '/cart'
const auth_route = '/auth'
const address_route = '/address'
/* --------------- productRoutes --------------- */
// get product by id
router.get(`${product_route}/getProduct/:categoryId/:productId`, getProduct)
// get product by search term
router.get(`${product_route}/getProductByTerm`, getProductByTerm)
// // create product
router.post(`${product_route}/createProduct`, createProduct)
//
// /* --------------- categoryRoutes --------------- */
// // get category by id
router.get(`${category_route}/getCategory/:id`, getCategory)
// // create category
router.post(`${category_route}/createCategory`, createCategory)
// // get category by search term
router.get(`${category_route}/getProductsByTerm`, getProductsByTerm)
//
// /* --------------- userRoutes --------------- */
// // create user
router.post(`${user_route}/createUser`, createUser)
// // verify user by credentials
router.post(`${user_route}/verifyUserByCredentials`, verifyByCredentials)
//
// // verify user by token
router.get(`${user_route}/verifyUserByToken`, verifyByTokens)
// /* --------------- authRoutes --------------- */
router.get(
  `${auth_route}/google`,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })
)
//
router.get(
  `${auth_route}/google/callback`,
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  }),
  handleGoogleAuthCallback
)
//
// /* --------------- cartRoutes --------------- */
// // get cart items
router.get(`${cart_route}/getCartItems`, getCartItems)
// // add item to cart
router.post(`${cart_route}/updateOrAddCartItem`, updateOrAddCartItem)
// // remove item from cart
router.post(`${cart_route}/delFromCart`, delFromCart)
//
// /* --------------- brandRoutes --------------- */
// // create brand
router.post('/brand/createBrand', createBrand)
//
// /* --------------- addressRoutes --------------- */
// // create address
router.post(`${address_route}/createAddress`, createAddress)
router.get(`${address_route}/getAddress`, getAdress)
//
// /* --------------- OrderRoutes ---------------- */
// // create order
router.post('/order/createOrder', createOrder)
//
// /* ----------------- payment ----------------- */
// // create payment
router.post('/payment/createPayment', createPayment)
// // retrieve payment intent
router.get('/payment/retrieveIntent', retrieveIntent)

export default router
