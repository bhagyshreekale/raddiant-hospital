import { Link } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import FloatingActions from '@/components/design/FloatingActions';

interface Blog {
    id: number;
    title: string;
    category: string;
    description: string;
    read_time: string;
    image: string | null;
    created_at: string;
}

interface RecentBlog {
    id: number;
    title: string;
    category: string;
    image: string | null;
    read_time: string;
}

interface Props {
    blog: Blog;
    recentBlogs: RecentBlog[];
}

function getBlogImage(image: string | null): string {
    if (!image) return '/images/preloader.png';
    if (image.startsWith('http')) return image;
    return `/storage/${image}`;
}

function cleanBlogDescription(html: string): string {
    if (!html) return '';
    let cleaned = html
        // Fix broken tags from TinyMCE - convert <h1><br> to <h1>
        .replace(/<(h[1-6])>\s*<br\s*\/?>\s*/gi, '<$1>')
        .replace(/<\/(h[1-6])>\s*<br\s*\/?>\s*/gi, '</$1>')
        // Fix img src paths
        .replace(/src="(\.\.\/)+storage\/uploads/g, 'src="/storage/uploads')
        .replace(/src="(\.\.\/)+storage/g, 'src="/storage')
        .replace(/src="storage\//g, 'src="/storage/')
        // Clean &nbsp;
        .replace(/&nbsp;/g, ' ')
        // Remove empty p tags
        .replace(/<p>\s*<\/p>/g, '')
        // Clean extra br in headings
        .replace(/<(h[1-6])>([^<]*)<br\s*\/?>([^<]*)<\/(h[1-6])>/gi, '<$1>$2 $3</$4>');
    return cleaned;
}

export default function BlogShow({ blog, recentBlogs }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50">
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
                    <img
                        src={getBlogImage(blog.image)}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="max-w-4xl mx-auto">
                            <Link 
                                href="/blog"
                                className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-4 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Blogs
                            </Link>
                            
                            <div className="flex items-center gap-4 text-slate-300 text-sm mb-3">
                                <span className="px-3 py-1 bg-teal-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg">
                                    {blog.category}
                                </span>
                                <span>{formatDate(blog.created_at)}</span>
                                <span>•</span>
                                <span>{blog.read_time || '5 min read'}</span>
                            </div>
                            
                            <h1 className="text-3xl md:text-5xl font-bold text-white font-serif leading-tight">
                                {blog.title}
                            </h1>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="max-w-4xl mx-auto px-4 py-12">
                    <article 
                        className="prose prose-lg prose-slate max-w-none"
                        dangerouslySetInnerHTML={{ __html: cleanBlogDescription(blog.description) }}
                    />

                    {/* Tags */}
                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">Category:</span>
                            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                                {blog.category}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Recent Blogs */}
                {recentBlogs.length > 0 && (
                    <section className="bg-white py-12">
                        <div className="max-w-6xl mx-auto px-4">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">Recent Blogs</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {recentBlogs.map((recent) => (
                                    <Link 
                                        key={recent.id}
                                        href={`/blog/${recent.id}`}
                                        className="group block"
                                    >
                                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={getBlogImage(recent.image)}
                                                    alt={recent.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest bg-teal-600 text-white">
                                                        {recent.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-teal-700 transition-colors line-clamp-2">
                                                    {recent.title}
                                                </h3>
                                                <span className="text-slate-400 text-sm">{recent.read_time || '5 min read'}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* Styles for prose */}
            <style>{`
                .prose {
                    color: #334155;
                    line-height: 1.8;
                }
                .prose > * {
                    margin-bottom: 1rem;
                }
                .prose img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.75rem;
                    margin: 1.5rem 0;
                    display: block;
                }
                .prose h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: #0f172a;
                }
                .prose h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 1.75rem;
                    margin-bottom: 0.75rem;
                    color: #0f172a;
                }
                .prose h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-top: 1.5rem;
                    margin-bottom: 0.5rem;
                    color: #0f172a;
                }
                .prose p {
                    margin-bottom: 1rem;
                    line-height: 1.8;
                    color: #475569;
                }
                .prose strong {
                    font-weight: 600;
                    color: #0f172a;
                }
                .prose ul, .prose ol {
                    margin: 1rem 0;
                    padding-left: 1.5rem;
                }
                .prose li {
                    margin-bottom: 0.5rem;
                    color: #475569;
                }
                .prose a {
                    color: #0d9488;
                    text-decoration: underline;
                }
                .prose a:hover {
                    color: #0f766e;
                }
                .prose blockquote {
                    border-left: 4px solid #e2e8f0;
                    padding-left: 1.25rem;
                    margin: 1.5rem 0;
                    font-style: italic;
                    color: #64748b;
                }
                .prose table {
                    width: 100%;
                    margin: 1.5rem 0;
                    border-collapse: collapse;
                }
                .prose th, .prose td {
                    padding: 0.75rem;
                    border: 1px solid #e2e8f0;
                }
                .prose th {
                    background: #f8fafc;
                    font-weight: 600;
                }
                .prose code {
                    background: #f1f5f9;
                    padding: 0.2rem 0.4rem;
                    border-radius: 0.25rem;
                    font-size: 0.875em;
                    font-family: monospace;
                }
                .prose pre {
                    background: #1e293b;
                    color: #e2e8f0;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin: 1.5rem 0;
                }
                .prose pre code {
                    background: transparent;
                    padding: 0;
                }
                .prose hr {
                    border: none;
                    border-top: 1px solid #e2e8f0;
                    margin: 2rem 0;
                }
                .prose input, .prose textarea {
                    border: 1px solid #e2e8f0;
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                }
                .prose iframe {
                    max-width: 100%;
                    margin: 1rem 0;
                }
            `}</style>

            <Footer />
            <FloatingActions />
        </>
    );
}