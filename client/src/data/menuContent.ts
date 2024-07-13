export interface MenuImage {
  imageUrl: string;
  imageLink: string;
  label: string;
}

export interface Item {
  label: string;
  link: string;
}

export interface Offers {
  itemList: Item[];
}


export interface MenuItemsList {
  menuItems: Item[];
}

export interface MenuItems {
  menuLabel: string;
  menuItemsList: MenuItemsList[];
}

export interface MenuProps {
  menuItems: MenuItems[];
  menuOffers?: Offers[];
  menuImage?: MenuImage;
  anchorLink?: string;
  anchorLabel: string;
}

export const MenuData: MenuProps[] = [
  {
    anchorLabel: 'NEW IN',
    menuItems: [
      {
        menuLabel: 'New In',
        menuItemsList: [
          {
            menuItems: [
              { label: 'New Clothes', link: '/new-in/clothes' },
              { label: 'New Dresses', link: '/new-in/dresses' },
              { label: 'New Swimwear', link: '/new-in/swimwear' },
              { label: 'New Shoes', link: '/new-in/shoes' },
              { label: 'New Accessories', link: '/new-in/accessories' },
              { label: 'New Plus Size', link: '/new-in/plus-size' },
              { label: 'New Petite', link: '/new-in/petite' },
              { label: 'Bestsellers', link: '/new-in/bestsellers' },
              { label: 'Back In Stock', link: '/new-in/back-in-stock' },
            ],
          },
        ],
      },
      {
        menuLabel: 'NOW TRENDING',
        menuItemsList: [
          {
            menuItems: [
              { label: 'Vacation Nights', link: '/now-trending/vacation-nights' },
              { label: 'Leopard Print', link: '/now-trending/leopard-print' },
              { label: 'The Eras Collection', link: '/now-trending/eras-collection' },
              { label: 'Concert Outfits', link: '/now-trending/concert-outfits' },
              { label: 'Pride', link: '/now-trending/pride' },
              { label: 'Disco', link: '/now-trending/disco' },
            ],
          },
        ],
      },
    ],
    menuOffers: [
      {
        itemList: [
          { label: '60% OFF Festival!*', link: '/offers/60-off-festival' },
          { label: 'Dresses Under $60!*', link: '/offers/dresses-under-60' },
          { label: 'Take an Extra 10% OFF Everything!* Use code: TREAT', link: '/offers/extra-10-off' },
          { label: 'Get It In Time For The Weekend! Express Shipping Now Available.', link: '/offers/express-shipping' },
        ],
      },
    ],
    menuImage: {
      imageUrl: 'https://www.nastygal.com/dw/image/v2/BBZH_PRD/on/demandware.static/-/Library-Sites-nastygal-content-global-sfra/default/dwa1d3f7e0/images/mm-images/mm_statementshoes.jpg?sw=244&q=65',
      imageLink: '/new-in',
      label: 'New In',
    },
  },
];