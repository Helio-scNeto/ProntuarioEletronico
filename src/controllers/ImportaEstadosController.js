import { Readable } from 'stream';

import readline from 'readline';
import { PrismaClient } from '@prisma/client';

export default {
  async importaEstados(req, res) {
    const prisma = new PrismaClient();
    const { file } = req;
    const { buffer } = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const estadosLine = readline.createInterface({
      input: readableFile,
    });

    const estados = [];

    try {
      for await (const line of estadosLine) {
        const estadosLineSplit = line.split(',');
        estados.push({
          codigo_uf: parseInt(estadosLineSplit[0]),
          uf: estadosLineSplit[1],
          nome: estadosLineSplit[2],
          latitude: Number(estadosLineSplit[3]),
          longitude: Number(estadosLineSplit[4]),
          regiao: estadosLineSplit[5],
        });
      }
      estados.shift();
      for await (let {
        codigo_uf,
        uf,
        nome,
        latitude,
        longitude,
        regiao,
      } of estados) {
        await prisma.estado.create({
          data: { codigo_uf, uf, nome, latitude, longitude, regiao },
        });
      }
      return res.json(estados);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
