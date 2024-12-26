
import CoverPage from "../../components/CoverPage";
import { USER_INFO, USER_ORDER, BASE } from "../../constants/routeConstants";
import type { MenuProps } from 'antd'
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import ContentTitle from "./components/ContentTitle";

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    key: 1,
    label: <Link to={USER_INFO}>Personal data</Link>
  },
  {
    key: 2,
    label: <Link to={USER_ORDER}>List of orders</Link>
  },
]

const Account = () => {  
  return (
    <div className="min-h-screen">
      <CoverPage title='My Account' currentPage="My Account" listPath={[{title:'Home', path: BASE }]}/>

      <div className="flex">
        <div className="basis-3/12">
          <div className="mb-3">
            <ContentTitle title="My account" icon={<UserOutlined/>} textSize="text-2xl"/>
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