import { buildApiUrl } from "@/config/api";

export async function crearTag(nombreEtiqueta: string) {
  try {
    const response = await fetch(buildApiUrl("/tags"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombreEtiqueta: nombreEtiqueta,
      }),
    });

    if (response.ok) {
      const nuevoTag = await response.json();
      return nuevoTag;
    } else {
      throw new Error("Error al crear el tag");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
