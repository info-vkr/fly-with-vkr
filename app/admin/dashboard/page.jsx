export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl mt-2">120</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700">Active Packages</h3>
          <p className="text-3xl mt-2">15</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700">New News Items</h3>
          <p className="text-3xl mt-2">8</p>
        </div>
      </div>
    </div>
  );
}
