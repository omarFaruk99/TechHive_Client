import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false); // Replace with actual subscription status
  const navigate = useNavigate();

  const handleSubscribe = () => {
    // Redirect to payment page or open a modal
    // navigate("/payment"); // Example: Redirect to payment page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.displayName}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        {!isSubscribed ? (
          <button
            onClick={handleSubscribe}
            className="bg-accent text-white px-4 py-2 rounded hover:bg-accentDark"
          >
            Subscribe for $10/month
          </button>
        ) : (
          <div className="mt-4">
            <p className="text-green-600 font-semibold">Status: Verified</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
