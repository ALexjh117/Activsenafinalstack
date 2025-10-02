import React, { useEffect, useState } from "react";
import axios from "axios";
import AsistentesEvento from "../../Asistencia/Instructor/AsistentesEventos"; 
import Swal from 'sweetalert2';

import "../styles/MisEventos.css"
import { MdEvent, MdAccessTime, MdLocationOn, MdGroups, MdBarChart } from "react-icons/md";
import { FaDoorOpen, FaDoorClosed, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

interface EventoConDatos {
  IdEvento: number;
  NombreEvento: string;
  FechaInicio: string;
  FechaFin: string;
  HoraInicio: string;
  HoraFin: string;
  UbicacionEvento: string;
  DescripcionEvento: string;
  QREntrada?: string;
  QRSalida?: string;
}

interface AsistenciaItem {
  QREntrada?: string;
  QRSalida?: string;
  IdUsuario?: number;

  usuario?: {
    Nombre?: string;
    Apellido?: string;
    Correo?: string;
    perfilAprendiz?: {
      Ficha?: string;
      ProgramaFormacion?: string;
      Jornada?: string;
    };
  };
  Usuario?: {
    IdUsuario?: number;
    Nombre?: string;
    Apellido?: string;
    Correo?: string;
  };
}

export default function MisEventos() {
  const [asistencias, setAsistencias] = useState<Record<number, AsistenciaItem[]>>({});
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [eventos, setEventos] = useState<EventoConDatos[]>([]);
  const [mostrarAsistentes, setMostrarAsistentes] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUsuarioId(decoded.IdUsuario);

      axios
        .get("https://render-hhyo.onrender.com/api/evento/evento/mis-eventos", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setEventos(res.data))
        .catch((err) => console.error("❌ Error cargando eventos:", err));
    }
  }, []);

  const obtenerAsistencias = async (IdEvento: number): Promise<AsistenciaItem[]> => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://render-hhyo.onrender.com/api/asistencia/evento/${IdEvento}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAsistencias((prev) => ({ ...prev, [IdEvento]: res.data }));
      return res.data;
    } catch (err) {
      console.error("❌ Error obteniendo asistencia:", err);
      return [];
    }
  };

  const compararYNotificar = async (IdEvento: number) => {
    const token = localStorage.getItem("token");
    const response = await axios.get<AsistenciaItem[]>(`https://render-hhyo.onrender.com/api/relusuarioevento/asistentes/${IdEvento}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const confirmados: AsistenciaItem[] = response.data;

    const asistenciaReal = await obtenerAsistencias(IdEvento);

    // Correos confirmados
    const correosConfirmados = confirmados
      .filter((a) => a.Usuario?.Correo)
      .map((a) => a.Usuario!.Correo!.toLowerCase());

    const correosAsistieron = asistenciaReal
      .filter((a) => a.usuario?.Correo)
      .map((a) => a.usuario!.Correo!.toLowerCase());

    // Confirmaron y asistieron
    const confirmaronYAsistieron = correosConfirmados.filter((correo) =>
      correosAsistieron.includes(correo)
    );

    // Confirmaron pero NO asistieron
    const confirmaronPeroNoAsistieron = correosConfirmados.filter(
      (correo) => !correosAsistieron.includes(correo)
    );

    // NO confirmaron pero SÍ asistieron
    const noConfirmaronPeroAsistieron = correosAsistieron.filter(
      (correo) => !correosConfirmados.includes(correo)
    );

    const total =
      confirmaronYAsistieron.length +
      confirmaronPeroNoAsistieron.length +
      noConfirmaronPeroAsistieron.length;

    if (total === 0) {
      Swal.fire("⚠️", "No hay datos para comparar.", "info");
      return;
    }

    const resultado = await Swal.fire({
      title: "¿Deseas notificar a los aprendices?",
      html: `
        <p><strong>${confirmaronYAsistieron.length}</strong> confirmo y asistio ✅</p>
        <p><strong>${confirmaronPeroNoAsistieron.length}</strong> confirmaron pero NO asistieron ❌</p>
        <p><strong>${noConfirmaronPeroAsistieron.length}</strong> NO confirmaron pero sí asistieron ⚠️</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, notificar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      try {
        if (!usuarioId) throw new Error("Usuario no identificado");
        const hoy = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

      const idsConfirmaronYAsistieron = confirmados
  .filter(a => confirmaronYAsistieron.includes(a.Usuario?.Correo?.toLowerCase() ?? ""))
  .map(a => a.IdUsuario ?? a.Usuario?.IdUsuario)
  .filter(Boolean);

const idsConfirmaronPeroNoAsistieron = confirmados
  .filter(a => confirmaronPeroNoAsistieron.includes(a.Usuario?.Correo?.toLowerCase() ?? ""))
  .map(a => a.IdUsuario ?? a.Usuario?.IdUsuario)
  .filter(Boolean);

const idsNoConfirmaronPeroAsistieron = asistenciaReal
  .filter(a => noConfirmaronPeroAsistieron.includes(a.usuario?.Correo?.toLowerCase() ?? ""))
  .map(a => a.IdUsuario ?? a.Usuario?.IdUsuario) // <-- aquí cambia `a.Usuario?.IdUsuario` (mayúscula)
  .filter(Boolean);


const payloadConfirmadosYAsistieron = {
  Titulo: "Asistencia confirmada",
  Mensaje: "Gracias por asistir al evento. Valoramos tu compromiso y participación. 🌟",
  TipoNotificacion: "Evento",
  FechaDeEnvio: hoy,
  IdEvento: IdEvento,
  idUsuarios: idsConfirmaronYAsistieron,
  RutaDestino: null,
  imagenUrl: null,
};

console.log("Payload para confirmaron y asistieron:", payloadConfirmadosYAsistieron);
console.log("Payload para confirmaron y asistieron:", {
  Titulo: "Asistencia confirmada",
  Mensaje: "Gracias por asistir al evento. Valoramos tu compromiso y participación. 🌟",
  TipoNotificacion: "Evento",
  FechaDeEnvio: hoy,
  IdEvento: IdEvento,
  idUsuarios: idsConfirmaronYAsistieron,
  RutaDestino: null,
  imagenUrl: null,
});
console.log('idsConfirmaronPeroNoAsistieron:', idsConfirmaronPeroNoAsistieron);
console.log('idsNoConfirmaronPeroAsistieron:', idsNoConfirmaronPeroAsistieron);

await axios.post("https://render-hhyo.onrender.com/api/notificaciones", payloadConfirmadosYAsistieron);

        // Envío de notificaciones
        if (idsConfirmaronYAsistieron.length > 0) {
        await axios.post("https://render-hhyo.onrender.com/api/notificaciones", {
          Titulo: "Asistencia confirmada",
          Mensaje: "Gracias por asistir al evento. Valoramos tu compromiso y participación. 🌟",
          TipoNotificacion: "Evento",
          FechaDeEnvio: hoy,
          IdEvento: IdEvento,
          idUsuarios: idsConfirmaronYAsistieron,
          RutaDestino: null,
          imagenUrl: null,
        });
      }
if (idsConfirmaronPeroNoAsistieron.length > 0) {
        await axios.post("https://render-hhyo.onrender.com/api/notificaciones", {
          Titulo: "Asistencia no realizada",
          Mensaje: "Confirmaste tu asistencia, pero no te presentaste. Esto afecta tu participación y compromiso. ⚠️",
          TipoNotificacion: "Evento",
          FechaDeEnvio: hoy,
          IdEvento: IdEvento,
          idUsuarios: idsConfirmaronPeroNoAsistieron,
          RutaDestino: null,
          imagenUrl: null,
        });}
if (idsNoConfirmaronPeroAsistieron.length > 0) {
        await axios.post("https://render-hhyo.onrender.com/api/notificaciones", {
          Titulo: "Asistencia inesperada",
          Mensaje: "Gracias por asistir al evento. Sin embargo, no habías confirmado tu asistencia. Por favor recuerda hacerlo para próximos eventos. 📌",
          TipoNotificacion: "Evento",
          FechaDeEnvio: hoy,
          IdEvento: IdEvento,
          idUsuarios: idsNoConfirmaronPeroAsistieron,
          RutaDestino: null,
          imagenUrl: null,
        });
      }
        Swal.fire("✅ Notificaciones enviadas", "", "success");
      } catch (error: any) {
  console.error("❌ Error al enviar notificaciones:", error.response?.data || error.message || error);
  Swal.fire("Error", "No se pudieron enviar las notificaciones", "error");
}
    }
  };

  return (
    <div className="mis-actividades-contenedor">
      <h2>Mis Eventos Creados</h2>
      <p className="descripcion-registros">
  Aquí puedes ver tus eventos creados, revisar los registros de asistencia y enviar notificaciones o reportes a los participantes.
</p>


      {eventos.length === 0 && <p>No has creado eventos aún.</p>}

      {eventos.map((evento) => (
        <div key={evento.IdEvento} className="evento-wrapper">
          <div className="actividad-card">
            <h3>{evento.NombreEvento}</h3>
      <p>
  <MdEvent className="icon-sm" /> {evento.FechaInicio} &nbsp; | &nbsp;
  <MdAccessTime className="icon-sm" /> {evento.HoraInicio} - {evento.HoraFin}
</p>
<p><MdLocationOn className="icon-sm" /> {evento.UbicacionEvento}</p>

            <p>📝 {evento.DescripcionEvento}</p>

          {evento.QREntrada && (
  <div className="qr-contenedor">
    <div className="qr-item">
      <img src={evento.QREntrada} alt={`QR de entrada - ${evento.NombreEvento}`} className="qr-imagen" />
      <span className="qr-label"><FaDoorOpen style={{ verticalAlign: 'middle' }} /> Entrada</span>
    </div>
  </div>
)}

{evento.QRSalida && (
  <div className="qr-contenedor">
    <div className="qr-item">
      <img src={evento.QRSalida} alt={`QR de salida - ${evento.NombreEvento}`} className="qr-imagen" />
      <span className="qr-label"><FaDoorClosed style={{ verticalAlign: 'middle' }} /> Salida</span>
    </div>
  </div>
)}

<button
  type="button"
  className="btn-ver-asistencia"
  onClick={() => obtenerAsistencias(evento.IdEvento)}
  aria-label={`Ver asistencia de ${evento.NombreEvento}`}
>
  <MdGroups className="icon-btn" /> Ver asistencia
</button>

<button
  type="button"
  className="btn-ver-asistentes-confirmados"
  onClick={() =>
    setMostrarAsistentes((prev) => ({ ...prev, [evento.IdEvento]: !prev[evento.IdEvento] }))
  }
  aria-label={`Ver asistentes confirmados ${evento.NombreEvento}`}
>
  <MdGroups className="icon-btn" /> {mostrarAsistentes[evento.IdEvento] ? "Ocultar" : "Ver"} asistentes confirmados
</button>

<button
  type="button"
  className="btn-comparar"
  onClick={() => compararYNotificar(evento.IdEvento)}
  aria-label={`Comparar asistencia y notificar ${evento.NombreEvento}`}
>
  <MdBarChart className="icon-btn" /> Comparar y notificar
</button>

            {mostrarAsistentes[evento.IdEvento] && (
              <AsistentesEvento idEvento={evento.IdEvento} />
            )}

            {asistencias[evento.IdEvento] && (
              <div className="tabla-asistencia">
                <h4>📊 Asistencia registrada</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Ficha</th>
                      <th>Programa</th>
                      <th>Jornada</th>
                      <th>Hora Entrada</th>
                      <th>Hora Salida</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asistencias[evento.IdEvento].map((asistente, index) => (
                      <tr key={index}>
                        <td>
                          {asistente.usuario?.Nombre} {asistente.usuario?.Apellido}
                        </td>
                        <td>{asistente.usuario?.Correo}</td>
                        <td>{asistente.usuario?.perfilAprendiz?.Ficha || "—"}</td>
                        <td>{asistente.usuario?.perfilAprendiz?.ProgramaFormacion || "—"}</td>
                        <td>{asistente.usuario?.perfilAprendiz?.Jornada || "—"}</td>
                        <td>
                          {asistente.QREntrada
                            ? new Date(asistente.QREntrada).toLocaleTimeString("es-CO")
                            : "—"}
                        </td>
                        <td>
                          {asistente.QRSalida
                            ? new Date(asistente.QRSalida).toLocaleTimeString("es-CO")
                            : "—"}
                        </td>
                       <td>
  {asistente.QREntrada && asistente.QRSalida ? (
    <span className="estado-contenedor estado-completo"><FaCheckCircle className="icon-sm" /> Completa</span>
  ) : asistente.QREntrada ? (
    <span className="estado-contenedor estado-incompleto"><FaDoorOpen className="icon-sm" /> Solo entrada</span>
  ) : (
    <span className="estado-contenedor estado-sin-registro"><FaTimesCircle className="icon-sm" /> Sin registro</span>
  )}
</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
