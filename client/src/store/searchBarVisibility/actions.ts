import useSearchVisibilityStore from './store'

// Action to set the selected color
export const setSearchBarVisibility = (visibility: boolean) => {
  useSearchVisibilityStore.setState({ searchBarVisibility: visibility })
}
