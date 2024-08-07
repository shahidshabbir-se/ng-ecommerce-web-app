import React from 'react'
import { getAddress } from '@utils/address/getAddress.utils'
import { Address as AddressType } from '@interfaces/address.interfaces'

interface AddressProps {
  userId: number
  selectedAddressId: number | null
  onSelectAddress: (addressId: number) => void
}

const Address: React.FC<AddressProps> = ({ userId, selectedAddressId, onSelectAddress }) => {
  const [addresses, setAddresses] = React.useState<AddressType[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  const fetchAddresses = async () => {
    setLoading(true)
    try {
      const fetchedAddresses: AddressType[] = await getAddress(userId)
      setAddresses(fetchedAddresses)
    } catch (error) {
      console.error('Error fetching addresses:', error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchAddresses()
  }, [userId])

  return (
    <div className='mb-4 bg-white px-5 py-6 text-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <strong className='font-extraBold text-xl'>Delivery Addresses</strong>
        <button
          onClick={() => {/* Show form/modal to add new address */}}
          className='font-bold underline'
        >
          Add New Address
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : addresses.length > 0 ? (
        addresses.map((address) => (
          <div
            key={address.addressId}
            className={`flex items-start gap-2 p-2 font-bold leading-6 ${
              selectedAddressId === address.addressId ? 'bg-gray-200' : ''
            }`}
          >
            <input
              type='radio'
              className='mt-1'
              checked={selectedAddressId === address.addressId}
              onChange={() => onSelectAddress(address.addressId)}
            />
            <div>
              <p>Address Line: {address.addressLine}</p>
              <p>City: {address.city}</p>
              <p>State: {address.state}</p>
              <p>Country: {address.country}</p>
              <p>Postal Code: {address.postalCode}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No addresses found.</p>
      )}
    </div>
  )
}

export default Address
