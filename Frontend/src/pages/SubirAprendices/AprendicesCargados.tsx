// src/pages/AprendicesCargados.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/aprendicesCargados.css";

export default function AprendicesCargados() {
  type AprendizConUsuario = {
    id?: string | number;
    __key?: string; // key estable para React
    usuario: {
      Nombre?: string;
      Apellido?: string;
      Correo?: string;
      Telefono?: string;
    };
    Ficha?: string;
    ProgramaFormacion?: string;
    Jornada?: string;
  };

  const [aprendices, setAprendices] = useState<AprendizConUsuario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  let mounted = true;
  const controller = new AbortController();

    const fetchAprendices = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("https://render-hhyo.onrender.com/api/aprendices/listar", {
          signal: controller.signal,
        });

      const data: AprendizConUsuario[] = Array.isArray(res.data)
  ? res.data
  : res.data?.aprendices ?? [];

        // Generar key estable para cada aprendiz
        const dataWithKeys = data.map((item, idx) => {
          const stableKey =
            item.id ??
            item.usuario?.Correo ??
            (typeof crypto !== "undefined" && "randomUUID" in crypto
              ? (crypto as any).randomUUID()
              : `no-id-${idx}`);
          return { ...item, __key: String(stableKey) };
        });

        if (mounted) setAprendices(dataWithKeys);
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log("Petición cancelada");
        } else {
          console.error("Error al obtener aprendices:", err);
          const msg =
            err?.response?.data?.mensaje ||
            err?.response?.data?.message ||
            err?.message ||
            "Error al cargar aprendices";
          if (mounted) setError(msg);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAprendices();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="contenedor-aprendices">
      <h2>📋 Aprendices Registrados</h2>

      {loading && <p>Cargando aprendices...</p>}
      {error && <p className="mensaje-error">❌ {error}</p>}

      {!loading && !error && aprendices.length === 0 && (
        <p>No hay aprendices registrados todavía.</p>
      )}

      {aprendices.length > 0 && (
        <table className="tabla-aprendices">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Ficha</th>
              <th>Programa</th>
              <th>Jornada</th>
            </tr>
          </thead>
        <tbody>
  {aprendices.map((a, i) => (
    <tr key={`${a.__key || a.usuario?.Correo}-${i}`}>
      <td>{i + 1}</td>
      <td>
        {a.usuario?.Nombre ?? "-"} {a.usuario?.Apellido ?? ""}
      </td>
      <td>{a.usuario?.Correo ?? "-"}</td>
      <td>{a.usuario?.Telefono ?? "-"}</td>
      <td>{a.Ficha ?? "-"}</td>
      <td>{a.ProgramaFormacion ?? "-"}</td>
      <td>{a.Jornada ?? "-"}</td>
    </tr>
  ))}
</tbody>


        </table>
      )}
    </div>
  );
}
