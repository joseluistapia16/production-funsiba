import { createPool, Pool } from "mysql2/promise";

export async function connect(): Promise<Pool> {
  const connection = await createPool({
    host: "bgzqyzz5g5aktydlzuez-mysql.services.clever-cloud.com",
    user: "uvwtydrb2icr6dgz",
    database: "bgzqyzz5g5aktydlzuez",
    connectionLimit: 10,
    password: "SzBC7E0yuJfDb8S5h1fS",
  });
  return connection;
}
