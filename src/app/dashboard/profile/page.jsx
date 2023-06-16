"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdEmail, MdPhone } from "react-icons/md";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  useEffect(() => {
    if (session) {
      setUser(session.user.user);
    }
  }, [session]);
  return (
    <div className="max-w-3xl mx-auto py-12 px-10">
      <h1 className="text-3xl font-bold mb-6">Profile Information</h1>
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-lg font-bold">Name:</span>
        <span className="text-lg">{user.name}</span>
      </div>
      <div className="flex items-center space-x-4 mb-6">
        <MdEmail size={24} className="text-blue-500" />
        <span className="text-lg">{user.email}</span>
      </div>
      {user.phone && (
        <div className="flex items-center space-x-4 mb-6">
          <MdPhone size={24} className="text-blue-500" />
          <span className="text-lg">{user.phone}</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
