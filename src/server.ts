#!/usr/bin/env node
import app from "./app";
import debug from "debug";
import http from "http";
import { initializeDatabase, closeDatabase } from "./config/database";

const serverDebug = debug("server:server");
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
const server = http.createServer(app);

async function startServer(): Promise<void> {
  try {
    await initializeDatabase();
    // Use .on with non-async handlers
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);

    // Handle graceful shutdown with wrapped handlers
    // FIX: Use non-async handler that calls the async function
    const handleShutdown = (): void => {
      void gracefulShutdown();
    };

    process.on("SIGTERM", handleShutdown);
    process.on("SIGINT", handleShutdown);
  } catch (error) {
    serverDebug("Failed to start server:", error);
    process.exit(1);
  }
}

async function gracefulShutdown(): Promise<void> {
  serverDebug("Received shutdown signal. Closing server...");

  const closeServerPromise = new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  try {
    await closeServerPromise;
    serverDebug("Server closed. Closing database connection...");
    await closeDatabase();
    serverDebug("Clean shutdown completed.");
    process.exit(0);
  } catch (error) {
    serverDebug("Error during shutdown:", error);
    process.exit(1);
  }

  // Force shutdown after 10 seconds
  setTimeout((): void => {
    serverDebug(
      "Could not close connections in time, forcefully shutting down",
    );
    process.exit(1);
  }, 10000);
}

function normalizePort(val: string): number | string {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return 0;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      serverDebug(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      serverDebug(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind =
    typeof addr === "string" ? "pipe " + addr : "port " + (addr?.port || "");
  serverDebug("Listening on " + bind);
}

// FIX: Added explicit return type to the catch handler
void startServer().catch((error: unknown): void => {
  serverDebug("Failed to start application:", error);
  process.exit(1);
});
