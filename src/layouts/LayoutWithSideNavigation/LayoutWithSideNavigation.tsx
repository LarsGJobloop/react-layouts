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

function LayoutContext({ value, children }: LayoutContextOptions) {
  return (
    <layoutContext.Provider value={value}>{children}</layoutContext.Provider>
  );
}

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
  asMain?: true | undefined;
  children: [
    React.ReactElement<NavigationProps>,
    React.ReactElement<ContentProps>
  ];
  className?: string;
}

/**
 * Root component for the layout
 */
export function Root({ children, asMain, className }: RootProps) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [navigation, content] = children;

  function updateHeaders(newHeaders: string[]) {
    setHeaders(() => newHeaders);
  }

  const Element = asMain ? "main" : "section";

  return (
    <LayoutContext value={{ headers, updateHeaders }}>
      <Element className={style["container"] + " " + className}>
        <div className={style["navigation"]}>{navigation}</div>
        <div className={style["content"]}>{content}</div>
      </Element>
    </LayoutContext>
  );
}

interface NavigationProps {
  linksAs?: (title: string) => JSX.Element;
  className?: string;
}

export function Navigation({ linksAs, className }: NavigationProps) {
  const { headers } = useLayoutContext("Layout.Navigation");

  return (
    <nav className={className}>
      <h2>Contents</h2>
      <ul>
        {headers.map((heading) => (
          <li key={heading}>
            <a href={`#${heading}`}>{linksAs ? linksAs(heading) : heading}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface ContentProps {
  children: React.ReactElement<SectionProps>[];
}

export function Content({ children }: ContentProps) {
  const sectionsHeaders = children.map((child) => child.props.heading);
  const { updateHeaders } = useLayoutContext("Layout.Content");

  useEffect(() => {
    updateHeaders(sectionsHeaders);
  }, []);

  return <section>{children}</section>;
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  heading: string;
  children: React.ReactNode;
}

export function Section({ heading, children, ...rest }: SectionProps) {
  return (
    <section id={heading} {...rest}>
      {children}
    </section>
  );
}
