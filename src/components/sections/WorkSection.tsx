import { WORK_CATEGORIES, WORK_ITEMS } from '../../data'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useState, useMemo } from 'react'
import { MoreHorizontal } from 'lucide-react'

export function WorkSection() {
  const ref = useScrollReveal<HTMLElement>()
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(8)

  const categories = ['All', ...WORK_CATEGORIES]

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return WORK_ITEMS
    return WORK_ITEMS.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const displayedItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4)
  }

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setVisibleCount(8)
  }

  return (
    <section ref={ref} id="work" className="reveal relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-6"
            style={{
              borderColor: 'rgba(167,139,250,0.3)',
              background: 'rgba(167,139,250,0.08)',
              color: '#c4b5fd',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Featured Shorts
          </span>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px, 4.5vw, 56px)' }}
          >
            A curated selection of our latest short-form video projects
          </h2>
          <p className="text-white/35 max-w-lg mx-auto leading-[1.65]">
            Crafted for impact, built for attention. From branded content to social-ready clips, these highlights showcase our storytelling in under 60 seconds.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-[#08090c]'
                  : 'text-white/40 hover:text-white/70 border border-white/10'
              }`}
              style={{
                ...(activeCategory === cat ? { background: '#f5f5f7' } : { background: 'rgba(255,255,255,0.03)' }),
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Work grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="work-grid">
          {displayedItems.map((item, i) => (
            <article
              key={`${item.category}-${item.title}-${i}`}
              className="relative rounded-2xl overflow-hidden group"
              style={{
                background: 'rgba(12,14,19,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-orange-500/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <MoreHorizontal className="w-12 h-12 text-white/20 group-hover:text-white/40 transition-colors" />
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.2) 0%, transparent 70%)' }} />
              </div>

              <div className="p-6">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                  style={{
                    background: 'rgba(167,139,250,0.15)',
                    color: '#a78bfa',
                    border: '1px solid rgba(167,139,250,0.3)',
                  }}
                >
                  {item.category}
                </span>
                <h3 className="font-semibold text-white text-lg mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </article>
          ))}
        </div>

        {/* Load more button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-xl text-base font-semibold text-white/80 hover:text-white transition-colors border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-sm"
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  )
}