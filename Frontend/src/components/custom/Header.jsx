import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";
import { Sun, Moon, Menu, X } from "lucide-react"; 
import darkai from "../../assets/darkai.png"
import lightai from "../../assets/lightai.png"
// import darkLogo from "../../assets/DarkLogo.png";
// import resume from "../../assets/Resume.jpg"
import { Button } from "../ui/button";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.statusCode === 200) {
        dispatch(addUserData(""));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-5">
        <Link to="/">
          <img
            src={theme === "light" ? darkai : lightai}
            alt="logo"
            className="w-[9rem]"
          />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          {user ? (
            <>
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Link to="/auth/sign-in">
              <Button>Get Started</Button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 bg-gray-100 dark:bg-gray-800 p-5">
          <Button variant="outline" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          {user ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/dashboard");
                  toggleMenu();
                }}
              >
                Dashboard
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Link to="/auth/sign-in">
              <Button onClick={toggleMenu}>Get Started</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Header;
