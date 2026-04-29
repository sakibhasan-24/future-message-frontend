import ProtectedRoute from "@/components/routes/ProtectedRoute";


export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Dashboard</div>
    </ProtectedRoute>
  );
}