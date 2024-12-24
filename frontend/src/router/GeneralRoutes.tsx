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
import { ABOUT, ACTIVATE, BASE, BLOG, CART, ORDER, DETAIL_PRODUCT, FAQ_PATH, LOGIN, MENU, ORDER_FINALIZE, SHOP, SIGNUP, TEAM } from "../constants/routeConstants"
import OrderFinalize from "../pages/orderFinalize"

const GeneralRoutes : Array<IRoutesProps> = [
    {
        path: BASE,  
        element: <Suspense> <Home /> </Suspense>,
    },
    {
        path: MENU,
        element: <Suspense> <Menu /> </Suspense>,
    },
    {
        path: BLOG,
        element: <Suspense> <Blog /> </Suspense>,
    },
    {
        path: ABOUT,
        element: <Suspense> <AboutUs /> </Suspense>,
    },
    {
        path: SHOP,
        element: <Suspense> <Shop/> </Suspense>,
    },
    {
        path: TEAM,
        element: <Suspense> <OurChef /> </Suspense>,
    },
    {
        path: LOGIN,
        element: <Suspense> <LogIn /> </Suspense>,
    },
    {
        path: SIGNUP,
        element: <Suspense> <SignUp /> </Suspense>,
    },
    {
        path: FAQ_PATH,
        element: <Suspense> <FAQ /> </Suspense>,
    },
    {
        path: CART,
        element: <Suspense> <ShoppingCart /> </Suspense>,
    },
    {
        path: ORDER,
        element: <Suspense> <Checkout /> </Suspense>,
    },

    {
        path: `${DETAIL_PRODUCT}/:id`,
        element: <Suspense> <DetailProduct /> </Suspense>,
    },
    {
        path: `${BLOG}/:id`,
        element: <Suspense> <DetailBlog /> </Suspense>,
    },
    {
        path: `${ACTIVATE}/:code`,
        element: <Suspense> <LogIn /> </Suspense>,
    },
    {
        path: ORDER_FINALIZE,
        element: <Suspense> <OrderFinalize /> </Suspense>,
    },
]

export default GeneralRoutes