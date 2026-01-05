//@ts-nocheck
import React from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'

// Custom block components
const PortableTextRenderer: React.FC<{ value: any }> = ({ value }) => {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => (
        <figure className="portable-image">
          <img
            src={value.asset?.url}
            alt={value.alt || 'Image'}
            loading="lazy"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      ),
      code: ({ value }) => (
        <div className="code-block">
          {value.language && (
            <div className="language-badge">{value.language}</div>
          )}
          <pre>
            <code className={`language-${value.language || 'javascript'}`}>
              {value.code}
            </code>
          </pre>
        </div>
      ),
      callout: ({ value }) => (
        <div className={`callout callout-${value.type || 'info'}`}>
          {value.title && <strong className="callout-title">{value.title}</strong>}
          {value.message && <p className="callout-message">{value.message}</p>}
        </div>
      ),
      divider: ({ value }) => <hr className="portable-divider" />,
      videoEmbed: ({ value }) => {
        const embedUrl = convertToEmbedUrl(value.url)
        return (
          <figure className="portable-video">
            <iframe
              src={embedUrl}
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen
              title={value.caption || 'Video'}
            ></iframe>
            {value.caption && <figcaption>{value.caption}</figcaption>}
          </figure>
        )
      },
      quoteBlock: ({ value }) => (
        <blockquote className="portable-quote">
          <p className="quote-text">{value.text}</p>
          {value.author && <footer className="quote-author">— {value.author}</footer>}
        </blockquote>
      ),
      highlight: ({ value }) => (
        <mark className={`highlight highlight-${value.color || 'yellow'}`}>
          {value.text}
        </mark>
      ),
      previewBlock: ({ value }) => (
        <div className={`preview-block preview-${value.bgType || 'light'}`}>
          {value.title && <h4 className="preview-title">{value.title}</h4>}
          {value.description && (
            <p className="preview-description">{value.description}</p>
          )}
          {value.previewContent && (
            <div className="preview-content">{value.previewContent}</div>
          )}
        </div>
      ),
    },
    block: {
      h1: ({ children }) => <h1 className="portable-h1">{children}</h1>,
      h2: ({ children }) => <h2 className="portable-h2">{children}</h2>,
      h3: ({ children }) => <h3 className="portable-h3">{children}</h3>,
      h4: ({ children }) => <h4 className="portable-h4">{children}</h4>,
      blockquote: ({ children }) => (
        <blockquote className="portable-blockquote">{children}</blockquote>
      ),
      normal: ({ children }) => <p className="portable-p">{children}</p>,
    },
    list: {
      bullet: ({ children }) => (
        <ul className="portable-ul">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="portable-ol">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="portable-li-bullet">{children}</li>
      ),
      number: ({ children }) => (
        <li className="portable-li-number">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="portable-strong">{children}</strong>,
      em: ({ children }) => <em className="portable-em">{children}</em>,
      code: ({ children }) => <code className="portable-code">{children}</code>,
      underline: ({ children }) => <u className="portable-underline">{children}</u>,
      'strike-through': ({ children }) => (
        <s className="portable-strikethrough">{children}</s>
      ),
      link: ({ value, children }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="portable-link"
        >
          {children}
        </a>
      ),
      internalLink: ({ value, children }) => {
        const slug = value?.reference?.slug?.current
        return (
          <a href={`/notes/${slug}`} className="portable-internal-link">
            {children}
          </a>
        )
      },
    },
  }

  return (
    <div className="portable-text">
      <PortableText value={value} components={components} />
    </div>
  )
}

function convertToEmbedUrl(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
    if (videoId) return `https://www.youtube.com/embed/${videoId}`
  }

  if (url.includes('vimeo.com')) {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1]
    if (videoId) return `https://player.vimeo.com/video/${videoId}`
  }

  return url
}

export default PortableTextRenderer
