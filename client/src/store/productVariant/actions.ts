import useProductsStore from './store'

// Action to set the selected color
export const setSelectedColor = (color: string): void => {
  const setColor = useProductsStore.getState().setSelectedColor
  setColor(color)
}
