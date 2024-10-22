declare module '*.svg' {
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  declare module '*.png' {
    const value: string;
    export default value;
  }

  declare module 'src/assets/brand/logo' {
    const value: any;
    export default value;
  }

  declare module 'src/utils/api' {
    const api: any;
    export default api;
  }
  
  
  