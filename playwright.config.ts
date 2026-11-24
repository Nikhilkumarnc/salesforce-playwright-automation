
import { defineConfig, devices } from "@playwright/test";


export default defineConfig({
  
  testDir: "./tests",

  
  fullyParallel: true,

  
  reporter: "html",
  
  
  timeout: 60000,

  
  expect: {
    timeout: 10000, 
  },

  
  use: {
    baseURL: "https://trailhead.salesforce.com/login",
    headless: false, 
    storageState: "state.json", 
    trace: "on-first-retry", 
  },

  
  projects: [
    {
      name: "chromium", 
      use: { ...devices["Desktop Chrome"] }, 
    },
  ],
});
