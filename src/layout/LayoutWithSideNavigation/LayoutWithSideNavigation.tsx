import React, {
  HTMLAttributes,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import style from "./style.module.css";

const layoutContext = createContext<ILayoutContext | undefined>(undefined);

interface ILayoutContext {
  headers: string[];
  updateHeaders: (newHeaders: string[]) => void;
}

interface LayoutContextOptions {
  value: ILayoutContext;
  children: React.ReactNode;
}

const LayoutContext = ({ value, children }: LayoutContextOptions) => {
  return (
    <layoutContext.Provider value={value}>{children}</layoutContext.Provider>
  );
};

const useLayoutContext = (componentName: string) => {
  const context = useContext(layoutContext);

  if (!context) {
    throw new Error(
      `${componentName} must be a child of the Layout.Root component`
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
  const [headers, setHeaders] = useState<string[]>([]);
  const [navigation, content] = children;

  function updateHeaders(newHeaders: string[]) {
    setHeaders(() => newHeaders);
  }

  return (
    <LayoutContext value={{ headers, updateHeaders }}>
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
  const { headers } = useLayoutContext("Layout.Navigation");

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
  const sectionsHeaders = children.map((child) => child.props.heading);
  const { updateHeaders } = useLayoutContext("Layout.Content");

  useEffect(() => {
    updateHeaders(sectionsHeaders);
  }, []);

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
