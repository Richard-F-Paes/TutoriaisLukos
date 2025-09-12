import { defineConfig } from "trae";

export default defineConfig({
  mcp: {
    providers: [
      {
        name: "tutorial-agent",
        transport: {
          type: "stdio",
          command: "node",
          args: ["./mcp-tutorial.js"]
        }
      }
    ]
  }
});