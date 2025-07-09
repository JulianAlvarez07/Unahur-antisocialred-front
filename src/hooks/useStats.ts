import { useState, useEffect } from "react";
import { Post, User, Tag } from "@/types/interfaces";
import { buildApiUrl } from "@/config/api";

interface Stats {
  posts: Post[];
  users: User[];
  tags: Tag[];
  loading: boolean;
  error: string | null;
}

export const useStats = () => {
  const [stats, setStats] = useState<Stats>({
    posts: [],
    users: [],
    tags: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsResponse, usersResponse, tagsResponse] = await Promise.all([
          fetch(buildApiUrl("/post")),
          fetch(buildApiUrl("/users")),
          fetch(buildApiUrl("/tags")),
        ]);

        const [postsData, usersData, tagsData] = await Promise.all([
          postsResponse.json(),
          usersResponse.json(),
          tagsResponse.json(),
        ]);

        setStats({
          posts: postsData,
          users: usersData,
          tags: tagsData,
          loading: false,
          error: null,
        });
      } catch (error) {
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "Error desconocido",
        }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};
