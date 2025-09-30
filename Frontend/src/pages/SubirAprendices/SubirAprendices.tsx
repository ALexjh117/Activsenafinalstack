// src/pages/SubirAprendices.tsx
import React, { useState } from "react";
import axios from "axios";
import "./styles/subirAprendices.css";

export default function SubirAprendices() {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [jornada, setJornada] = useState<string>("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"exito" | "error" | "">("");
  const [loading, setLoading] = useState(false);
  const [reporte, setReporte] = useState<any | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  // Cambia esto si en tu backend multer usa otro nombre, p.e. 'file' o 'excel'
  const FIELD_NAME = "archivo";

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setArchivo(e.target.files[0]);
  };

  const subirArchivo = async () => {
    if (!archivo) {
      setTipoMensaje("error");
      setMensaje("❌ Debes seleccionar un archivo primero.");
      return;
    }

    setLoading(true);
    setMensaje("");
    setTipoMensaje("");
    setReporte(null);
    setProgress(null);

    try {

const formData = new FormData();
formData.append(FIELD_NAME, archivo);
if (jornada) formData.append("jornada", jornada);
      const res = await axios.post(
        'http://localhost:3002/api/aprendices/subir-excel',
        formData,
        {
          // NO establecer Content-Type manualmente: axios + browser pondrán el boundary correcto
          onUploadProgress: (evt) => {
            if (evt.total) {
              const p = Math.round((evt.loaded * 100) / evt.total);
              setProgress(p);
            }
          },
          // withCredentials: true // habilita si usas cookies/sesiones
        }
      );

      // Mostrar mensaje y, si viene, el reporte con detalles
      const data = res.data ?? {};
      console.log("Respuesta completa del servidor:", data);
      setTipoMensaje("exito");
      setMensaje(data.mensaje || data.message || "✅ Archivo subido con éxito.");
      if (data.reporte) {
        setReporte(data.reporte);
        // imprimir tabla en consola para inspección rápida
        if (Array.isArray(data.reporte.processed)) {
          console.table(data.reporte.processed);
        }
      }
    } catch (err: any) {
      console.error("Error al subir archivo:", err);
      const errMsg =
        err?.response?.data?.mensaje ||
        err?.response?.data?.message ||
        err?.message ||
        "❌ Error al subir el archivo.";
      setTipoMensaje("error");
      setMensaje(errMsg);

      // si el backend devuelve un "reporte" parcial en error, muéstralo
      if (err?.response?.data?.reporte) {
        setReporte(err.response.data.reporte);
        if (Array.isArray(err.response.data.reporte.processed)) {
          console.table(err.response.data.reporte.processed);
        }
      }
    } finally {
      setLoading(false);
      setProgress(null);
    }
  };

  return (
    <div className="contenedor-subida">
      <h2>Subir aprendices desde Excel</h2>

      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleArchivo} />

      <input
        type="text"
        placeholder="Jornada (Ej: Mañana, Tarde, Noche)"
        value={jornada}
        onChange={(e) => setJornada(e.target.value)}
      />

      <button onClick={subirArchivo} disabled={loading}>
        {loading ? "Subiendo..." : "Subir archivo"}
      </button>

      {progress !== null && <p>Progreso: {progress}%</p>}

      {mensaje && (
        <p className={tipoMensaje === "exito" ? "mensaje-exito" : "mensaje-error"}>
          {mensaje}
        </p>
      )}

      {reporte && (
        <div className="reporte">
          <h3>Reporte de importación</h3>
          <p>Total filas: {reporte.total}</p>
          <p>Insertados: {reporte.inserted}</p>
          <p>Saltados (existentes): {reporte.skippedExisting}</p>
          {/* Si tu backend devuelve skippedMissing lo mostramos */}
          {typeof reporte.skippedMissing !== "undefined" && (
            <p>Saltados (faltó correo/ID): {reporte.skippedMissing}</p>
          )}
          <p>Errores: {reporte.errors?.length ?? 0}</p>

          {reporte.errors && reporte.errors.length > 0 && (
            <>
              <h4>Errores (primeras 10)</h4>
              <ul>
                {reporte.errors.slice(0, 10).map((e: any, idx: number) => (
                  <li key={idx}>
                    Fila {e.row}: {e.reason}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Detalle por fila */}
          {reporte.processed && Array.isArray(reporte.processed) && (
            <>
              <h4>Detalle por fila (primeras 50)</h4>
              <div style={{ overflowX: "auto" }}>
                <table className="tabla-reporte">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Identificacion</th>
                      <th>Correo</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Status</th>
                      <th>Motivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reporte.processed.slice(0, 50).map((r: any, i: number) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{r.IdentificacionUsuario}</td>
                        <td>{r.Correo}</td>
                        <td>{r.Nombre}</td>
                        <td>{r.Apellido}</td>
                        <td>{r.status}</td>
                        <td>{r.motivo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
