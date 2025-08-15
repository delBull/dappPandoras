// tools/check-env.ts
import { config } from "dotenv";
import { existsSync, readFileSync } from "fs";
import path from "path";

type EnvFile = Record<string, string>;

const REQUIRED_ENV_VARS = [
  "SETTLEMINT_HASURA_ENDPOINT",
  "SETTLEMINT_HASURA_ADMIN_SECRET",
  "SETTLEMINT_HASURA_DATABASE_URL",
  "SETTLEMINT_MINIO_ACCESS_KEY",
  "SETTLEMINT_MINIO_SECRET_KEY",
  "SETTLEMINT_MINIO_ENDPOINT",
  "SETTLEMINT_THEGRAPH_SUBGRAPHS_ENDPOINTS",
  "SETTLEMINT_BLOCKCHAIN_NODE_JSON_RPC_ENDPOINT",
  "SETTLEMINT_PORTAL_GRAPHQL_ENDPOINT",
  "VITE_HASURA_GRAPHQL_ENDPOINT",
  "VITE_HASURA_GRAPHQL_ADMIN_SECRET",
  "VITE_SUBGRAPH_URL"
];

function parseEnvFile(filePath: string): EnvFile {
  if (!existsSync(filePath)) return {};
  const content = readFileSync(filePath, "utf-8");
  return Object.fromEntries(
    content
      .split("\n")
      .filter((line) => line.trim() && !line.trim().startsWith("#"))
      .map((line) => {
        const [key, ...value] = line.split("=");
        return [key.trim(), value.join("=").trim()];
      })
  );
}

function checkEnvVariables(env: EnvFile, name: string) {
  console.log(`🔍 Verificando variables en ${name}...`);
  let ok = true;
  for (const key of REQUIRED_ENV_VARS) {
    if (!env[key]) {
      console.error(`❌ FALTA ${key} en ${name}`);
      ok = false;
    } else {
      console.log(`✅ ${key}`);
    }
  }
  return ok;
}

const envPath = path.resolve(".env");
const envLocalPath = path.resolve(".env.local");

const envMain = parseEnvFile(envPath);
const envLocal = parseEnvFile(envLocalPath);

const validMain = checkEnvVariables(envMain, ".env");
const validLocal = checkEnvVariables(envLocal, ".env.local");

if (!validMain || !validLocal) {
  console.error("🛑 Faltan variables. Revisa arriba y corrige.");
  process.exit(1);
} else {
  console.log("🎉 Todas las variables están definidas correctamente.");
}
