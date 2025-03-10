import type { MDXComponents } from "mdx/types";
import { motion } from "framer-motion";

interface MDXComponentProps {
  primaryColor?: string;
}

export function useMDXComponents1(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children, style }) => <h1 className={style}>{children}</h1>,
    img: (props) => (
      <img sizes="100vw" style={{ width: "100%", height: "auto" }} {...props} />
    ),
    p: ({ children, style }) => <p className={style}>{children}</p>,
    ...components,
  };
}

export function useMDXComponents({
  primaryColor = "#1a1a1a",
}: MDXComponentProps): MDXComponents {
  return {
    // Headings (h1 - h6)
    h1: ({ children }) => (
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ color: primaryColor }}
        className="text-4xl font-bold tracking-tight mb-4 dark:text-white"
      >
        {children}
      </motion.h1>
    ),
    h2: ({ children }) => (
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ color: primaryColor }}
        className="text-3xl font-semibold mt-6 mb-3 dark:text-neutral-100"
      >
        {children}
      </motion.h2>
    ),
    h3: ({ children }) => (
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-medium mt-5 mb-2 dark:text-neutral-200"
      >
        {children}
      </motion.h3>
    ),

    // Paragraph
    p: ({ children }) => (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300 mb-4"
      >
        {children}
      </motion.p>
    ),

    // Image
    img: (props) => (
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        style={{ width: "100%", height: "auto" }}
        className="rounded-lg shadow-md transition-transform duration-300 my-4 dark:shadow-neutral-700"
        {...props}
      />
    ),

    // Code (inline)
    code: ({ children }) => (
      <motion.code
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm px-2 py-1 rounded-md font-mono text-purple-600 dark:text-purple-400"
      >
        {children}
      </motion.code>
    ),

    // Preformatted Code Block
    pre: ({ children }) => (
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-neutral-900 dark:bg-neutral-800 text-white p-4 rounded-lg overflow-x-auto my-4"
      >
        {children}
      </motion.pre>
    ),

    // Blockquote
    blockquote: ({ children }) => (
      <motion.blockquote
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 italic text-neutral-600 dark:text-neutral-400 my-4"
      >
        {children}
      </motion.blockquote>
    ),

    // Lists (with nested list support)
    ul: ({ children }) => (
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="list-disc pl-6 my-4 text-neutral-700 dark:text-neutral-300"
      >
        {children}
      </motion.ul>
    ),
    ol: ({ children }) => (
      <motion.ol
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="list-decimal pl-6 my-4 text-neutral-700 dark:text-neutral-300"
      >
        {children}
      </motion.ol>
    ),
    li: ({ children }) => (
      <motion.li
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-2 pl-1 [&_ul]:pl-4 [&_ol]:pl-4 [&_ul]:list-circle [&_ol]:list-[lower-roman] dark:[&_ul]:text-neutral-300 dark:[&_ol]:text-neutral-300"
      >
        {children}
      </motion.li>
    ),

    // Table (Full Support with Dark Mode)
    table: ({ children }) => (
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full border-collapse my-6 border border-neutral-300 dark:border-neutral-700"
      >
        {children}
      </motion.table>
    ),
    thead: ({ children }) => (
      <motion.thead
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-neutral-100 dark:bg-neutral-800"
      >
        {children}
      </motion.thead>
    ),
    tbody: ({ children }) => (
      <tbody className="dark:text-neutral-300">{children}</tbody>
    ),
    tr: ({ children }) => (
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="border-b border-neutral-200 dark:border-neutral-600"
      >
        {children}
      </motion.tr>
    ),
    th: ({ children }) => (
      <motion.th
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="px-4 py-2 text-left font-semibold text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700"
      >
        {children}
      </motion.th>
    ),
    td: ({ children }) => (
      <motion.td
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="px-4 py-2 text-neutral-600 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700"
      >
        {children}
      </motion.td>
    ),

    // Strong (bold) and Emphasis (italic)
    strong: ({ children }) => (
      <motion.strong
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-bold dark:text-neutral-200"
      >
        {children}
      </motion.strong>
    ),
    em: ({ children }) => (
      <motion.em
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="italic dark:text-neutral-300"
      >
        {children}
      </motion.em>
    ),

    // Horizontal Rule
    hr: () => (
      <motion.hr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="my-6 border-neutral-300 dark:border-neutral-600"
      />
    ),
  };
}
