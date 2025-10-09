import { Router } from 'express';
import { ElementoController } from '../controllers/ElementoController';
// 👇 Usa tu middleware de memoria
import { upload } from '../middleware/uploadConfig';

const router = Router();

router.post('/', upload.single('imagen'), ElementoController.crearElemento);
router.get('/', ElementoController.getCatalogo);
router.delete('/:IdElemento', ElementoController.eliminarElemento);
router.get("/qrcode/:id", ElementoController.getQRCode);
export default router;
