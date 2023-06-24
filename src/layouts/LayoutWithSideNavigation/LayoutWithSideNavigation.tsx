import React, {
  HTMLAttributes,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import style from "./style.module.css";

const layoutContext = createContext<ILayoutContext | undefined>(undefined);

interface ILayoutContext {
  headers: string[];
  updateHeaders: (newHeaders: string[]) => void;
  currentSection: string;
  updateCurrentSection: (newSection: string) => void;
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

/**
 * @param componentName Name of component to ease debugging
 * @returns
 */
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
  /**
   * Should this be the main Page element?
   */
  asMain?: true | undefined;
  /**
   * One Navigation component
   * and one Content component
   */
  children: [
    React.ReactElement<NavigationProps>,
    React.ReactElement<ContentProps>
  ];
  className?: string;
}

/**
 * The Layout Root component
 */
export function Root({ children, asMain, className }: RootProps) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState<string>("");
  const [navigation, content] = children;

  function updateHeaders(newHeaders: string[]) {
    setHeaders(() => newHeaders);
  }

  function updateCurrentSection(newSection: string) {
    setCurrentSection(newSection);
  }

  const context: ILayoutContext = {
    headers,
    updateHeaders,
    currentSection,
    updateCurrentSection,
  };

  const Element = asMain ? "main" : "section";

  return (
    <LayoutContext value={context}>
      <Element className={style["container"] + " " + className}>
        <div className={style["navigation"]}>{navigation}</div>
        <div className={style["content"]}>{content}</div>
      </Element>
    </LayoutContext>
  );
}

interface NavigationProps {
  /**
   * An alternative component for the link elements
   */
  linksAs?: (title: string) => JSX.Element;
  className?: string;
}

/**
 * Sided Navigation component
 */
export function Navigation({ linksAs, className }: NavigationProps) {
  const { headers, currentSection } = useLayoutContext("Layout.Navigation");

  return (
    <nav className={className}>
      <h2>Contents</h2>
      <ul>
        {headers.map((heading) => (
          <li
            key={heading}
            className={currentSection === heading ? style["active"] : ""}
          >
            <a href={`#${heading}`}>{linksAs ? linksAs(heading) : heading}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface ContentProps {
  /**
   * Any number of Section Components
   */
  children:
    | React.ReactElement<SectionProps>
    | React.ReactElement<SectionProps>[];
}

/**
 * Container Component for the sections
 */
export function Content({ children }: ContentProps) {
  const sectionsHeaders = useMemo(() => {
    if (!Array.isArray(children)) {
      return [children.props.heading];
    }
    return children.map((child) => child.props.heading);
  }, [children]);

  const { updateHeaders } = useLayoutContext("Layout.Content");

  useEffect(() => {
    updateHeaders(sectionsHeaders);
  }, [sectionsHeaders, updateHeaders]);

  return <section>{children}</section>;
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * ID and text used for sided navigation
   */
  heading: string;
  /**
   * Any number of HTML Elements or React Components
   */
  children: React.ReactNode;
}

/**
 * A section component which is linked to through the Navigtion component
 */
export function Section({ heading, children, ...rest }: SectionProps) {
  // Throws errors if used outside the root layout
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updateCurrentSection } = useLayoutContext("Layout.Section");

  const reference = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reference.current === null) return;
    const subject = reference.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) updateCurrentSection(heading);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.8,
      }
    );

    observer.observe(subject);

    return () => observer.disconnect();
  }, [updateCurrentSection, heading]);

  return (
    <section id={heading} ref={reference} {...rest}>
      {children}
    </section>
  );
}
