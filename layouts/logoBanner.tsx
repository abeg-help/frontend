import React, { type FC } from "react";
import logo from "@/public/assets/images/shared/logo.svg";
import Image from "next/image";

type CompProp = {
  textColor: string;
};
const LogoBanner: FC<CompProp> = ({ textColor }) => {
  return (
    <div
      className={`flex items-center gap-2 justify-center ${
        !textColor && "backdrop-blur-sm p-2 bg-slate-50/40"
      }`}
    >
      <Image
        className="w-[35px] md:w-[40px] lg:w-[46px] lg:aspect-square"
        src={logo as string}
        priority
        alt=""
      />
      <span
        role=""
        className={`${textColor} font-medium md:text-lg lg:text-xl`}
      >
        AbegHelp.me
      </span>
    </div>
  );
};

export default LogoBanner;
