import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div className="absolute top-6 left-6 z-30">
      <h1
        onClick={() => navigate("/")}
        className="text-3xl md:text-5xl font-extrabold 
                   bg-clip-text text-transparent 
                   bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400
                   drop-shadow-lg cursor-pointer
                   transition-transform duration-300 hover:scale-110"
      >
        OZ
      </h1>
    </div>
  );
}
