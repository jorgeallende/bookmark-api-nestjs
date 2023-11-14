import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <>
      Hello, world!
      <div className="flex gap-2">
        <button
          className={linkButtonStyle}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
        <button
          className={linkButtonStyle}
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
      </div>
    </>
  );
}

const linkButtonStyle =
  "text-white px-2 py-2 bg-green-800 rounded hover:bg-green-700";

export default App;
