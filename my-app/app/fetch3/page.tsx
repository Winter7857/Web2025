"use client";

import FetcherLink from "@/components/FetcherLink";
import Image from "next/image";
import { useState } from "react";

interface ProfileType {
    login: string;
    id: number;
    avatar_url: string;
}

export default function GitHubProfileFetcher() {
    const [user, setUser] = useState("wwarodom");   // Default user
    const [profile, setProfile] = useState<ProfileType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchProfile = async () => {
        if (!user) {
            setError("Please enter a GitHub username");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`https://api.github.com/users/${user}`);
            if (!response.ok) throw new Error("User not found");
            const data: ProfileType = await response.json();
            setProfile(data);
        } catch (err) {
            setProfile(null);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <FetcherLink />
            <h1 className="text-2xl font-bold mb-4">GitHub Profile Fetcher</h1>

            {/* Input Field */}
            <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Enter GitHub username"
                className="w-full p-2 border rounded mb-3"
            />

            {/* Fetch Button */}
            <button
                onClick={fetchProfile}
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {loading ? "Loading..." : "Fetch Profile"}
            </button>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Display Profile Data */}
            {profile && (
                <div className="mt-4 p-4 border rounded">
                    <Image
                        src={profile.avatar_url}
                        width={100}
                        height={100}
                        alt="GitHub Avatar"
                        className="w-24 h-24 rounded-full mx-auto"
                    />
                    <p className="text-lg font-semibold mt-2">Username: {profile.login}</p>
                    <p className="text-gray-600">ID: {profile.id}</p>
                </div>
            )}
        </div>
    );
}