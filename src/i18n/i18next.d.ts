import { DefaultNS, Resources } from './index.ts';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: DefaultNS;
    resources: Resources[keyof Resources];
  }
}
