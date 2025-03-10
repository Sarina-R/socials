import { color } from "framer-motion";
import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children, primaryColor }) => (
      <h1 style={{ color: primaryColor, fontSize: "2rem", fontWeight: "bold" }}>
        {children}
      </h1>
    ),
    img: (props) => (
      <img style={{ width: "100%", height: "auto" }} {...props} />
    ),
    p: ({ children, style }) => <p className={style}>{children}</p>,
    ...components,
  };
}
