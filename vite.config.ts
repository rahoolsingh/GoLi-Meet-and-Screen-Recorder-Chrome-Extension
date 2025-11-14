import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import zipPack from "vite-plugin-zip-pack"; // Import the zip plugin

// @ts-ignore: Importing JSON module
import manifestJson from "./public/manifest.json";

export default defineConfig({
    plugins: [
        react(),
        zipPack({
            // Add the zip plugin configuration
            // The plugin zips the contents of `build.outDir` by default
            outDir: "release", // Place the final zip file in the 'release' folder
            outFileName: `GoLi_release-v${manifestJson.version}.zip`, // Corrected property name
        }),
    ],
    build: {
        outDir: `release/GoLi_release-v${manifestJson.version}`, // This remains your build output folder
        rollupOptions: {
            input: {
                main: "index.html",
            },
        },
    },
});
