import React from 'react'
import Gallery from '@/src/components/specific/product_page/product_gallery'
import Image from 'next/image'
import getProduct from '@/src/utils/product/getProduct.utils'
import { productData } from '@/src/interfaces/product.interfaces'

export default async function Product() {
  const productData: productData = await getProduct(1, 1)
  return (
    <div>
      <div>
        <div>
          <Gallery
            images={productData.productVariants[1].images.map((image) => image)}
          />
        </div>
        <div>
          <p>
            {(productData.regPrice / productData.salePrice) * 100}% OFF Vacation
            Shop!*
          </p>
          <p>
            Home / Shoes / Platform Shoes / Faux Leather Leopard Print Platform
            Heels
          </p>
          <strong>{productData.productName}</strong>
          <div>
            <div>
              <span>{productData.regPrice}</span>
              {productData.salePrice && (
                <span>
                  {productData.salePrice}
                  <span>
                    ({(productData.regPrice / productData.salePrice) * 100}%
                    OFF)
                  </span>
                </span>
              )}
              <button>
                {productData.productVariants.map((variantImage) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={variantImage.variantId}
                    src={variantImage.variantImage}
                    alt={variantImage.variantName}
                  />
                ))}
              </button>
              <div>
                <button>US-0</button>
              </div>
              <button>Select Size</button>
            </div>
            <button>
              {/* <Image src="/svg/heart.svg" alt="" /> */}
              Save for Later
            </button>
          </div>
        </div>
        <div>
          {/* <Image
            src='https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BBZH_STG/on/demandware.static/-/Library-Sites-nastygal-content-global-sfra/default/dwe5f974ca/images/global/desktop_pdp_button_shoes.jpg'
            alt='Heels'
            height={100}
            width={100}
          /> */}
        </div>
      </div>
    </div>
  )
}
