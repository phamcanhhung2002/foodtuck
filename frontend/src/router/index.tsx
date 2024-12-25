import { Route, Routes } from "react-router-dom";
import GeneralRoutes from "./GeneralRoutes";
import DefaultLayout from "../layout";
import NotFound from "../pages/notFound";
import RequireAuth from "../layout/RequireAuth";
import Account from "../pages/account";
import { ACCOUNT, ACCOUNT_USER_INFO, ACCOUNT_USER_ORDERS } from "../constants/routeConstants";
import AccountItem from "../pages/account/AccountItem";
import PersonalData from "../pages/account/PersonalData";
import PersonalOrdersList from "../pages/account/PersonalOrdersList";


const RouterList = () => {
  return (
    <Routes>
      {
        GeneralRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={
            <DefaultLayout>
              {
                route.element
              }
            </DefaultLayout>
          } />
        ))
      }
      <Route element={<RequireAuth/>}>
        <Route path={ACCOUNT} element={
            <DefaultLayout>
              <Account/>
            </DefaultLayout>
        }>
          <Route index element={<AccountItem/>}/>
          <Route path={ACCOUNT_USER_INFO} element={<PersonalData/>}/>
          <Route path={ACCOUNT_USER_ORDERS} element={<PersonalOrdersList/>}/>
        </Route>
      </Route>
      <Route path="*" element={<DefaultLayout><NotFound /></DefaultLayout>} />
    </Routes>
  )
}

export default RouterList