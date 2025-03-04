import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
  ArrowLeft,
  Calendar,
  MessageCircle,
  Star,
  StarHalf,
  Send,
  ThumbsUp,
  User,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// Star Rating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
      ))}
      <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">{rating.toFixed(1)}</span>
    </div>
  )
}

// Comment Component
const Comment = ({ comment }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 py-6 last:border-0">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <img
            src={comment.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
            alt={comment.author}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-900 dark:text-white">{comment.author}</h4>
            <span className="text-sm text-gray-500">{comment.date}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">{comment.content}</p>
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center text-gray-500 hover:text-[#4B6BFB] transition-colors">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span className="text-sm">{comment.likes}</span>
            </button>
            <button className="text-sm text-gray-500 hover:text-[#4B6BFB] transition-colors">Reply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Related Article Card
const RelatedArticleCard = ({ article }) => {
  return (
    <Link to={`/blog/${article.id}`} className="block group">
      <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-[#181A2A] border border-gray-100 dark:border-[#181A2A]">
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/90 dark:bg-[#181A2A]/90 text-[#4B6BFB] rounded-lg text-sm font-medium">
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#4B6BFB] transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

const BlogDetail = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [relatedArticles, setRelatedArticles] = useState([])
  const [showAllComments, setShowAllComments] = useState(false)

  // Form state for new comment
  const [commentName, setCommentName] = useState("")
  const [commentEmail, setCommentEmail] = useState("")

  useEffect(() => {
    // In a real application, you would fetch the blog data from an API
    const fetchBlog = async () => {
      try {
        setLoading(true)

        // Simulate API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              id,
              title: "How to Design a Responsive Card Layout with Tailwind CSS",
              category: "Design",
              description: "Learn the best practices for creating responsive card layouts using Tailwind CSS",
              content: `
                <p class="lead">Creating responsive card layouts is essential for modern web applications. In this comprehensive guide, we'll explore how to build beautiful, responsive card layouts using Tailwind CSS that work across all devices.</p>
                
                <h2>Understanding the Basics</h2>
                <p>Before diving into the code, it's important to understand the core principles of responsive design. Cards should adapt to different screen sizes while maintaining readability and usability.</p>
                
                <p>Tailwind CSS makes this process much easier with its utility-first approach. You can quickly apply responsive classes that change at different breakpoints.</p>
                
                <figure class="my-8">
                  <img src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Responsive design illustration" class="rounded-lg w-full" />
                  <figcaption class="text-center text-sm text-gray-500 mt-2">Responsive design adapts to different screen sizes</figcaption>
                </figure>
                
                <h2>Setting Up the Grid</h2>
                <p>The first step is to create a responsive grid layout that will hold our cards. Tailwind's grid system is perfect for this:</p>
                
                <pre><code>
                &lt;div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
                  {/* Cards go here */}
                &lt;/div&gt;
                </code></pre>
                
                <p>This creates a single column layout on mobile devices, two columns on medium-sized screens, and three columns on larger screens.</p>
                
                <blockquote class="border-l-4 border-[#4B6BFB] pl-4 italic my-6">
                  "The best designs are those that work seamlessly across all devices, providing an optimal experience regardless of screen size."
                </blockquote>
                
                <h2>Designing the Card</h2>
                <p>Next, we need to design the individual cards. Each card should have a consistent structure but be flexible enough to accommodate different content lengths.</p>
                
                <h3>Card Structure</h3>
                <p>A typical card might include:</p>
                <ul>
                  <li>An image or header</li>
                  <li>A title</li>
                  <li>A description or excerpt</li>
                  <li>Action buttons or links</li>
                </ul>
                
                <h2>Adding Interactivity</h2>
                <p>To enhance the user experience, we can add hover effects and transitions to our cards:</p>
                
                <pre><code>
                &lt;div class="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"&gt;
                  {/* Card content */}
                &lt;/div&gt;
                </code></pre>
                
                <h2>Optimizing for Performance</h2>
                <p>When working with card layouts, especially those with images, it's important to optimize for performance:</p>
                
                <ol>
                  <li>Use appropriately sized images</li>
                  <li>Implement lazy loading for images</li>
                  <li>Consider using the picture element for responsive images</li>
                </ol>
                
                <h2>Conclusion</h2>
                <p>By following these principles, you can create beautiful, responsive card layouts that work well across all devices. Tailwind CSS makes the process straightforward with its utility classes and responsive modifiers.</p>
                
                <p>Remember that the best designs are those that prioritize user experience, regardless of the device being used.</p>
              `,
              image:
                "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80",
              date: "Mar 23, 2023",
              author: "John Doe",
              authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
              authorRole: "Senior Frontend Developer",
              readTime: "5 min read",
              rating: 4.7,
              views: 1243,
              tags: ["Tailwind CSS", "Responsive Design", "Frontend", "CSS", "Web Development"],
            })
          }, 800)
        })

        setBlog(response)

        // Fetch mock comments
        const mockComments = [
          {
            id: 1,
            author: "Sarah Johnson",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            date: "Apr 2, 2023",
            content:
              "This article was incredibly helpful! I've been struggling with responsive card layouts and this cleared up a lot of my confusion. The examples are clear and easy to follow.",
            likes: 12,
          },
          {
            id: 2,
            author: "Michael Chen",
            avatar: "https://randomuser.me/api/portraits/men/67.jpg",
            date: "Apr 5, 2023",
            content:
              "Great tutorial! I especially appreciated the section on optimizing for performance. Too many tutorials skip that part, but it's crucial for real-world applications.",
            likes: 8,
          },
          {
            id: 3,
            author: "Emily Rodriguez",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg",
            date: "Apr 10, 2023",
            content:
              "I implemented this approach in my current project and it worked perfectly. The grid system explanation was particularly helpful.",
            likes: 5,
          },
          {
            id: 4,
            author: "David Kim",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
            date: "Apr 15, 2023",
            content: "Would love to see a follow-up article on how to add animations to these card layouts!",
            likes: 3,
          },
          {
            id: 5,
            author: "Lisa Wang",
            avatar: "https://randomuser.me/api/portraits/women/67.jpg",
            date: "Apr 18, 2023",
            content:
              "The code examples were clear and concise. I appreciate how you explained the reasoning behind each design decision.",
            likes: 7,
          },
        ]

        setComments(mockComments)

        // Fetch related articles
        const mockRelatedArticles = [
          {
            id: "5",
            title: "Mastering CSS Grid: A Comprehensive Guide",
            category: "CSS",
            image:
              "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            date: "Feb 15, 2023",
          },
          {
            id: "6",
            title: "Creating Accessible UI Components with Tailwind CSS",
            category: "Accessibility",
            image:
              "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            date: "Mar 10, 2023",
          },
          {
            id: "7",
            title: "Optimizing Images for Modern Web Applications",
            category: "Performance",
            image:
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
            date: "Apr 5, 2023",
          },
        ]

        setRelatedArticles(mockRelatedArticles)
      } catch (err) {
        setError("Haber yüklenemedi. Lütfen daha sonra tekrar deneyin.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
    // Scroll to top when navigating to a new blog post
    window.scrollTo(0, 0)
  }, [id])

  const handleCommentSubmit = (e) => {
    e.preventDefault()

    if (!newComment.trim() || !commentName.trim()) return

    const newCommentObj = {
      id: comments.length + 1,
      author: commentName,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(Math.random() * 100)}.jpg`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      content: newComment,
      likes: 0,
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")
    setCommentName("")
    setCommentEmail("")
  }

  const displayedComments = showAllComments ? comments : comments.slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0D1117]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4B6BFB]"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0D1117]">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-700 dark:text-gray-300">{error}</p>
          <Link to="/" className="mt-6 inline-block px-6 py-2 bg-[#4B6BFB] text-white rounded-lg">
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0D1117]">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Blog Not Found</h2>
          <p className="text-gray-700 dark:text-gray-300">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className="mt-6 inline-block px-6 py-2 bg-[#4B6BFB] text-white rounded-lg">
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-[#0D1117] min-h-screen">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-[#4B6BFB]/10 to-purple-500/10 dark:from-[#4B6BFB]/20 dark:to-purple-500/20">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center text-[#4B6BFB] mb-6 hover:underline">
            <ArrowLeft size={18} className="mr-2" />
           <span className="text-[#F7A91E]">Back to all articles</span>
          </Link>

          {/* Blog Header */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[#4B6BFB]/10 text-[#4B6BFB] dark:bg-[#4B6BFB]/20 rounded-full text-sm font-medium">
                {blog.category}
              </span>
              <span className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Clock size={14} className="mr-1" />
                {blog.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Rating and Views */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <StarRating rating={blog.rating} />
              <span className="flex items-center text-gray-600 dark:text-gray-400">
                <MessageCircle size={16} className="mr-1" />
                {comments.length} comments
              </span>
              <span className="flex items-center text-gray-600 dark:text-gray-400">
                <User size={16} className="mr-1" />
                {blog.views} views
              </span>
            </div>

            {/* Author and Meta Info */}
            <div className="flex items-center mb-8 p-4 bg-white dark:bg-[#181A2A] rounded-xl shadow-sm">
              <img
                src={blog.authorImage || "/placeholder.svg"}
                alt={blog.author}
                className="w-12 h-12 rounded-full mr-4 border-2 border-white dark:border-[#181A2A] shadow-sm"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{blog.author}</h3>
                <p className="text-gray-500 text-sm">{blog.authorRole}</p>
              </div>
              <div className="ml-auto flex items-center text-gray-500">
                <Calendar size={16} className="mr-1" />
                <span>{blog.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Image */}
        <div className="max-w-4xl mx-auto mb-10 -mt-6">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Blog Content */}
              <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6 md:p-8 mb-8">
                <div
                  className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-[#4B6BFB] prose-img:rounded-xl prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:text-sm"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

              {/* Tags */}
              <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-lg font-medium mb-4 dark:text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-[#0D1117] text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-6 dark:text-white">Comments ({comments.length})</h3>

                {/* Comment Form */}
                <div className="mb-8 bg-gray-50 dark:bg-[#0D1117] p-6 rounded-xl">
                  <h4 className="text-lg font-medium mb-4 dark:text-white">Leave a comment</h4>
                  <form onSubmit={handleCommentSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#4B6BFB] focus:border-transparent dark:bg-[#181A2A] dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Email (will not be published)
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#4B6BFB] focus:border-transparent dark:bg-[#181A2A] dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Comment *
                      </label>
                      <textarea
                        id="comment"
                        rows={4}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#4B6BFB] focus:border-transparent dark:bg-[#181A2A] dark:text-white"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center px-6 py-3 bg-[#F7A91E]  rounded-lg transition-colors"
                    >
                      <Send className="w-4 h-4 mr-2 text-[#231F20]" />
                     <span className="text-[#231F20] hover:text-white "> Post Comment</span>
                    </button>
                  </form>
                </div>

                {/* Comments List */}
                <div className="space-y-0">
                  {displayedComments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </div>

                {/* Show More Comments Button */}
                {comments.length > 3 && (
                  <button
                    onClick={() => setShowAllComments(!showAllComments)}
                    className="mt-6 w-full py-3 flex items-center justify-center text-[#4B6BFB] bg-gray-50 dark:bg-[#0D1117] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {showAllComments ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Show Less Comments
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2 text-[#F7A91E]" />
                        <span className="text-[#F7A91E]">Show All Comments ({comments.length})</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* Author Card */}
              <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6 mb-6">
                <div className="text-center">
                  <img
                    src={blog.authorImage || "/placeholder.svg"}
                    alt={blog.author}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-white dark:border-[#181A2A] shadow-sm"
                  />
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-1">{blog.author}</h3>
                  <p className="text-gray-500 text-sm mb-4">{blog.authorRole}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    Frontend developer specializing in responsive design and modern JavaScript frameworks.
                  </p>
                  <button className="w-full py-2 bg-[#4B6BFB]/10 text-[#4B6BFB] rounded-lg hover:bg-[#4B6BFB]/20 transition-colors">
                    View All Posts
                  </button>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6 mb-6">
                <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-4">Share This Article</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="flex-1 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition-colors">
                    Facebook
                  </button>
                  <button className="flex-1 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors">
                    Twitter
                  </button>
                  <button className="flex-1 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0A66C2]/90 transition-colors">
                    LinkedIn
                  </button>
                </div>
              </div>

             

              {/* Tags Card */}
              <div className="bg-white dark:bg-[#181A2A] rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-[#0D1117] text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-gray-100 dark:bg-[#0D1117] text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    JavaScript
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-[#0D1117] text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    React
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <RelatedArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
