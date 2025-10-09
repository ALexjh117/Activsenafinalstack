import type { Request, Response } from "express";
import { Actividad } from "../models/Actividad";
import { Evento } from "../models/Evento";
import * as QRCode from "qrcode";
import { enviarNotificacion } from "../services/notificacionesService";
import { Usuario } from "../models/Usuario";
import { Op } from "sequelize";

import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

export class ActividadControllers {
  static getActividadAll = async (req: Request, res: Response) => {
    try {
      const actividades = await Actividad.findAll({
        order: [["createdAt", "ASC"]],
        include: [Evento],
      });

      res.json(
        actividades.map((a) => ({
          ...a.dataValues,
          ImagenUrl: a.Imagen || null, // ✅ usamos Imagen del modelo
        }))
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getIdActividad = async (req: Request, res: Response) => {
    try {
      const { IdActividad } = req.params;
      const actividad = await Actividad.findByPk(IdActividad, {
        include: [Evento],
      });

      if (!actividad) {
        res.status(404).json({ error: "Actividad no encontrada" });
        return;
      }

      res.json({
        ...actividad.dataValues,
        ImagenUrl: actividad.Imagen || null, // ✅ corregido
      });
    } catch (error) {
      res.status(500).json({ error: "hubo un error" });
    }
  };

  static crearActividad = async (req: Request, res: Response) => {
    try {
      console.log("💡 Middleware alcanzado");
      const body = JSON.parse(JSON.stringify(req.body));

      const {
        NombreActi,
        Descripcion,
        FechaInicio,
        FechaFin,
        HoraInicio,
        HoraFin,
        TipoLudica,
        IdEvento,
        Ubicacion,
      } = body;

      // 🚨 Subida de imagen a Cloudinary
      let result: any = null;
      if (req.file) {
        const file = req.file as Express.Multer.File; // ✅ type assertion
        result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "actividades" },
            (error, uploadResult) => {
              if (error) reject(error);
              else resolve(uploadResult);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
      }

      // Validar campos requeridos
      const isEmpty = (val: any) => {
        if (typeof val === "string") return val.trim() === "";
        return val === undefined || val === null;
      };

      if (
        isEmpty(NombreActi) ||
        isEmpty(FechaInicio) ||
        isEmpty(FechaFin) ||
        isEmpty(HoraInicio) ||
        isEmpty(HoraFin) ||
        isEmpty(Ubicacion)
      ) {
        res.status(400).json({ error: "⚠️ Faltan campos requeridos" });
        return;
      }

      if (!req.file) {
        res.status(400).json({ error: "⚠️ Debes subir una imagen" });
        return;
      }

      // Crear actividad
      const nuevaActividad = await Actividad.create({
        NombreActi,
        Descripcion: Descripcion || null,
        FechaInicio,
        FechaFin,
        HoraInicio,
        HoraFin,
        TipoLudica,
        IdEvento: IdEvento ? parseInt(IdEvento) : null,
        Ubicacion,
        Imagen: result?.secure_url || null, // ✅ guardamos como Imagen
        IdUsuario: parseInt(body.IdUsuario),
      });

      const evento = IdEvento
        ? await Evento.findByPk(parseInt(IdEvento))
        : null;

      // Generar QR
      const payloadEntrada = {
        IdActividad: nuevaActividad.IdActividad,
        tipo: "entrada",
        nombreActividad: nuevaActividad.NombreActi,
        nombreEvento: evento?.NombreEvento || "Evento sin nombre",
      };
      const payloadSalida = {
        IdActividad: nuevaActividad.IdActividad,
        tipo: "salida",
        nombreActividad: nuevaActividad.NombreActi,
        nombreEvento: evento?.NombreEvento || "Evento sin nombre",
      };

      const qrEntrada = await QRCode.toDataURL(JSON.stringify(payloadEntrada));
      const qrSalida = await QRCode.toDataURL(JSON.stringify(payloadSalida));

      nuevaActividad.CodigoQR = qrEntrada;
      nuevaActividad.CodigoQRSalida = qrSalida;
      await nuevaActividad.save();

      // Notificar aprendices
      const aprendices = await Usuario.findAll({ where: { IdRol: 2 } });
      const idsAprendices = aprendices.map((u) => u.IdUsuario);

      await enviarNotificacion({
        titulo: "Nueva actividad disponible",
        mensaje: `Participa en la actividad "${nuevaActividad.NombreActi}" del evento "${
          evento?.NombreEvento || "Sin evento"
        }".`,
        tipo: TipoLudica ? "Lúdica" : "Actividad",
        idUsuarios: idsAprendices,
        idEvento: nuevaActividad.IdEvento ?? null,
      });

      res.status(201).json({
        message: "✅ Actividad creada exitosamente con QRs",
        actividad: {
          ...nuevaActividad.dataValues,
          ImagenUrl: result?.secure_url || null, // ✅ devolvemos ImagenUrl
        },
      });
    } catch (error) {
      console.error("❌ Error al crear actividad:", error);
      res.status(500).json({
        error: "Hubo un error en el servidor",
        message: (error as Error).message,
      });
    }
  };

  static actualizarIdActividad = async (req: Request, res: Response) => {
    try {
      const { IdActividad } = req.params;
      const actividad = await Actividad.findByPk(IdActividad);
      if (!actividad) {
        res.status(404).json({ error: "Actividad no encontrada" });
        return;
      }

      let result: any = null;
      if (req.file) {
        const file = req.file as Express.Multer.File;
        result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "actividades" },
            (error, uploadResult) => {
              if (error) reject(error);
              else resolve(uploadResult);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
      }

      await actividad.update({
        ...req.body,
        Imagen: result?.secure_url || actividad.Imagen,
      });

      res.json({
        ...actividad.dataValues,
        ImagenUrl: actividad.Imagen || null, // ✅ devolvemos ImagenUrl
      });
    } catch (error) {
      res.status(500).json({ error: "hubo un error" });
    }
  };

  static getActividadesPorEvento = async (req: Request, res: Response) => {
    try {
      const { IdEvento } = req.params;
      const actividades = await Actividad.findAll({ where: { IdEvento } });

      res.json(
        actividades.map((a) => ({
          ...a.dataValues,
          ImagenUrl: a.Imagen || null, // ✅ corregido
        }))
      );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error al obtener actividades por evento" });
    }
  };

  static eliminarIdActividad = async (req: Request, res: Response) => {
    try {
      const { IdActividad } = req.params;
      const actividad = await Actividad.findByPk(IdActividad);
      if (!actividad) {
        res.status(404).json({ error: "Actividad no encontrada" });
        return;
      }
      await actividad.destroy();
      res.json({ message: "Actividad eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "hubo un error" });
    }
  };

  static getNoticias = async (req: Request, res: Response) => {
    try {
      const noticias = await Actividad.findAll({
        where: {
          TipoLudica: { [Op.like]: "%Noticia%" },
        },
        order: [["createdAt", "DESC"]],
        include: [Evento, Usuario],
      });

      res.json(
        noticias.map((n) => ({
          ...n.dataValues,
          ImagenUrl: n.Imagen || null, // ✅ corregido
        }))
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener noticias" });
    }
  };
}
