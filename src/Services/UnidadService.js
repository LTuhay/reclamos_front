const token = localStorage.getItem("token");

const FetchUnidades = async () => {
  try {
    const response = await fetch(`http://localhost:8080/unidades/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const unidadesData = await response.json();
      return unidadesData;
    } else {
      console.error("Error al obtener unidades:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export default FetchUnidades;
