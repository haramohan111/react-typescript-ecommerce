declare module 'js-cookie' {
    interface Cookies {
      get(name: string): string | undefined;
      set(name: string, value: string, options?: any): void;
      remove(name: string, options?: any): void;
    }
    
    const Cookies: Cookies;
    export default Cookies;
  }