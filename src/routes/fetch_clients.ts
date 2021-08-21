import express from 'express';
import { Client } from '../entities/Client.entity';
import { createQueryBuilder } from 'typeorm';

const router = express.Router();

router.get('/api/clients', async (req, res) => {
  const client = await createQueryBuilder('clients')
    .select('clients.first_name')
    .from(Client, 'clients')
    .leftJoinAndSelect(
      'clients.transactions',
      'transactions'
    )
    .where('clients.id = :clientId', { clientId: 4 })
    .getOne();

  return res.json(client);
})

export { router as fetchClientsRouter };
