import React from "react";
import style from "./style.module.css";

interface RootProps {
  className?: string;
  children: JSX.Element[] | JSX.Element;
}

export const Root = ({ className, children }: RootProps) => {
  let logo;
  let remainder;

  if (Array.isArray(children)) {
    // Double looping here but it should only be over a handfull of elements, once
    logo = children.filter((child) => child.type === "Logo");
    remainder = children.filter((child) => child.type !== "Logo");
  } else {
    logo = children;
  }

  return (
    <header className={style["container"] + " " + className}>
      {logo}
      {remainder}
    </header>
  );
};

interface LogoProps {
  linkHome?: true;
  children: React.ReactNode;
}

export const Logo = ({ linkHome, children }: LogoProps) => {
  if (linkHome) {
    return <a href="/">{children}</a>;
  } else {
    return <div>{children}</div>;
  }
};
