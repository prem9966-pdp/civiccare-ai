import { app } from "./app";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";

/**
 * Main application entry point.
 * This function bootstraps the DB and then starts the server.
 */
const startServer = async () => {
  try {
    console.log("-----------------------------------------");
    console.log("🏙️  CIVICCARE AI - BACKEND BOOTSTRAP");
    console.log("-----------------------------------------");
    
    // 1. Establish Database Connection (Awaited before starting server)
    await connectDB();
    
    // 2. Start Express Listener with Dynamic Port Fallback
    const HOST = "0.0.0.0"; 
    let PORT = Number(ENV.PORT || 5051);

    const startApp = (currentPort: number) => {
      const server = app.listen(currentPort, HOST, () => {
        console.log(`
      -----------------------------------------
      🚀 SERVER IS RUNNING SUCCESSFULLY!
      -----------------------------------------
      📡 ENV  : ${ENV.NODE_ENV}
      🔗 PORT : ${currentPort}
      🌐 HOST : ${HOST}
      -----------------------------------------
        `);
      });

      server.on("error", (error: any) => {
        if (error.code === "EADDRINUSE") {
          console.error(`\n[!] ERROR: Port ${currentPort} is already in use.`);
          console.error(`[!] Please kill the process on port ${currentPort} and try again.\n`);
          process.exit(1);
        } else {
          console.error("\n[!] UNEXPECTED SERVER ERROR:");
          console.error(`[!] Code: ${error.code}`);
          console.error(`[!] Reason: ${error.message}\n`);
          process.exit(1);
        }
      });
    };

    startApp(PORT);

    // 3. Graceful handle for unhandled rejections
    process.on("unhandledRejection", (err: any) => {
        console.error(`❌ Unhandled Rejection: ${err.message}`);
    });

  } catch (error: any) {
    console.error("\n[!] FATAL ERROR DURING STARTUP:");
    console.error(`[!] Reason: ${error.message}\n`);
    console.log("Exiting process...");
    process.exit(1);
  }
};

startServer();
