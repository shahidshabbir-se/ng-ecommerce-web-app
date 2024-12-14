export const isHexColor = (color: string) =>
  /^#([0-9A-F]{3}){1,2}$/i.test(color)
