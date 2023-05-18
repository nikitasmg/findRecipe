declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string;
      REACT_APP_TINY_MCE_KEY: string;
      REACT_APP_FILES_URL: string;
    }
  }
}
