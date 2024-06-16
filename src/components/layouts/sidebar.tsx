import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"


export default () => {
  const [state, setState] = useState(false)

  const submenuNav = [
    { title: "Cobrar clientes", path: "/charge" },
    { title: "Histórico", path: "/clients" },
  ]

  return (<>
    <header className="text-base lg:text-sm">
      <div className={`bg-white items-center gap-x-14 px-4 max-w-screen-xl mx-auto lg:flex lg:px-8 lg:static ${state ? "h-full fixed inset-x-0" : ""}`}>
        <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
          <a href="javascript:void(0)">
            <h1 className="text-2xl font-bold">KanCharger</h1>
          </a>
          <div className="lg:hidden">
            <button className="text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {
                state ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                  </svg>

                )
              }
            </button>
          </div>
        </div>
        <div className={`nav-menu flex-1 pb-28 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${state ? "" : "hidden"}`}>
        </div>
      </div>
      <nav className="border-b">
        <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
          {
            submenuNav.map((item, idx) => {
              return (
                <NavLink to={item.path} key={idx} className={({ isActive }) => `py-1 ${isActive ? "border-b-2 border-indigo-600" : ""}`}>
                  <a href={item.path} className="block py-2 px-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150">
                    {item.title}
                  </a>
                </NavLink>
              )
            })
          }
        </ul>
      </nav>
    </header>
    <main className="bg-slate-50 min-h-screen">
      <div className={`max-w-screen-xl mx-auto lg:flex lg:px-8 w-full`}>
        <Outlet />
      </div>
    </main>
  </>
  )
}