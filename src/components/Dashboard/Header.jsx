import React from "react";
import { File, LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-zinc-900 border border-zinc-700 rounded-lg">
              <File className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Document <span className="text-orange-300">Hub</span>
              </h1>
              <p className="text-[20px] uppercase tracking-widest text-zinc-500 font-medium">
                Kelompok 1
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <User className="w-4 h-4 text-zinc-400" />
              </div>
              <span className="hidden sm:inline text-md font-medium text-zinc-300">
                {user?.name}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="group flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <span className="text-md font-medium">Logout</span>
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
