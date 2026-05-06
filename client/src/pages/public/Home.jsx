import { useEffect } from "react";
import DynamicHero from "../../components/DynamicHero";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const Home = () => {
  const {setLoading} = useAppContext();
  useEffect(()=> {
    setLoading(false)
  },[])
  return (
    <>
    <main className="flex flex-col w-full">
      <section className="flex flex-col sm:flex-row p-5">
        <div className="flex flex-col w-full mt-5 lg:mt-12">
          <h3 className="flex text-6xl text-neutral-100 font-bold lg:w-9/10 mx-auto">POS + Inventario Global</h3>
          <h2 className="text-2xl lg:max-w-9/10 mx-auto mt-6 text-neutral-400">Optimizá tu trabajo con nuestra solución integral de punto de venta e inventario. Llevá el control de tu negocio mas fácil que nunca!</h2>

          <div className="flex flex-col sm:flex-row w-fit mx-auto mt-10 sm:ml-0 lg:ml-5 xl:ml-8 gap-5 items-center">
            <button className="px-10 text-lg py-2 rounded-md border border-neutral-600 bg-neutral-800 text-neutral-200 w-fit cursor-pointer">Empezá gratis!</button>

            <Link to="/info" className="text-lg text-neutral-200 hover:underline underline-offset-4">Mas información</Link>
          </div>

        </div>
        <DynamicHero/>
      </section>

    </main>
    </>
  );
};

export default Home;
