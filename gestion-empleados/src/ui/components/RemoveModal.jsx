import { useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";

export const RemoveModal = ({ employee, onConfirm, onDeny }) => {
  useEffect(() => {
    showAlert();
  }, []);

  const showAlert = () => {
    Swal.fire({
      title: `¿Está seguro que desea eliminar a ${employee.FIRST_NAME} ${employee.LAST_NAME}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `Volver`,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(); // Llama a la función onConfirm pasada desde el padre
        Swal.fire("Eliminado!", "", "success");
      } else if (result.isDenied) {
        onDeny(); // Llama a la función onDeny pasada desde el padre
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  return <></>;
};
