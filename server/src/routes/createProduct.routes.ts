import { prisma } from '@configs/prisma.config'
import { Request, Response } from 'express'
// import { productData } from '@interfaces/product.interfaces'
import { v4 as uuidv4 } from 'uuid'

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    images,
    reg_price,
    sale_price,
    category_id,
    brand_id
  } = req.body
  const productID = uuidv4()
  try {
    // const productData: productData = {
    //   product_id: productID,
    //   name,
    //   description,
    //   images,
    //   reg_price,
    //   sale_price,
    //   category_id,
    //   brand_id
    // }
    const product = await prisma.product.create({
      data: {
        product_id: productID,
        name: name,
        description: description,
        images: images,
        reg_price: reg_price,
        sale_price: sale_price,
        category_id: category_id,
        brand_id: brand_id
      }
    })
    return res.status(201).json(product)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}
