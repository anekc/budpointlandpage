import Link from 'next/link'

// Lista de posts - agrega nuevos posts aquí
const posts = [
  {
    slug: 'bienvenido-a-budpoint',
    title: 'Bienvenido al Blog de Budpoint',
    description: 'Descubre cómo Budpoint te ayudará a tomar control de tus finanzas personales de forma inteligente.',
    date: '2025-01-18',
    readTime: '3 min',
    tags: ['Anuncios', 'Budpoint'],
  },
  {
    slug: '5-tips-para-ahorrar',
    title: '5 Tips para Ahorrar Dinero en 2025',
    description: 'Estrategias prácticas para mejorar tus finanzas personales y empezar a ahorrar desde hoy.',
    date: '2025-01-15',
    readTime: '5 min',
    tags: ['Tips', 'Finanzas'],
  },
]

export default function BlogPage() {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Tips, noticias y guías sobre finanzas personales
        </p>
      </div>

      {/* Posts Grid */}
      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <Link href={`/blog/posts/${post.slug}`}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500 whitespace-nowrap">
                  <p>{post.date}</p>
                  <p>{post.readTime} lectura</p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
