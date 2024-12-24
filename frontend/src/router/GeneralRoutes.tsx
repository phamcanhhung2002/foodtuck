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
import { ACTIVATE, BASE, CART, CHECKOUT, DETAIL_PRODUCT, LOGIN, ORDER_FINALIZE, SHOP, SIGNUP } from "../constants/routeConstants"
import OrderFinalize from "../pages/orderFinalize"

const GeneralRoutes : Array<IRoutesProps> = [
    {
        path: BASE,  
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
        path: SHOP,
        element: <Suspense> <Shop/> </Suspense>,
        title: "Shop"
    },
    {
        path: '/team',
        element: <Suspense> <OurChef /> </Suspense>,
        title: 'Team'
    },
    {
        path: LOGIN,
        element: <Suspense> <LogIn /> </Suspense>,
        title: 'Login'
    },
    {
        path: SIGNUP,
        element: <Suspense> <SignUp /> </Suspense>,
        title: 'SignUp'
    },
    {
        path: '/faq',
        element: <Suspense> <FAQ /> </Suspense>,
        title: 'FAQ'
    },
    {
        path: CART,
        element: <Suspense> <ShoppingCart /> </Suspense>,
        title: "Shopping Cart"
    },
    {
        path: CHECKOUT,
        element: <Suspense> <Checkout /> </Suspense>,
        title: 'Chef'
    },

    {
        path: `${DETAIL_PRODUCT}/:id`,
        element: <Suspense> <DetailProduct /> </Suspense>,
        title: 'Detail Product'
    },
    {
        path: 'blog/:id',
        element: <Suspense> <DetailBlog /> </Suspense>,
        title: "Detail Blog"
    },
    {
        path: `${ACTIVATE}/:code`,
        element: <Suspense> <LogIn /> </Suspense>,
        title: "Activation"
    },
    {
        path: ORDER_FINALIZE,
        element: <Suspense> <OrderFinalize /> </Suspense>,
        title: "Order Finalize"
    },
]

export default GeneralRoutes