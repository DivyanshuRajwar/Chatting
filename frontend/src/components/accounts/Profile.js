import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { generateAvatar } from "../../utils/GenerateAvatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser, updateUserProfile, setError } = useAuth();

  useEffect(() => {
    setUsername(currentUser?.displayName || "");
    const avatarList = generateAvatar();
    setAvatars(avatarList);
  }, [currentUser]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (selectedAvatar === null) {
      return setError("Please select an avatar");
    }

    try {
      setError("");
      setLoading(true);

      const user = currentUser;
      const profile = {
        displayName: username,
        photoURL: avatars[selectedAvatar],
      };

      await updateUserProfile(user, profile);
      navigate("/");
    } catch (error) {
      console.error("Error while updating profile:", error);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-4 text-3xl tracking-tight font-light dark:text-white">
            Pick an avatar
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap justify-center gap-4">
            {avatars.map((avatar, index) => (
              <div key={index} className="relative">
                <img
                  alt={`Avatar ${index + 1}`}
                  src={avatar}
                  className={classNames(
                    index === selectedAvatar
                      ? "border-4 border-blue-700 dark:border-blue-500"
                      : "cursor-pointer hover:border-4 hover:border-blue-400",
                    "w-28 h-28 rounded-full object-cover object-center transition-all duration-200"
                  )}
                  onClick={() => setSelectedAvatar(index)}
                />
                {index === selectedAvatar && (
                  <div className="absolute top-1 right-1 bg-blue-700 text-white text-xs px-2 py-0.5 rounded-full">
                    Selected
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-md shadow-sm">
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a Display Name"
              className="block w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
