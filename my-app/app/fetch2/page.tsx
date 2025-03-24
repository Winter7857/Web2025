'use client'

import FetcherLink from "@/components/FetcherLink"
import Image from "next/image"
import { useEffect, useState } from "react"

interface PostType {
    id: number
    title: string
    author: string
    category: string
}

interface ProfileType {
    login: string
    id: number
    avatar_url: string
}


export default function FetchAPI1() {
    const [posts, setPosts] = useState<PostType[]>([])
    const [profile, setProfile] = useState<ProfileType>()

    useEffect(() => {
        async function fetchPosts() {
            try {
                // This API using Proxy to fetch from https://api.vercel.app/blog
                // Check at app/api/vercel/route.ts
                const res = await fetch('/api/vercel');
                const data = await res.json()
                setPosts(data)
            } catch (err) {
                console.log("Error:", err)
            }
        }
        fetchPosts()

        async function fetchProfile() {
            try {
                const data = await fetch('https://api.github.com/users/wwarodom')
                const profile: ProfileType = await data.json()
                setProfile(profile)
            }
            catch (err) {
                console.log("Error:", err)
            }
        }
        fetchProfile()
    }, [])

    if (!posts || !profile) return <div>Loading...</div>

    return (
        <div>
            <FetcherLink />
            <div>
                <h1 className="text-xl font-bold">FetchAPI: fetch in Client Component</h1>
                <div className="flex mt-4 border-2 border-black m-2 p-2 rounded-xl shadow-lg">
                    <div className="mr-4">
                        <Image
                            className="rounded-xl"
                            src={profile?.avatar_url}
                            alt="avatar"
                            height={100} width={100} />
                    </div>
                    <div className="mt-4">
                        <h2>Profile</h2>
                        <div>Login: {profile?.login}</div>
                        <div>Id: {profile?.id}</div>
                    </div>

                </div>


                <h2 className="mt-4">Posts</h2>
                <ul>
                    {posts.map((post: PostType) => (
                        <li key={post.id}
                            className="border-2 border-black m-2 p-2 rounded-xl shadow-lg"
                        >
                            {post.id}. {post.title}
                            <div>
                                Category: {post.category}
                            </div>
                            <div>
                                By: {post.author}
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}