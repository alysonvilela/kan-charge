import { Outlet } from "react-router-dom";

export const ClientsScreen = () => {
  return (
    <section className="px-4 md:px-0 pt-16 w-full">
      <div className="max-w-md pb-16">
        <h1 className="text-slate-800 text-xl font-extrabold sm:text-2xl">
          Cobranças efetuadas
        </h1>
        <p className="text-slate-600 mt-2">
          Listagem de todas as cobrancas efetuadas.
        </p>
      </div>

      <Outlet />
    </section>
  );
};
