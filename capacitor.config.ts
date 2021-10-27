import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stickaround.app',
  appName: 'Stick Around',
  webDir: 'dist',
  bundledWebRuntime: true,
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      launchAutoHide: true,
      backgroundColor: "#3E2C41",
      androidScaleType: "CENTER_CROP",
    
      splashFullScreen: true,
      splashImmersive: true,

    },
  }
};

export default config;
