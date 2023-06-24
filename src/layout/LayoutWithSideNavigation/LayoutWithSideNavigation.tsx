import React, { HTMLAttributes, createContext, useContext } from "react";
import style from "./style.module.css";

const layoutContext = createContext<ILayoutContext | undefined>(undefined);

interface ILayoutContext {
  headers: string[];
}

interface LayoutContextProps {
  value: ILayoutContext;
  children: React.ReactNode;
}

const LayoutContext = ({ value, children }: LayoutContextProps) => {
  return (
    <layoutContext.Provider value={value}>{children}</layoutContext.Provider>
  );
};

const useLayoutContext = () => {
  const context = useContext(layoutContext);

  if (!context) {
    throw new Error(
      "This component must be used within the Layout.Root component"
    );
  }

  return context;
};

interface RootProps {
  children: [
    React.ReactElement<NavigationProps>,
    React.ReactElement<ContentProps>
  ];
}

const Root = ({ children }: RootProps) => {
  const [navigation, content] = children;

  const headers = ["Hello", "World", "Fooo", "Baaard"];

  return (
    <LayoutContext value={{ headers }}>
      <section className={style["container"]}>
        <div className={style["navigation"]}>{navigation}</div>
        <div className={style["content"]}>{content}</div>
      </section>
    </LayoutContext>
  );
};

interface NavigationProps {
  linksAs?: (title: string) => JSX.Element;
}

const Navigation = ({ linksAs }: NavigationProps) => {
  const { headers } = useLayoutContext();

  return (
    <nav className="">
      <h2>Navigation</h2>
      <ul>
        {headers.map((heading) => (
          <li key={heading}>
            <a href={`#${heading}`}>{linksAs ? linksAs(heading) : heading}</a>
          </li>
        ))}
      </ul>
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
