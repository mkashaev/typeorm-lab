import express from 'express';
import { Client } from '../entities/Client.entity';
import { Banker } from '../entities/Banker.entity';

const router = express.Router();

router.put('/api/banker/:bankerId/client/:clientId', async (req, res) => {
  const { bankerId, clientId } = req.params;

  const client = await Client.findOne(parseInt(clientId));
  const banker = await Banker.findOne(parseInt(bankerId));

  if (!client || !banker) {
    return res.json({
      message: 'Client or banker not found'
    })
  }

  banker.clients = [client];

  await banker.save();

  return res.json({
    message: 'Success',
  })
})

export { router as connectBankerToClientRouter };