import React, { FC } from "react";

type PropsType = {
  title: string;
  icon: React.ReactNode
}

const ContentTitle: FC<PropsType> = ({ title, icon }) => {
  return (
    <div className="flex items-center text-xl mb-4">
      <span className="text-3xl">{icon}</span>
      <h3 className="ml-2">{title}</h3>
    </div>
  )
}

export default ContentTitle