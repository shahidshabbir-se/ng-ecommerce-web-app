import { Router } from 'express'
import { getProduct } from './getProduct.routes'
import { createCategory } from './createCategory.routes'
import { getCategory } from './getCategory.routes'
import { getProductByTerm } from './getProductByTerm.routes'
import { createUser } from './createUser.routes'
import {
  verifyUserByCredentials,
  verifyUserFromToken
} from './verifyUser.routes'
const router = Router()

const product_route = '/product'
const category_route = '/category'
const user_route = '/user'

/* --------------- productRoutes --------------- */
// get product by id
router.get(`${product_route}/getProduct/:categoryId/:productId`, getProduct)
// get product by search term
router.get(`${product_route}/getProductByTerm`, getProductByTerm)

/* --------------- categoryRoutes --------------- */
// get category by id
router.get(`${category_route}/getCategory/:id`, getCategory)
// create category
router.post(`${category_route}/createCategory`, createCategory)

/* --------------- userRoutes --------------- */
// create user
router.post(`${user_route}/createUser`, createUser)
// verify user by credentials
router.get(`${user_route}/verify_by_credentials`, verifyUserByCredentials)
// verify user by token
router.get(`${user_route}/verify_by_token`, verifyUserFromToken)

export default router
