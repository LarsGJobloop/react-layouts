import React from "react";
import style from "./style.module.css";

interface RootProps {
  children: React.ReactNode;
}

export function Root({ children }: RootProps) {
  return (
    <section className={style["container"]}>
      <h1>Container</h1>
      {children}
    </section>
  );
}

interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  return (
    <section className={style["navigation"]}>
      <h2>Navigation</h2>
    </section>
  );
}

interface ContentProps {
  children: React.ReactNode;
}

export function Content({ children }: ContentProps) {
  return <section>{children}</section>;
}

interface SectionProps {
  title: string;
}

export function Section({ title }: SectionProps) {
  return (
    <section id={title} className={style["content"]}>
      <h2>{title}</h2>
    </section>
  );
}
