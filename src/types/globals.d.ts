declare global {
  interface GlobalEventHandlersEventMap {
    routechange: CustomEvent<{ url: string }>;
  }
}
export {}; //keep that for TS compiler.
