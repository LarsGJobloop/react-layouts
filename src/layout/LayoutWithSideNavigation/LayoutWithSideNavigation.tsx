import React, { HTMLAttributes } from "react";
import style from "./style.module.css";

interface RootProps {
  children: [
    React.ReactElement<NavigationProps>,
    React.ReactElement<ContentProps>
  ];
}

const Root = ({ children }: RootProps) => {
  const [navigation, content] = children;

  return (
    <section className={style["container"]}>
      <div className={style["navigation"]}>{navigation}</div>
      <div className={style["content"]}>{content}</div>
    </section>
  );
};

interface NavigationProps {}

const Navigation = (props: NavigationProps) => {
  return (
    <nav>
      <h2>Navigation</h2>
    </nav>
  );
};

interface ContentProps {
  children: React.ReactElement<SectionProps>[];
}

const Content = ({ children }: ContentProps) => {
  return <section>{children}</section>;
};

interface SectionProps extends HTMLAttributes<HTMLElement> {
  heading: string;
  children: React.ReactNode;
}

const Section = ({ heading, children, ...rest }: SectionProps) => {
  return (
    <section id={heading} {...rest}>
      <h2>{heading}</h2>
      {children}
    </section>
  );
};

export default {
  Root,
  Navigation,
  Content,
  Section,
};
