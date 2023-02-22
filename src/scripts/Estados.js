import csv from 'csv-parser';
import { fs, readFile } from 'fs';
import { Transform, Writable, Readable } from 'stream';
import { Router } from 'express';
import multer from 'multer';
import readline from 'readline';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const multerConfig = multer();

const estadosRouter = Router();

estadosRouter.post(
  '/estados',
  multerConfig.single('file'),
  async (req, res) => {
    const { file } = req;
    const { buffer } = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const estadosLine = readline.createInterface({
      input: readableFile,
    });

    const estados = [];

    for await (let line of estadosLine) {
      const estadosLineSplit = line.split(',');
      estados.push({
        codigo_uf: estadosLineSplit[0],
        uf: estadosLineSplit[1],
        nome: estadosLineSplit[2],
        latitude: Number(estadosLineSplit[3]),
        longitude: Number(estadosLineSplit[4]),
        regiao: estadosLineSplit[5],
      });
    }

    for await (let {
      codigo_uf,
      uf,
      nome,
      latitude,
      longitude,
      regiao,
    } of estados){
        await prisma.estado.create({
          data:{
            codigo_uf,
            uf,
            nome,
            latitude,
            longitude,
            regiao,
          }
        })
    }
      return res.send(estados);
  }
);

export { estadosRouter };
