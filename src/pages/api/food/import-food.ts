import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const filePath = path.join(process.cwd(), 'public', 'FOOD-DATA-GROUP1.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    for (const record of records) {
      await prisma.food.create({
        data: {
          foodName: record['food'],
          caloricvalue: parseFloat(record['Caloric Value']),
          fat: parseFloat(record['Fat']),
          saturatedfats: parseFloat(record['Saturated Fats']),
          monounsaturatedfats: parseFloat(record['Monounsaturated Fats']),
          polyunsaturatedfats: parseFloat(record['Polyunsaturated Fats']),
          carbohydrates: parseFloat(record['Carbohydrates']),
          sugars: parseFloat(record['Sugars']),
          protein: parseFloat(record['Protein']),
          dietaryfiber: parseFloat(record['Dietary Fiber']),
          cholesterol: parseFloat(record['Cholesterol']),
          sodium: parseFloat(record['Sodium']),
          water: parseFloat(record['Water']),
          vitamina: parseFloat(record['Vitamin A']),
          vitaminb1: parseFloat(record['Vitamin B1']),
          vitaminb11: parseFloat(record['Vitamin B11']),
          vitaminb12: parseFloat(record['Vitamin B12']),
          vitaminb2: parseFloat(record['Vitamin B2']),
          vitaminb3: parseFloat(record['Vitamin B3']),
          vitaminb5: parseFloat(record['Vitamin B5']),
          vitaminb6: parseFloat(record['Vitamin B6']),
          vitaminc: parseFloat(record['Vitamin C']),
          vitamind: parseFloat(record['Vitamin D']),
          vitamine: parseFloat(record['Vitamin E']),
          vitamink: parseFloat(record['Vitamin K']),
          calcium: parseFloat(record['Calcium']),
          copper: parseFloat(record['Copper']),
          iron: parseFloat(record['Iron']),
          magnesium: parseFloat(record['Magnesium']),
          manganese: parseFloat(record['Manganese']),
          phosphorus: parseFloat(record['Phosphorus']),
          potassium: parseFloat(record['Potassium']),
          selenium: parseFloat(record['Selenium']),
          zinc: parseFloat(record['Zinc']),
          nutritiondensity: parseFloat(record['Nutrition Density']),
        }
      });
    }

    res.status(200).json({ message: 'Import completed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to import data.' });
  }
}
