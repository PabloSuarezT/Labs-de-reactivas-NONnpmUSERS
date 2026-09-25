import { Post } from "../models/posts";

const escapeRegExp = (s: string): string =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function filterPostsByWord(posts: Post[], query: string): Post[] {
  if (!query) {
    return [];
  }

  const pattern = new RegExp(`\\b${escapeRegExp(query)}\\b`, "i");
  return posts.filter((post) => pattern.test(post.content));
}