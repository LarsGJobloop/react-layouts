import React, { HTMLAttributes, useEffect, useMemo, useRef } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

import style from "./style.module.css";
import { Provider, useHeaders, useView } from "./context";

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
  const [navigation, content] = children;

  const Element = asMain ? "main" : "section";

  return (
    <Provider>
      <Element className={style["container"] + " " + className}>
        <div className={style["navigation"]}>{navigation}</div>
        <div className={style["content"]}>{content}</div>
      </Element>
    </Provider>
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
  const { headers } = useHeaders("Layout.Navigation");
  const { view } = useView("Layout.Navigation");

  return (
    <nav className={className}>
      <h2>Contents</h2>
      <ul>
        {headers.map((heading) => (
          <li key={heading} className={view === heading ? style["active"] : ""}>
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

  const { setHeaders } = useHeaders("Layout.Content");

  useEffect(() => {
    setHeaders(sectionsHeaders);
  }, [sectionsHeaders, setHeaders]);

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
  const { setView } = useView("Layout.Section");

  const reference = useRef<HTMLElement | null>(null);

  useIntersectionObserver(reference, () => setView(heading));

  return (
    <section id={heading} ref={reference} {...rest}>
      {children}
    </section>
  );
}
