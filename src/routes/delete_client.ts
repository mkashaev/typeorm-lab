import express from 'express';
import { Client } from '../entities/Client.entity';

const router = express.Router();

router.delete('/api/client/:clientId', async (req, res) => {
  const { clientId } = req.params;

  const resp = await Client.delete(parseInt(clientId));

  return res.json(resp);
})

export { router as deleteClientRouter };