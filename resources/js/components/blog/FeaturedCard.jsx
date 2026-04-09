'use client';



export default function FeaturedCard({ post, onReadMore }) {
  return (
    <div
      onClick={() => onReadMore(post)}
      className="group grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative min-h-72 md:min-h-80 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/10" />
        <span className="absolute top-5 left-5 bg-white rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-teal-700 shadow-md">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${post.catClass}`}>
            {post.category}
          </span>
          <span className="text-slate-400 text-xs">{post.date}</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4">
          {post.title}
        </h2>

        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <svg className="w-3.5 h-3.5 stroke-teal-600" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {post.readTime}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onReadMore(post); }}
          className="self-start inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:gap-3"
        >
          Read Full Article
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
