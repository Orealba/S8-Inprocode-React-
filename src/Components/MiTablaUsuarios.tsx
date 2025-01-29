import { useState, useEffect } from 'react';
import { Table, Button } from 'flowbite-react';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  ubicacion: string;
  hobby: string;
}

export default function MiTablaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/usuarios');
      const data = await response.json();
      setUsuarios(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setIsLoading(false);
    }
  };

  const eliminarUsuario = async (id: number) => {
    try {
      await fetch(`TU_URL_API/usuarios/${id}`, {
        method: 'DELETE',
      });
      obtenerUsuarios(); // Recargar la lista
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-['KGPictureYou'] text-3xl">
            Tabla Usuarios
          </h2>
          <Button
            color="success"
            onClick={() => (window.location.href = '/agregar-usuario')}>
            Agregar Usuario
          </Button>
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Apellido</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Teléfono</Table.HeadCell>
              <Table.HeadCell>Ubicación</Table.HeadCell>
              <Table.HeadCell>Hobby</Table.HeadCell>
              <Table.HeadCell>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {usuarios.map((usuario) => (
                <Table.Row key={usuario.id}>
                  <Table.Cell>{usuario.id}</Table.Cell>
                  <Table.Cell>{usuario.nombre}</Table.Cell>
                  <Table.Cell>{usuario.apellido}</Table.Cell>
                  <Table.Cell>{usuario.email}</Table.Cell>
                  <Table.Cell>{usuario.telefono}</Table.Cell>
                  <Table.Cell>{usuario.ubicacion}</Table.Cell>
                  <Table.Cell>{usuario.hobby}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button
                        color="warning"
                        size="sm"
                        onClick={() =>
                          (window.location.href = `/editar-usuario/${usuario.id}`)
                        }>
                        Editar
                      </Button>
                      <Button
                        color="failure"
                        size="sm"
                        onClick={() => eliminarUsuario(usuario.id)}>
                        Eliminar
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
