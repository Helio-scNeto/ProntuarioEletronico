import csv from 'csv-parser' 
import fs from 'fs'

const readbleStream = fs.createReadStream('Estados.csv')

const transformStreamToObj = csv({separator: ';'})


const transformStreamToString = new Transform({})



