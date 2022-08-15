export interface Environment {
  apiKey: string;
  production: boolean;
  fvDbUrl: string;
  fvStUrl: string;
}

export interface Firebase {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
