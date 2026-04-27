'use client';

export default function FeaturedCard({ post, onReadMore }) {
  if (!post) return null;

  return (
    <div
      onClick={() => onReadMore(post)}
      className="group relative grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative min-h-[300px] md:min-h-[450px] overflow-hidden">
        <img
          src={post.image || '/api/placeholder/800/600'}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent" />
        
        {/* Floating Badge */}
        <div className="absolute top-6 left-6">
          <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-teal-700 shadow-lg">
            Featured Story
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 bg-white">
        <div className="flex items-center gap-4 mb-6">
          <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${post.catClass || 'bg-teal-50 text-teal-700'}`}>
            {post.category}
          </span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span className="text-slate-400 text-xs font-semibold">{post.date}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.1] mb-6 group-hover:text-teal-700 transition-colors duration-300">
          {post.title}
        </h2>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 line-clamp-3">
          {post.excerpt || post.description}
        </p>

        <div className="flex items-center gap-6">
          <button
            onClick={(e) => { e.stopPropagation(); onReadMore(post); }}
            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-teal-700 text-white text-sm font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-teal-200 group-hover:gap-5"
          >
            Read Full Article
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <svg className="w-4 h-4 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {post.readTime}
          </div>
        </div>
      </div>
    </div>
  );
}