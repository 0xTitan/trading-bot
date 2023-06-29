import type { CheckpointWriter } from '@snapshot-labs/checkpoint'
import {
  convertToDecimal,
  getEvent,
  loadPair,
  Pair,
  updatePair,
  synced,
  createPair
} from './utils/utils';

export async function handleSync({ block, tx, rawEvent, mysql }: Parameters<CheckpointWriter>[0]) {
  if (!rawEvent) {
    return;
  }

  const format = 'reserve0, low, reserve1, low';
  const data: any = getEvent(rawEvent.data, format);

  console.log("*****************");
  console.log("***" + block!.block_number + "*********");
  console.log("*****************");
  // Load or create the pair
  const pairId = process.env.PAIR!;
  let pair: Pair | null = await loadPair(block!.block_number, mysql);
  if (!pair) {
    pair = {
      id: block!.block_number,
      contract: pairId,
      reserve0: 0,
      reserve1: 0,
      price: 0,
      timestamp: block!.timestamp,
      synced: block!.block_number,
      tx: tx.transaction_hash!
    };
    //console.log('create pair');
    //await createPair(pair, mysql);
  }

  // Update reserves and calculate the price
  pair.reserve0 = convertToDecimal(data.reserve0, 18);
  pair.reserve1 = convertToDecimal(data.reserve1, 6);
  if (pair.reserve0 !== 0 && pair.reserve1 !== 0) {
    pair.price = pair.reserve1 / pair.reserve0;
    console.log("price:", pair.price);
  }

  // Take profit or stop loss
  if (pair.price >= parseInt(process.env.TARGET!) && (await synced(block))) {
    console.log('Alert! Pair price just reached take profit target!');
    // Insert your swap method here
  } else if (pair.price <= parseInt(process.env.TARGET!) && (await synced(block))) {
    console.log('Alert! Pair price just reached stop loss target!');
    // Insert your swap method here
  }

  console.log('Update pair');
  // Update the pair and save it in the database
  pair.timestamp = block!.timestamp;
  pair.synced = block!.block_number;
  pair.tx = tx.transaction_hash!;
  await createPair(pair, mysql)
  //await updatePair(pair, mysql);

}
