import type { MDXComponents } from 'mdx/types'

// Typography comes from `.nb-prose` (app/nocturno.css); only structural wrappers live here.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wide tables scroll sideways instead of stretching the page on phones
    table: ({ children }) => (
      <div className="overflow-x-auto">
        <table>{children}</table>
      </div>
    ),
    img: (props) => (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img {...props} className="h-auto max-w-full" />
    ),
    ...components,
  }
}
