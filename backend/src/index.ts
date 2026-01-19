import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import productsRouter from "./routes/products";
import { createDb, type Database } from "./db";

type Bindings = {
  DATABASE_URL: string;
};

type Variables = {
  db: Database;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("*", async (c, next) => {
  const db = createDb(c.env.DATABASE_URL);
  c.set("db", db);
  await next();
});

app.get("/", (c) => {
  return c.json({
    message: "Products CRUD API - Cloudflare Edition 🚀",
    stack: "Bun + Hono + Drizzle + Neon + Workers",
  });
});

app.route("/api/products", productsRouter);

app.notFound((c) => c.json({ error: "Ruta no encontrada" }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Error interno del servidor" }, 500);
});

export default app;
