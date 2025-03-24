"use client";
import { useEffect, useState } from "react";

interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export default function UsersList() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      setUsers(data.users.slice(0, 10)); // first 10
    };
    fetchUsers();
  }, []);

  return (
    <>
      <main className="p-6 max-w-5xl mx-auto min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">👥 User List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div key={user.id} className="bg-white shadow-md p-4 rounded-lg border hover:shadow-lg transition duration-200">
              <p><span className="font-semibold">ID:</span> {user.id}</p>
              <p><span className="font-semibold">Name:</span> {user.firstName} {user.lastName}</p>
              <p><span className="font-semibold">Age:</span> {user.age}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-4 bg-gray-200 text-sm mt-8">
        Copyright © 2025 All rights reserved
      </footer>
    </>
  );
}
