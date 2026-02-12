import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { AnchorHTMLAttributes } from 'react'

const MD_EXTENSIONS = /\.(md|markdown|mdx|mdown)([#?].*)?$/i
const HAS_SCHEME = /^[a-zA-Z][a-zA-Z\d+\-.]*:/

interface MarkdownRendererProps {
  content: string
  onOpenRelativeMd?: (href: string) => void
}

export default function MarkdownRenderer({
  content,
  onOpenRelativeMd,
}: MarkdownRendererProps) {
  return (
    <article className='prose max-w-none'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
            const isRelative =
              href && !HAS_SCHEME.test(href) && !href.startsWith('#')
            const isMd = href && MD_EXTENSIONS.test(href)

            if (isRelative && isMd && onOpenRelativeMd) {
              return (
                <a
                  {...props}
                  href={href}
                  onClick={e => {
                    e.preventDefault()
                    onOpenRelativeMd(href!)
                  }}
                >
                  {children}
                </a>
              )
            }

            return (
              <a {...props} href={href}>
                {children}
              </a>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
