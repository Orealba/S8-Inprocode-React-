import React from 'react';

export const Navbar = () => {
  return (
    <>
      <div className="flex justify-center">
        <nav className="bg-transparent border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
            <div
              className="w-full md:block md:w-auto"
              id="navbar-default">
              <ul className="font-medium flex flex-row p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li className="w-auto">
                  <a
                    href="#"
                    className="block py-2 px-3 text-white rounded text-sm md:text-base">
                    Home
                  </a>
                </li>
                <li className="w-auto">
                  <a
                    href="#"
                    className="block py-2 px-3 text-white rounded text-sm md:text-base">
                    Mapa
                  </a>
                </li>
                <li className="w-auto">
                  <a
                    href="#"
                    className="block py-2 px-3 text-white rounded text-sm md:text-base">
                    FullCalendar
                  </a>
                </li>
                <li className="w-auto">
                  <a
                    href="#"
                    className="block py-2 px-3 text-white rounded text-sm md:text-base">
                    Gráficos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
