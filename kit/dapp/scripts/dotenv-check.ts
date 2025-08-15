import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

function checkEnv(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Archivo no encontrado: ${filePath}`);
    return {};
  }

  const envConfig = dotenv.parse(fs.readFileSync(filePath));
  console.log(`✅ Variables cargadas desde ${filePath}:`);
  Object.entries(envConfig).forEach(([key, value]) => {
    console.log(`- ${key} = ${value}`);
  });

  return envConfig;
}

const root = process.cwd();
const filesToCheck = ['.env', '.env.local'];

filesToCheck.forEach((file) => {
  checkEnv(path.join(root, file));
});
