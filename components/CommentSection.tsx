"use client";

import { useState, useEffect } from "react";
import { MessageSquare, User, Send, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type Comment = {
  _id: string;
  content: string;
  author: string;
  _createdAt: string;
};

const COMMENTS_PER_PAGE = 3;

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [visibleComments, setVisibleComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  useEffect(() => {
    setVisibleComments(comments.slice(0, page * COMMENTS_PER_PAGE));
  }, [comments, page]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await res.json();
      setComments(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content: newComment, author }),
      });
      if (!res.ok) {
        throw new Error("Failed to submit comment");
      }
      setNewComment("");
      setAuthor("");
      fetchComments();
      setError(null);
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("Failed to submit comment. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadMoreComments = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
          <MessageSquare className="mr-2" />
          Comments
        </h3>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center"
            >
              <AlertCircle className="mr-2" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <>
            <ul className="space-y-6 mb-8">
              <AnimatePresence>
                {visibleComments.map((comment) => (
                  <motion.li
                    key={comment._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow transition-all duration-300 hover:shadow-md"
                  >
                    <p className="text-gray-800 dark:text-gray-200">
                      {comment.content}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <User className="w-4 h-4 mr-1" />
                      <span>{comment.author || "Anonymous"}</span>
                      <span className="mx-2">•</span>
                      <time dateTime={comment._createdAt}>
                        {new Date(comment._createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            {visibleComments.length < comments.length && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadMoreComments}
                className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center"
              >
                <ChevronDown className="mr-2" />
                View more comments
              </motion.button>
            )}
          </>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name (optional)
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Write a comment..."
              rows={3}
              required
            ></textarea>
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center transition-all duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="mr-2" />
                Comment
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}