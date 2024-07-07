import axios from 'axios'

export async function delFromCart(productId: string, variantId: number, size: string) {
    try {
        const response = await axios.post('http://localhost:8080/api/cart/delFromCart', {
            productId,
            variantId,
            size
        })
        return response.data
    } catch (error) {
        console.log('Error in delFromCart', error)
        return null
    }
}