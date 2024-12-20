import Home from "../pages/home"
import { IRoutesProps } from "../types/props"
import {Suspense} from "react"
import Blog from "../pages/blog"
import AboutUs from "../pages/aboutUs"
import Shop from "../pages/shop"
import OurChef from "../pages/ourChef"
import LogIn from "../pages/logIn"
import SignUp from "../pages/signUp"
import FAQ from "../pages/faq"
import ShoppingCart from "../pages/cart"
import Checkout from "../pages/checkout"
import DetailProduct from "../pages/detailProduct"
import DetailBlog from "../pages/detailBlog"
import Menu from "../pages/menu"

const GeneralRoutes : Array<IRoutesProps> = [
    {
        path: '/',  
        element: <Suspense> <Home /> </Suspense>,
        title: 'Home',
    },
    {
        path: '/menu',
        element: <Suspense> <Menu /> </Suspense>,
        title: 'Menu',
    },
    {
        path: '/blog',
        element: <Suspense> <Blog /> </Suspense>,
        title: 'Blog',
    },
    {
        path: '/about',
        element: <Suspense> <AboutUs /> </Suspense>,
        title: 'About',
    },
    {
        path: '/shop',
        element: <Suspense> <Shop/> </Suspense>,
        title: "Shop"
    },
    {
        path: '/team',
        element: <Suspense> <OurChef /> </Suspense>,
        title: 'Team'
    },
    {
        path: '/login',
        element: <Suspense> <LogIn /> </Suspense>,
        title: 'Login'
    },
    {
        path: '/signup',
        element: <Suspense> <SignUp /> </Suspense>,
        title: 'SignUp'
    },
    {
        path: '/faq',
        element: <Suspense> <FAQ /> </Suspense>,
        title: 'FAQ'
    },
    {
        path: 'cart',
        element: <Suspense> <ShoppingCart /> </Suspense>,
        title: "Shopping Cart"
    },
    {
        path: '/cart/checkout',
        element: <Suspense> <Checkout /> </Suspense>,
        title: 'Chef'
    },

    {
        path: '/detail-product/:id',
        element: <Suspense> <DetailProduct /> </Suspense>,
        title: 'Detail Product'
    },
    {
        path: 'blog/:id',
        element: <Suspense> <DetailBlog /> </Suspense>,
        title: "Detail Blog"
    },
]

export default GeneralRoutes