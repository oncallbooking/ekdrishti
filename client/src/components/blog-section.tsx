import { useState } from "react";
import { useComments } from "@/hooks/use-comments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    id: "1",
    title: "Digital India Initiative 2025",
    excerpt: "Latest updates on the Digital India mission and new government services being launched...",
    date: "Jan 15, 2025",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Digital governance workspace"
  },
  {
    id: "2", 
    title: "New Student Portal Features",
    excerpt: "Explore the latest features added to student portals including AI-powered career guidance...",
    date: "Jan 12, 2025",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Students in digital classroom"
  },
  {
    id: "3",
    title: "e-Governance Best Practices", 
    excerpt: "Learn about the most effective e-governance implementations across different states...",
    date: "Jan 10, 2025",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    alt: "Modern government building"
  }
];

export default function BlogSection() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  
  const { comments, addComment } = useComments(selectedPostId || "");

  const showComments = (postId: string) => {
    setSelectedPostId(postId);
    setTimeout(() => {
      const commentsSection = document.getElementById('comments-section');
      commentsSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPostId && commentName && commentEmail && commentText) {
      addComment(commentName, commentEmail, commentText);
      setCommentName("");
      setCommentEmail("");
      setCommentText("");
    }
  };

  return (
    <section className="py-16 px-4" id="blog">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Latest Updates & News</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="glass-effect rounded-xl overflow-hidden hover:bg-card transition-colors group"
              data-testid={`blog-post-${post.id}`}
            >
              <img 
                src={post.image} 
                alt={post.alt} 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-3">{post.title}</h4>
                <p className="text-secondary-foreground text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => showComments(post.id)}
                    className="text-primary hover:text-blue-400"
                    data-testid={`button-comments-${post.id}`}
                  >
                    Read More & Comment
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Comments Section */}
        {selectedPostId && (
          <div id="comments-section" className="mt-12">
            <Card className="glass-effect">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-6">Comments</h4>
                
                {/* Comment Form */}
                <form onSubmit={handleSubmitComment} className="mb-6" data-testid="comment-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="bg-secondary border-border"
                      required
                      data-testid="input-comment-name"
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="bg-secondary border-border"
                      required
                      data-testid="input-comment-email"
                    />
                  </div>
                  <Textarea
                    placeholder="Your Comment"
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-secondary border-border mb-4"
                    required
                    data-testid="textarea-comment-text"
                  />
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-blue-600"
                    data-testid="button-submit-comment"
                  >
                    Post Comment
                  </Button>
                </form>

                {/* Comments List */}
                <div className="space-y-4" data-testid="comments-list">
                  {comments.length === 0 ? (
                    <p className="text-secondary-foreground text-sm">No comments yet. Be the first to comment!</p>
                  ) : (
                    comments.map((comment) => (
                      <Card key={comment.id} className="border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{comment.name}</span>
                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-secondary-foreground text-sm">{comment.text}</p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
