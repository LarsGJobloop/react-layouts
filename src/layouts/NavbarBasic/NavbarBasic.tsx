import React from "react";
import style from "./style.module.css";

interface RootProps {
  className?: string;
  children: JSX.Element[] | JSX.Element;
  sticky?: true;
}

export function Root({ className, children, sticky }: RootProps) {
  let logo;
  let remainder;

  if (Array.isArray(children)) {
    // Double looping here but it should only be over a handfull of elements, once
    logo = children.filter((child) => child.type === "Logo");
    remainder = children.filter((child) => child.type !== "Logo");
  } else {
    logo = children;
  }

  const headerClasses = [
    style["container"],
    sticky && style["sticky"],
    className,
  ].join(" ");

  return (
    <header className={headerClasses}>
      {logo}
      {remainder}
    </header>
  );
}

interface LogoProps {
  linkHome?: true;
  children: React.ReactNode;
}

export function Logo({ linkHome, children }: LogoProps) {
  if (linkHome) {
    return <a href="/">{children}</a>;
  } else {
    return <div>{children}</div>;
  }
}
