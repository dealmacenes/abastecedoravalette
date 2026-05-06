import { useEffect, useState } from "react";
import axios, { formToJSON } from "axios";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";

const AuthPage = () => {
  const [registerMode, setRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const { navigate, setLoading } = useAppContext();

  const inPanel = useLocation().pathname.includes("/panel");
  const inAdmin = useLocation().pathname.includes("/admin");

  useEffect(() => {
    setLoading(false);
  }, []);
  

  const handleAuth = async (e) => {
    e.preventDefault();

    if (registerMode) {
      if (!email || !username || !password) {
        return toast.error("Hay campos incompletos");
      }

      try {
        const res = await axios.post(
          "/api/user/register",
          {
            email,
            userName: username,
            name: nombre,
            password,
          },
          { withCredentials: true }
        );

        toast.success("Registro exitoso. Iniciá sesión ahora.");
        setRegisterMode(false);
        setEmail("");
        setNombre("");
        setUsername("");
        setPassword("");
      } catch (error) {
        console.error(error);
        const msg = error.response?.data?.message || "Error al registrarse";
        toast.error(msg);
      }
    } else {
      if (!email || !password) {
        return toast.error("Hay campos incompletos");
      }

      try {
        const res = await axios.post(
          "/api/user/login",
          {
            identifier: email, // en backend verificás ambos
            password,
          },
          { withCredentials: true }
        );

        toast.success("Sesión iniciada correctamente");
        if (!inAdmin && !inPanel) {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        const msg = error.response?.data?.message || "Error al iniciar sesión";
        toast.error(msg);
      }
    }
  };

  return (
    <>
      <main className="flex h-screen w-full justify-center items-center">
        <section className="flex flex-col w-full max-w-8/10 lg:max-w-1/3 h-fit rounded-lg px-4 py-6">
          <h1 className="text-4xl font-bold text-center select-none text-neutral-200">
            {registerMode ? "Registrate" : "Iniciá sesión"}
          </h1>
          <form className="mt-10 space-y-3">
            <label className="flex flex-col gap-1" hidden={!registerMode}>
              <span className="text-xs lg:text-sm text-neutral-400">
                Nombre de usuario
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="juanperez1663"
                required
                className="outline-neutral-300 text-neutral-300 placeholder:text-neutral-400 py-2 border border-neutral-500 bg-neutral-800 rounded px-2"
              />
            </label>
            <label className="flex flex-col gap-1" hidden={!registerMode}>
              <span className="text-xs lg:text-sm text-neutral-400">
                Nombre completo
              </span>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Juan Perez"
                required
                className="outline-neutral-300 text-neutral-300 placeholder:text-neutral-400 py-2 border border-neutral-500 bg-neutral-800 rounded px-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs lg:text-sm text-neutral-400">
                {registerMode
                  ? "Correo Electrónico"
                  : "Correo Electrónico o Nombre de usuario"}{" "}
              </span>
              <input
                type={registerMode ? "email" : "text"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={registerMode ? "juanperez@tuemail.com" : "juanperez | juanperez@tuemail.com"}
                required
                className="outline-neutral-300 text-neutral-300 placeholder:text-neutral-400 py-2 border border-neutral-500 bg-neutral-800 rounded px-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs lg:text-sm text-neutral-400">
                Contraseña
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="outline-neutral-300 text-neutral-300 placeholder:text-neutral-400 py-2 border border-neutral-500 bg-neutral-800 rounded px-2"
              />
            </label>
            <p className="flex gap-1 mx-auto w-fit select-none text-neutral-300">
              {registerMode ? "Ya tenés una cuenta?" : "No tenés cuenta?"}
              <span
                onClick={() => setRegisterMode(!registerMode)}
                className="text-main-accent cursor-pointer hover:border-b border-main-accent"
              >
                {registerMode ? "Ingresá acá" : "Registrate acá"}
              </span>
            </p>
            <button
              onClick={handleAuth}
              className="flex w-full mx-auto py-2 px-6 bg-main border border-main-border rounded text-main-text font-bold mt-5 place-content-center select-none cursor-pointer active:scale-95"
            >
              {registerMode ? "Registrarme" : "Iniciar sesión"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default AuthPage;
