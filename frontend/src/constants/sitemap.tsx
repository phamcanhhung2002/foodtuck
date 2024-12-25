import { LoginOutlined, LogoutOutlined, SearchOutlined, ShoppingOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { ABOUT, ACCOUNT, BASE, BLOG, CART, LOGIN, MENU, SHOP, SIGNUP } from "./routeConstants";
import { IAction } from "../types/types";

interface ISitemap {
    title: string;
    path: string;
}

export const HEADER_SITEMAP : Array<ISitemap>= [
    {
      title: 'Home',
      path: BASE,
    },
    {
      title: 'Menu',
      path: MENU,
    },
    {
      title: 'Blog',
      path:  BLOG,
    },
    {
      title: 'Pages',
      path: '/pages',
    },
    {
      title: 'About',
      path: ABOUT,
    },
    {
      title: 'Shop',
      path: SHOP,
    },
    {
      title: 'Contact',
      path: '/contact',
    },
]

export const HEADER_ACTION : Array<IAction> = [
  {
    title: 'Search',
    icon: <SearchOutlined />,
  },
  {
    title: "Cart",
    icon: <ShoppingOutlined />,
    path: CART
  },
  {
    title: "Login",
    icon: <LoginOutlined />,
    path: LOGIN,
    hideOnLogIn: true
  },
  {
    title: "Sign Up",
    icon: <UserAddOutlined/>,
    path: SIGNUP,
    hideOnLogIn: true
  },
  {
    title: "My Account",
    icon: <UserOutlined/>,
    path: ACCOUNT,
    showOnLogIn: true
  },
  {
    title: "Logout",
    icon: <LogoutOutlined/>,
    path: BASE,
    showOnLogIn: true
  }
] 

export const FOOTER_SITEMAP : Array<ISitemap>= [
    {
        title: 'About us',
        path: '/about',
    },
    {
        title: 'Contact us',
        path: '/contact',
    },
    {
        title: 'Our Menu',
        path: '/menu',
    },
    {
        title: 'Team',
        path: '/team',
    },
    {
        title: 'FAQ',
        path: '/faq',
    }
]