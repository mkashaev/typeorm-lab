import express from 'express';
import { Client } from '../entities/Client.entity';
import { Transaction, TransactionTypes } from '../entities/Transaction.entity';

const router = express.Router();

router.post('/api/client/:clientId/transaction', async (req, res) => {
  const { clientId } = req.params;

  const { type, amount } = req.body;

  console.log({ amount, type });

  const client = await Client.findOne(parseInt(clientId));

  if (!client) { 
    return res.json({
      message: 'Client not found'
    })
  }

  const transaction = Transaction.create({
    amount,
    type,
    client
  })

  console.log({ transaction });

  await transaction.save()

  if (type === TransactionTypes.DEPOSIT) {
    client.balance = client.balance + amount;
  } else if (type === TransactionTypes.WITHDRAW) {
    client.balance = client.balance - amount;
  }

  await client.save();

  return res.json({
    message: 'Success'
  });
})

export { router as createTransactionRouter };