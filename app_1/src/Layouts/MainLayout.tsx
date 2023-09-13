import { Outlet } from "react-router-dom";
import AuthGuard from "../Modules/Auth/AuthGuard";

export default function MainLayout() {
  return (
    <AuthGuard>
      <div className="flex flex-grow flex-col">
        <Outlet />
      </div>
    </AuthGuard>
  );
}
