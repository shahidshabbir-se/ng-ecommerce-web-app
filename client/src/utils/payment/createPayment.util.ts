import axios from 'axios';

export const createPayment = async (
  amount: number,
  email: string,
  paymentMethodId: string
) => {
  try {
    console.log('paymentMethodId:', paymentMethodId);
    console.log('amount:', amount);
    console.log('email:', email);

    const { data } = await axios.post('http://localhost:8080/api/payment/createPayment', {
      amount: amount * 100, // Convert to cents
      email,
      paymentMethodId
    });

    // Assuming the response structure includes `clientSecret` and possible `error`
    if (data.error) {
      console.error('Payment API error:', data.error);
      throw new Error(data.error);
    }
    console.log(data)

    return data;
  } catch (error:any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return { error: error.message || 'An error occurred' };
  }
};
