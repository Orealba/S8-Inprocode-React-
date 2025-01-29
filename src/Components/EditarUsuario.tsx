import { useState, useEffect } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';

interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  latitud: string;
  longitud: string;
  edad: string;
}

interface Props {
  usuario: Usuario;
  onClose: () => void;
  onUsuarioEditado: () => void;
}

export default function EditarUsuario({
  usuario: usuarioInicial,
  onClose,
  onUsuarioEditado,
}: Props) {
  const [usuario, setUsuario] = useState<Usuario>(usuarioInicial);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/usuarios/${usuario.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario),
        },
      );

      if (response.ok) {
        onUsuarioEditado();
      }
    } catch (error) {
      console.error('Error al editar usuario:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mb-8 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-white text-xl mb-4">Editar Usuario</h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="nombre"
              value="Nombre"
              className="text-white"
            />
            <TextInput
              id="nombre"
              name="nombre"
              type="text"
              required
              value={usuario.nombre}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor="apellido"
              value="Apellido"
              className="text-white"
            />
            <TextInput
              id="apellido"
              name="apellido"
              type="text"
              required
              value={usuario.apellido}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              value="Email"
              className="text-white"
            />
            <TextInput
              id="email"
              name="email"
              type="email"
              required
              value={usuario.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor="telefono"
              value="Teléfono"
              className="text-white"
            />
            <TextInput
              id="telefono"
              name="telefono"
              type="tel"
              required
              value={usuario.telefono}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor="edad"
              value="Edad"
              className="text-white"
            />
            <TextInput
              id="edad"
              name="edad"
              type="number"
              required
              value={usuario.edad}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor="direccion"
              value="Dirección"
              className="text-white"
            />
            <TextInput
              id="direccion"
              name="direccion"
              type="text"
              required
              value={usuario.direccion}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor="latitud"
              value="Latitud"
              className="text-white"
            />
            <TextInput
              id="latitud"
              name="latitud"
              type="text"
              required
              value={usuario.latitud}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor="longitud"
              value="Longitud"
              className="text-white"
            />
            <TextInput
              id="longitud"
              name="longitud"
              type="text"
              required
              value={usuario.longitud}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            color="success">
            Guardar Cambios
          </Button>
          <Button
            color="failure"
            onClick={onClose}
            type="button">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
