import React, { FC } from "react";

type PropsType = {
  title: string;
  icon?: React.ReactNode,
  textSize?: string;
}

const ContentTitle: FC<PropsType> = ({ title, icon, textSize = "text-xl"}) => {
  return (
    <div className={`inline-flex items-center ${textSize} gap-x-2`}>
      {icon && (<span>{icon}</span>)}
      <div className="font-semibold">{title}</div>
    </div>
  )
}

export default ContentTitle