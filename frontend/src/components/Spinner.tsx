import { Spin } from "antd";

const Spinner = () => {
  return (
    <div className="w-full flex justify-center items-center" style={{height: "20vh"}}>
      <Spin size={"large"} className={"spinner"} />
    </div>
  )
}

export default Spinner