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
 *
 * @example
 * <Root>
 *  <Navigation />
 *
 *  <Content>
 *   <Section>
 *    <h2>This is a Section</h2>
 *    <p>With some content</p>
 *   </Section>
 *  </Content>
 * </Root>
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
   *
   * @example
   * <Navigation linksAs={(heading) => <h1>{heading}</h1>} />
   */
  linksAs?: (heading: string) => JSX.Element;
  className?: string;
}

/**
 * Sided Navigation component
 *
 * @example
 * <Navigation />
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
 *
 * @example
 * <Content>
 *  <Section heading="Section Title" >
 *   <h2>Section Title</h2>
 *   <p>More parts here</p>
 *  </Section>
 * </Content>
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
   * Text used in the sided Navbar
   */
  heading: string;
  /**
   * Any number of HTML Elements or React Components
   */
  children: React.ReactNode;
  /**
   * Sets this section to be a self contained Article
   */
  asArticle?: true;
}

/**
 * A section component which generates links in the sided Navbar
 *
 * @example
 * <Section heading="Shining Star">
 *  <h2>Shining Star</h2>
 *  <p>So shiny! Give 'em to me!</p>
 * </Section>
 */
export function Section({
  heading,
  children,
  asArticle,
  ...rest
}: SectionProps) {
  const { setView } = useView("Layout.Section");
  const reference = useRef<HTMLElement | null>(null);
  useIntersectionObserver(reference, () => setView(heading));

  const Container = asArticle ? "article" : "section";

  return (
    <Container id={heading} ref={reference} {...rest}>
      {children}
    </Container>
  );
}
