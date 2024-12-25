
import CoverPage from "../../components/CoverPage";
import { ACCOUNT_USER_INFO, ACCOUNT_USER_ORDERS, BASE } from "../../constants/routeConstants";
import type { MenuProps } from 'antd'
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    key: 1,
    label: <Link to={ACCOUNT_USER_INFO}>Personal data</Link>
  },
  {
    key: 2,
    label: <Link to={ACCOUNT_USER_ORDERS}>List of orders</Link>
  },
]

const Account = () => {  
  return (
    <div className="min-h-screen">
      <CoverPage title='My Account' currentPage="My Account" listPath={[{title:'Home', path: BASE }]}/>

      <div className="flex">
        <div className="basis-3/12">
          <div className="flex items-center text-xl">
            <span className="text-3xl">
              <UserOutlined />
            </span>
            <h2 className="ml-2">
              My Account
            </h2>
          </div>
          <Menu items={menuItems} mode="vertical" style={{ width: "100%" }}/>
        </div>
        <div className="basis-9/12 pl-6">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Account