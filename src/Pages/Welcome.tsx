import { Navbar } from '../Components/Navbar';
import { Header } from '../Components/Header';

export const Welcome = () => {
  return (
    <>
      <div>
        <Navbar />
        <h1 className="flex justify-center font-['KGPictureYou'] text-white text-4xl sm:text-5xl md:text-4xl lg:text-7xl ">
          CONECTANDO CON EL DEPORTE
        </h1>
        <Header />
      </div>
    </>
  );
};
