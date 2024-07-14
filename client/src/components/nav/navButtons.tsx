'use client'
import { useSearchVisibilityStore } from '@store/index'
import { useAuthAsideVisibilityStore } from '@store/index'
import icons from '@icons'

export const SearchButton = ({
  buttonStyle,
  iconStyle
}: {
  buttonStyle?: string
  iconStyle?: string
}): JSX.Element => {
  const handleSearchBarVisibility = useSearchVisibilityStore(
    (state) => state.setSearchBarVisibility
  )

  return (
    <button
      onClick={() => handleSearchBarVisibility(true)}
      className={buttonStyle}
    >
      <icons.search className={iconStyle} />
    </button>
  )
}

export const AccountButton = ({
  buttonStyle,
  iconStyle
}: {
  buttonStyle?: string
  iconStyle?: string
}): JSX.Element => {
  const handleAuthAsideVisibility = useAuthAsideVisibilityStore(
    (state) => state.setAuthAsideVisibility
  )
  return (
    <button
      className={buttonStyle}
      onClick={() => handleAuthAsideVisibility(true)}
    >
      <icons.user className={iconStyle} />
    </button>
  )
}
