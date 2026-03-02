// inside your page.js

import Profile from "@/components/Profile";

const DashboardPage = async () => {
  // Fetch your user data here
  const userData = {
    name: "Dr. Jane Smith",
    email: "jane.smith@university.edu",
    bio: "Senior Software Engineer with 10+ years of experience in Full-stack development. Passionate about teaching React, Node.js, and System Design.",
    totalSessions: 142,
    totalStudents: 850,
    rating: 4.9,
    createdAt: "2023-01-15"
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Profile user={userData} />
        
        {/* Other dashboard components below */}
        <div className="mt-8">
           <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
           {/* Add your table or create session buttons here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;