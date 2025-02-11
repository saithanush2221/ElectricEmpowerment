import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Post, Comment } from "@shared/schema";

export default function Community() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const { data: comments, isLoading: commentsLoading } = useQuery<Comment[]>({
    queryKey: ["/api/posts", selectedPost, "comments"],
    enabled: selectedPost !== null,
  });

  const createPostMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/posts", {
        title,
        content,
        author: "Anonymous User", // Simplified for demo
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setTitle("");
      setContent("");
      toast({
        title: "Post created successfully",
        description: "Your post has been published to the community.",
      });
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: async () => {
      if (!selectedPost) return;
      await apiRequest("POST", `/api/posts/${selectedPost}/comments`, {
        content: comment,
        author: "Anonymous User", // Simplified for demo
      });
    },
    onSuccess: () => {
      if (selectedPost) {
        queryClient.invalidateQueries({ queryKey: ["/api/posts", selectedPost, "comments"] });
      }
      setComment("");
      toast({
        title: "Comment added",
        description: "Your comment has been published.",
      });
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Community Forum</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create a Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createPostMutation.mutate();
                  }}
                  className="space-y-4"
                >
                  <Input
                    placeholder="Post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <Button type="submit" disabled={createPostMutation.isPending}>
                    Post
                  </Button>
                </form>
              </CardContent>
            </Card>

            {postsLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-[200px]" />
                <Skeleton className="h-[200px]" />
              </div>
            ) : (
              <div className="space-y-4">
                {posts?.map((post) => (
                  <Card
                    key={post.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedPost(post.id)}
                  >
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{post.content}</p>
                      <div className="mt-4 text-sm text-muted-foreground">
                        Posted by {post.author} on{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div>
            {selectedPost && (
              <Card>
                <CardHeader>
                  <CardTitle>Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      createCommentMutation.mutate();
                    }}
                    className="space-y-4 mb-4"
                  >
                    <Textarea
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button type="submit" disabled={createCommentMutation.isPending}>
                      Comment
                    </Button>
                  </form>

                  {commentsLoading ? (
                    <Skeleton className="h-[100px]" />
                  ) : (
                    <div className="space-y-4">
                      {comments?.map((comment) => (
                        <div key={comment.id} className="border-b pb-4">
                          <p>{comment.content}</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            {comment.author} -{" "}
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
