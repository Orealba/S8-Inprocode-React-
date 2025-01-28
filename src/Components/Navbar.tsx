import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const baseClass =
      'block py-2 px-3 text-white rounded text-sm md:text-base cursor-pointer';
    return location.pathname === path
      ? `${baseClass} border-b-2 border-white`
      : baseClass;
  };

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
                  <Link
                    to="/"
                    className={getLinkClass('/')}>
                    Home
                  </Link>
                </li>
                <li className="w-auto">
                  <Link
                    to="/mapa"
                    className={getLinkClass('/mapa')}>
                    Mapa
                  </Link>
                </li>
                <li className="w-auto">
                  <Link
                    to="/calendario"
                    className={getLinkClass('/calendario')}>
                    FullCalendar
                  </Link>
                </li>
                <li className="w-auto">
                  <Link
                    to="/grafico"
                    className={getLinkClass('/grafico')}>
                    Gráficos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
