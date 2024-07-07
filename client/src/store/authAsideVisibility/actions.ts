import useSearchVisibilityStore from './store'

// Action to set the selected color
export const setAuthAsideVisibility = (visibility: boolean) => {
  useSearchVisibilityStore.setState({ authAsideVisibility: visibility })
}
