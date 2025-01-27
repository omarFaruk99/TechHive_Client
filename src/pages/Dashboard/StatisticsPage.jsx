import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const StatisticsPage = () => {
  const [stats, setStats] = useState({
    acceptedProducts: 0,
    pendingProducts: 0,
    rejectedProducts: 0,
    totalReviews: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Get products statistics
        const productsResponse = await axiosSecure.get(
          "/products/review-queue"
        );
        const products = productsResponse.data;

        const accepted = products.filter((p) => p.status === "accepted").length;
        const pending = products.filter((p) => p.status === "pending").length;
        const rejected = products.filter((p) => p.status === "rejected").length;

        // Get reviews count
        const reviewsResponse = await axiosSecure.get("/reviews/count");
        const reviewsCount = reviewsResponse.data.count;

        // Get users count
        const usersResponse = await axiosSecure.get("/users");
        const usersCount = usersResponse.data.length;

        setStats({
          acceptedProducts: accepted,
          pendingProducts: pending,
          rejectedProducts: rejected,
          totalReviews: reviewsCount,
          totalUsers: usersCount,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [axiosSecure]);

  // Updated modern color palette
  const data = [
    {
      name: "Accepted Products",
      value: stats.acceptedProducts,
      color: "#22C55E", // Updated green
      gradient: "from-green-400 to-green-600",
    },
    {
      name: "Pending Products",
      value: stats.pendingProducts,
      color: "#3B82F6", // Updated blue
      gradient: "from-blue-400 to-blue-600",
    },
    {
      name: "Rejected Products",
      value: stats.rejectedProducts,
      color: "#EF4444", // Updated red
      gradient: "from-red-400 to-red-600",
    },
    {
      name: "Total Reviews",
      value: stats.totalReviews,
      color: "#A855F7", // Updated purple
      gradient: "from-purple-400 to-purple-600",
    },
    {
      name: "Total Users",
      value: stats.totalUsers,
      color: "#EC4899", // Updated pink
      gradient: "from-pink-400 to-pink-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <div className="p-4 md:p-6 bg-gray-950">
      <div className="max-w-7xl mx-auto bg-gray-900/50 rounded-2xl p-6 md:p-10 backdrop-blur-xl border border-gray-800/50">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Site Statistics Dashboard
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-10">
          {/* Pie Chart Container - Made slightly smaller */}
          <div className="relative w-64 h-64 md:w-72 md:h-72 transition-transform hover:scale-105 duration-300">
            <svg
              viewBox="0 0 100 100"
              className="transform -rotate-90 drop-shadow-2xl"
            >
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const angle = (percentage / 100) * 360;
                const slice = (
                  <path
                    key={index}
                    d={`M50,50 L${
                      50 + 45 * Math.cos((currentAngle * Math.PI) / 180)
                    },${
                      50 + 45 * Math.sin((currentAngle * Math.PI) / 180)
                    } A45,45 0 ${angle > 180 ? 1 : 0},1 ${
                      50 +
                      45 * Math.cos(((currentAngle + angle) * Math.PI) / 180)
                    },${
                      50 +
                      45 * Math.sin(((currentAngle + angle) * Math.PI) / 180)
                    } Z`}
                    fill={item.color}
                    className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  />
                );
                currentAngle += angle;
                return slice;
              })}
            </svg>
          </div>

          {/* Updated Legend - More compact */}
          <div className="grid grid-cols-1 gap-4 bg-gray-800/50 p-6 rounded-xl backdrop-blur-lg border border-gray-700/50">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 transition-all hover:translate-x-2 duration-300 hover:bg-gray-700/30 p-2 rounded-lg"
              >
                <div
                  className="w-4 h-4 rounded-md shadow-lg"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-100 font-medium text-sm md:text-base">
                  {item.name}: {item.value}{" "}
                  <span className="text-xs md:text-sm text-gray-400 ml-1">
                    ({((item.value / total) * 100).toFixed(1)}%)
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Updated Statistics Cards - More compact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className={`p-4 md:p-6 rounded-xl bg-gradient-to-br ${item.gradient} 
                transform transition-all duration-300 hover:scale-102 hover:shadow-lg
                backdrop-blur-sm bg-opacity-10 border border-gray-700/20`}
            >
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                {item.name}
              </h3>
              <p className="text-3xl md:text-4xl font-bold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
