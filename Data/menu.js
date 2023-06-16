import t from '../translation';

export const menuUser1 = [
  {
    name: t('general_information'),
    icon: 'icon-t17',
    link: '/account',
  },
  {
    name: t('account_info'),
    icon: 'icon-login2',
    link: '/account/edit',
  },
  {
    name: t('order_manage'),
    icon: 'icon-t8',
    link: '/account/order-list',
  },
  {
    name: t('buyed_product'),
    icon: 'icon-cart1',
    link: '/account/order-product',
  },
  {
    name: t('wishlist'),
    icon: 'icon-like',
    link: '/account/wishlist',
  },
  {
    name: t('my_review'),
    icon: 'icon-t181',
    link: '/account/my-review',
  },
  {
    name: t('notification'),
    icon: 'bell',
    link: '/account/notification',
  },
];

export const menuUser2 = [
  {
    name: t('invoice_address'),
    icon: 'icon-t20',
    link: '/account/user-address?vat=true',
  },
  {
    name: t('received_location'),
    icon: 'icon-t9',
    link: '/account/user-address',
  },
];
