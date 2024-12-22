import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { HEADER_SITEMAP, HEADER_ACTION, IAction} from "../../constants/sitemap"
import { AppstoreOutlined, CloseCircleTwoTone } from "@ant-design/icons";
import { Badge, Divider, Drawer } from "antd";
import { selectCartItemsCount } from "../../state/cart/cart-selector";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromUserState } from "../../state/user/user-selector";
import { logoutSuccess } from "../../state/user/user-slice";


const Header = () => {

  const currentUrl = useLocation().pathname;
  const headerRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [headerSticked, setHeaderSticked] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)

  const userData = useSelector(selectUserFromUserState);

  const cartItemsCount = useSelector(selectCartItemsCount)

  const handleLogout = () => {
    localStorage.removeItem("token")
    dispatch(logoutSuccess())
  }

  const handleClickAction = (item: IAction) => {
    return () => {
      if (item.title === "Logout") {
        handleLogout();
      } 
    
      if (item.path) {
        navigate(item.path)
      }
    }
  }

  window.onscroll = () => {
    if (!headerSticked && window.scrollY >= 24) {
      setHeaderSticked(true)
    } else if (headerSticked && window.scrollY < 24) {
      setHeaderSticked(false)
    }
  }

  return (
    <header ref={headerRef} className={`flex items-center h-16 px-[10vw] mt-6 sticky top-0  
      ${headerSticked && currentUrl === '/' && "bg-white z-30 shadow-md"} ${headerSticked && currentUrl !== '/' && "bg-[#101721] z-30 shadow-md "} `}>
      
      <Link to="/" className={`font-sans text-2xl font-bold mr-16 ${currentUrl !== '/' && 'text-white'} relative transition-all  ${openDrawer ? '-left-[146px]' : 'left-0'}`}>F
        <span className="text-primary">oo</span>
        dtuck
      </Link>
      
      <nav className="block max-lg:hidden">
        {
          HEADER_SITEMAP.map((item, index) => (
            <Link to={item.path} key={index} className={`text-text ml-8 ${currentUrl !== '/' && 'text-white'} relative 
              ${currentUrl === item.path ? 'font-bold after:block after:w-6 after:h-0.5 after:bg-primary after:absolute after:left-0 after:-bottom-1 animate-spin' 
              : 'before:hidden before:block before:w-6 before:h-0.5 before:bg-disabledGreen before:absolute before:left-0 before:-bottom-1 hover:before:block before:ease-in before:duration-200'}`
            }
            >
              {item.title}
            </Link>
          ))
        }
      </nav>

      <div className="lg:flex hidden items-center ml-auto">
        {
          HEADER_ACTION.filter((item) => userData ? !item.hideOnLogIn : !item.showOnLogIn)
            .map((item, index) => 
              (
                <div key={index} onClick={handleClickAction(item)}
                  className={`text-white w-10 h-10 ml-4 flex items-center justify-center rounded-full hover:bg-[#333] hover:cursor-pointer ${headerSticked && currentUrl === '/' && '!text-[#333] hover:bg-[#ccc]'}`} 
                  > 
                    {
                      item.title !== "Cart" ? item.icon : (
                        <Badge count={cartItemsCount} size="small" className={`text-white text-base  ${headerSticked && currentUrl === '/' && '!text-[#333]'}`}>
                          {item.icon}
                        </Badge>
                      )
                    }
                  </div>
              ))
        }
      </div>
      
      <div className={`lg:hidden block ml-auto text-2xl pd-4 ${currentUrl !== '/' && 'text-white'}`} onClick={() => setOpenDrawer(true)}><AppstoreOutlined /></div>
        <Drawer  placement="right"  open={openDrawer} width={240} closeIcon={false} title={      
          <div className="flex justify-between">
            <Link to="/" className={`font-sans text-2xl font-bold mr-16 `} >F
              <span className="text-primary">oo</span>
                dtuck
            </Link>
            <CloseCircleTwoTone className="ml-auto text-2xl !text-primary"
              onClick={() => setOpenDrawer(false)}
            />
          </div>
        }>
        <nav className="flex flex-col">
          {
            HEADER_SITEMAP.map((item, index) => (
              <Link to={item.path} key={index} className={`text-text relative text-xl p-2 pt-0 
                ${currentUrl === item.path && 'font-bold !text-primary'}`
              } onClick={() => setOpenDrawer(prv => !prv)}
              >
                {item.title}
              </Link>
            ))
          }

          <Divider />
          {
            HEADER_ACTION.map((item, index) => (
              <div key={index} onClick={() => {handleClickAction(item);  setOpenDrawer(prv => !prv)}}
                className={`text-text rounded-full text-xl p-2 w-full`} 
              > 
                {item.icon} 
                <span className="ml-2">
                  {item.title}
                </span>
              </div>
            ))
          }
        </nav>

        </Drawer>
      <div>

      </div>

    </header>
  )
}

export default Header