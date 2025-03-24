import FetcherLink from "@/components/FetcherLink"
import Image from "next/image";

interface PostType {
  id: number;
  title: string;
  author: string;
  category: string;
}

interface ProfileType {
  login: string;
  id: number;
  avatar_url: string;
}

async function fetchPosts(): Promise<PostType[] | null> {
  try {
    const res = await fetch("https://api.vercel.app/blog");
    return await res.json();
  } catch (err) {
    console.log("Error:", err);
    return null;
  }
}

async function fetchProfile(): Promise<ProfileType | null> {
  try {
    const res = await fetch("https://api.github.com/users/wwarodom");
    return await res.json();
  } catch (err) {
    console.log("Error:", err);
    return null;
  }
}

export default async function FetchAPI1() {
  const posts = await fetchPosts();
  const profile = await fetchProfile();

  if (!posts || !profile) return <div>Loading or Error...</div>;

  return (
    <div className="p-4">
      <FetcherLink />

      <h1 className="text-xl font-bold">FetchAPI: fetch in Server Component</h1>

      <div className="flex mt-4 border-2 border-black m-2 p-2 rounded-xl shadow-lg">
        <div className="mr-4">
          <Image
            className="rounded-xl"
            src={profile.avatar_url}
            alt="avatar"
            height={100}
            width={100}
          />
        </div>
        <div className="mt-4">
          <h2 className="font-semibold">Profile</h2>
          <div>Login: {profile.login}</div>
          <div>ID: {profile.id}</div>
        </div>
      </div>

      <h2 className="mt-4 text-lg font-semibold">Posts</h2>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className="border-2 border-black m-2 p-2 rounded-xl shadow-lg"
          >
            {post.id}. {post.title}
            <div>Category: {post.category}</div>
            <div>By: {post.author}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
