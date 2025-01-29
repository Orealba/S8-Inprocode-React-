import { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import AgregarUsuario from './AgregarUsuario';
import EditarUsuario from './EditarUsuario';

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

export default function CRUD() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<Usuario | null>(
    null,
  );

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:8080/usuarios');
      const data = await response.json();
      const usuariosOrdenados = data.sort(
        (a: Usuario, b: Usuario) => (a.id || 0) - (b.id || 0),
      );
      setUsuarios(usuariosOrdenados);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleEditar = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setMostrarEditar(true);
    setMostrarFormulario(false);
  };

  const handleEliminar = async () => {
    if (!usuarioAEliminar) return;

    try {
      const response = await fetch(
        `http://localhost:8080/usuarios/${usuarioAEliminar.id}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        obtenerUsuarios();
        setMostrarModalEliminar(false);
        setUsuarioAEliminar(null);
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-['KGPictureYou'] text-3xl">
            Gestión de Usuarios
          </h2>
          <Button
            color="success"
            onClick={() => {
              setMostrarFormulario(true);
              setMostrarEditar(false);
              setUsuarioEditando(null);
            }}>
            Agregar Usuario
          </Button>
        </div>

        {mostrarFormulario && (
          <AgregarUsuario
            onClose={() => setMostrarFormulario(false)}
            onUsuarioCreado={() => {
              obtenerUsuarios();
              setMostrarFormulario(false);
            }}
          />
        )}

        {mostrarEditar && usuarioEditando && (
          <EditarUsuario
            usuario={usuarioEditando}
            onClose={() => {
              setMostrarEditar(false);
              setUsuarioEditando(null);
            }}
            onUsuarioEditado={() => {
              obtenerUsuarios();
              setMostrarEditar(false);
              setUsuarioEditando(null);
            }}
          />
        )}

        <div className="overflow-x-auto shadow-md rounded-lg">
          <Table
            striped
            className="text-sm">
            <Table.Head>
              <Table.HeadCell className="px-2 py-2">ID</Table.HeadCell>
              <Table.HeadCell className="px-2 py-2">Nombre</Table.HeadCell>
              <Table.HeadCell className="px-2 py-2">Apellido</Table.HeadCell>
              <Table.HeadCell className="px-2 py-2">Email</Table.HeadCell>
              <Table.HeadCell className="px-2 py-2">Teléfono</Table.HeadCell>
              <Table.HeadCell className="px-2 py-2">Edad</Table.HeadCell>
              <Table.HeadCell className="px-2 py-2">Dirección</Table.HeadCell>
              <Table.HeadCell className="px-2 py-2">Lat</Table.HeadCell>
              <Table.HeadCell className="px-2 py-2">Long</Table.HeadCell>
              <Table.HeadCell className="px-2 py-2">Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className="text-sm">
              {usuarios.map((usuario) => (
                <Table.Row key={usuario.id}>
                  <Table.Cell className="px-2 py-2">{usuario.id}</Table.Cell>
                  <Table.Cell className="px-2 py-2">
                    {usuario.nombre}
                  </Table.Cell>
                  <Table.Cell className="px-2 py-2">
                    {usuario.apellido}
                  </Table.Cell>
                  <Table.Cell className="px-2 py-2">{usuario.email}</Table.Cell>
                  <Table.Cell className="px-2 py-2">
                    {usuario.telefono}
                  </Table.Cell>
                  <Table.Cell className="px-2 py-2">{usuario.edad}</Table.Cell>
                  <Table.Cell className="px-2 py-2">
                    {usuario.direccion}
                  </Table.Cell>
                  <Table.Cell className="px-2 py-2">
                    {usuario.latitud}
                  </Table.Cell>
                  <Table.Cell className="px-2 py-2">
                    {usuario.longitud}
                  </Table.Cell>
                  <Table.Cell className="px-2 py-2">
                    <div className="flex gap-1">
                      <Button
                        color="warning"
                        size="xs"
                        onClick={() => handleEditar(usuario)}>
                        Editar
                      </Button>
                      <Button
                        color="failure"
                        size="xs"
                        onClick={() => {
                          setUsuarioAEliminar(usuario);
                          setMostrarModalEliminar(true);
                        }}>
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

      <Modal
        show={mostrarModalEliminar}
        size="md"
        popup
        onClose={() => setMostrarModalEliminar(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Estás seguro que deseas eliminar a este usuario?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleEliminar}>
                Sí, eliminar
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setMostrarModalEliminar(false);
                  setUsuarioAEliminar(null);
                }}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
