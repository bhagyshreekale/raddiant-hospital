'use client';



export default function BlogCard({ post, onReadMore }) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden cursor-pointer">
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Meta */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${post.catClass}`}>
            {post.category}
          </span>
          <span className="text-slate-400 text-xs font-medium">{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-[1.1rem] font-bold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors duration-200">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-5">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
          <span className="text-slate-400 text-xs font-medium">{post.date}</span>
          <button
            onClick={() => onReadMore(post)}
            className="flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:gap-3 transition-all duration-200 group/btn"
          >
            Learn More
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
