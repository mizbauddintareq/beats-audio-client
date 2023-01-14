const Swal = require("sweetalert2");
export const errorAlert = (message) => {
  Swal.fire({
    icon: "error",
    title: `${message}`,
  });
};
