"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });
  const [isManagerLogin, setIsManagerLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const dummyUsers = [
    { id: 1, email: "manager@gmail.com", password: "manager123", role: "manager" },
    { id: 2, email: "storekeeper@gmail.com", password: "storekeeper123", role: "user" },
  ];

  console.log(user)
  const handleLogin = () => {
    if (!user.email || !user.password) {
      alert("Enter all fields");

      return;
    }



    const foundUser = dummyUsers.find(
      (u) => u.email === user.email && u.password === user.password
    );

    if (!foundUser) {
      alert("Invalid email or password");
      return;
    }


    document.cookie = `token=123456; path=/`;
    document.cookie = `role=${foundUser.role}; path=/`;

    if (foundUser.role === "manager") {
      router.push("/dashboard");
    } else {
      router.push("/products");
    }



  };

  return (<div className="login-wrapper"> <div className="star star-left"></div> <div className="star star-left"></div> <div className="star star-right"></div> <div className="star star-right"></div>


    <div className="login-card">
      <h2>Login</h2>

      <div className="input-box">
        <FaEnvelope className="input-icon" />
        <input
          type="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>

      <div className="input-box">
        <FaLock className="input-icon" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </div>

      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          id="managerCheck"
          checked={isManagerLogin}
          onChange={(e) => setIsManagerLogin(e.target.checked)}
        />
        <label htmlFor="managerCheck">Login as Manager</label>
      </div>

      <button onClick={handleLogin} className="login-btn">
        Login
      </button>
    </div>

    <style>{`
    .login-wrapper {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(-45deg, #6e8efb, #a777e3, #f3c4fb, #89f7fe);
      background-size: 400% 400%;
      animation: gradientBG 10s ease infinite;
      overflow: hidden;
      position: relative;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .login-card {
      width: 450px;
      padding: 40px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 12px 25px rgba(0,0,0,0.25);
      backdrop-filter: blur(12px);
      z-index: 10;
      position: relative;
    }

    h2 { 
      text-align: center; 
      margin-bottom: 30px; 
      font-size: 26px;
    }

    .input-box { position: relative; margin-bottom: 25px; }
    .input-box input {
      width: 380px;
      padding: 16px 50px;
      font-size: 16px;
      border-radius: 10px;
      border: 1px solid #ccc;
      outline: none;
      transition: 0.3s;
    }
    .input-box input:focus { border-color: #6e8efb; }
    .input-icon { position: absolute; top: 50%; left: 16px; transform: translateY(-50%); font-size: 20px; color: #555; }
    .eye-icon { position: absolute; top: 50%; right: 16px; transform: translateY(-50%); font-size: 20px; color: #555; cursor: pointer; }

    .checkbox-wrapper { display: flex; align-items: center; gap: 12px; margin: 20px 0; font-size: 16px; }

    .login-btn {
      width: 100%;
      padding: 16px;
      background: #6e8efb;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 18px;
      transition: 0.3s;
    }
    .login-btn:hover { background: #5670d5; }

    .star {
      width: 12px;
      height: 12px;
      background: yellow;
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      position: absolute;
      top: -10px;
      opacity: 0.7;
    }

    .star-left { left: 0; animation: starLeftDown 8s linear infinite; }
    .star-right { right: 0; animation: starRightDown 8s linear infinite; }

    @keyframes starLeftDown {
      0% { transform: translateX(0) translateY(0); }
      100% { transform: translateX(50px) translateY(100vh); }
    }
    @keyframes starRightDown {
      0% { transform: translateX(0) translateY(0); }
      100% { transform: translateX(-50px) translateY(100vh); }
    }

    @media (max-width: 480px) {
      .login-card { width: 95%; padding: 30px; }
      .input-box input { width: 100%; padding: 14px 45px; }
    }
  `}</style>
  </div>


  );
}
