import { DefaultNS, Resources } from '../i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: DefaultNS;
    resources: Resources[keyof Resources];
  }
}
