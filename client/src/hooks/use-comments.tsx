import { useState, useEffect } from "react";

interface Comment {
  id: string;
  name: string;
  email: string;
  text: string;
  date: string;
}

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadComments = () => {
    const stored = localStorage.getItem(`comments_${postId}`);
    if (stored) {
      setComments(JSON.parse(stored));
    } else {
      setComments([]);
    }
  };

  const addComment = (name: string, email: string, text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      name,
      email,
      text,
      date: new Date().toLocaleDateString()
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  return {
    comments,
    addComment,
    isLoading,
  };
}
