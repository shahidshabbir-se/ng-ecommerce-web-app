import { Router } from 'express'
import { getProduct } from '../routes/get/getProduct.routes'
import { createCategory } from './create/createCategory.routes'
import { getCategory } from './get/getCategory.routes'
import { getCategoryByName } from './get/getCategoryByName.routes'
import { createProduct } from './create/createProduct.routes'
import { createBrand } from './create/createBrand.routes'
import { getBrandByName } from './get/getBrandByName.routes'
import { getCartItems } from './get/getCart.routes'
import { updateOrAddCartItem } from './add/addCart.routes'
import { getProductsByTerm } from '@routes/get/getProductsByTerm.routes'
import { delFromCart } from '@routes/del/delFromCart.routes'
import { createAddress } from './create/createAddress.routes'
import { createOrder } from './create/createOrder.routes'
import { getAdress } from './get/getAdress.routes'
import { createPayment } from './payment/payment.routes'
import { retrieveIntent } from './payment/retrieveIntent.routes'

const router = Router()

const product_route = '/product'
const category_route = '/category'
const cart_route = '/cart'
const address_route = '/address'

/* --------------- productRoutes --------------- */
router.get(`${product_route}/getProduct/:categoryId/:productId`, getProduct)
router.get(`${product_route}/getProductsByTerm`, getProductsByTerm)
router.post(`${product_route}/createProduct`, createProduct)

/* --------------- categoryRoutes --------------- */
router.get(`${category_route}/getCategory/:id`, getCategory)
router.get(`${category_route}/getCategoryByName`, getCategoryByName)
router.post(`${category_route}/createCategory`, createCategory)

// /* --------------- cartRoutes --------------- */
router.get(`${cart_route}/getCartItems`, getCartItems)
router.post(`${cart_route}/updateOrAddCartItem`, updateOrAddCartItem)
router.post(`${cart_route}/delFromCart`, delFromCart)

/* --------------- brandRoutes --------------- */
router.post('/brand/createBrand', createBrand)
router.get('/brand/getBrandByName/', getBrandByName)

/* --------------- addressRoutes --------------- */
router.post(`${address_route}/createAddress`, createAddress)
router.get(`${address_route}/getAddress`, getAdress)

/* --------------- OrderRoutes ---------------- */
router.post('/order/createOrder', createOrder)

/* ----------------- payment ----------------- */
router.post('/payment/createPayment', createPayment)
router.get('/payment/retrieveIntent', retrieveIntent)

export default router
