import type { Request, Response } from 'express';
import { Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { GOOGLE_APPLICATION_CREDENTIALS, PROJECT_ID } from '../../config';
import type { Pokemon } from './types';

const db = new Firestore({
  keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
  projectId: PROJECT_ID,
});

admin.initializeApp({
  projectId: PROJECT_ID,
});

async function getPokemons(req: Request, res: Response) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    // res.set('Access-Control-Allow-Headers', 'Authorization');
    return res.status(204).send('');
  }

  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'bad request' });
  }

  // if (!req.headers.authorization) {
  //   return res.status(401).json({ error: 'bad request' });
  // }

  // const authToken = req.headers.authorization?.split('Bearer ')[1];
  const TOTAL_POKEMONS = 151;
  const LIMIT = 20;
  const offset = Number(req.query.offset) || 0;
  const pokemonsRef = db
    .collection('pokemons')
    .orderBy('id', 'asc')
    .limit(LIMIT)
    .startAfter(offset);

  try {
    const pokemons: Pokemon[] = [];
    const pokemonsDbSnapshort = await pokemonsRef.get();

    pokemonsDbSnapshort.forEach((pokemon) => {
      const { id, image_url, name, types } = pokemon.data();
      pokemons.push({ id, image_url, name, types });
    });

    return res.json({
      hasMore: offset + LIMIT < TOTAL_POKEMONS,
      count: pokemons.length,
      data: pokemons,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
}

export default getPokemons;
