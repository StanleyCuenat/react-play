import { Outlet } from "react-router-dom";
import AuthGuard from "../Modules/Auth/AuthGuard";

export default function MainLayout() {
  return (
    <AuthGuard>
      <div>
        <Outlet />
      </div>
    </AuthGuard>
  );
}
