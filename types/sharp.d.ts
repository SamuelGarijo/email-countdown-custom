declare module 'sharp' {
    interface Sharp {
      png(): Sharp;
      toBuffer(): Promise<Buffer>;
    }
  
    interface SharpConstructor {
      (input: Buffer): Sharp;
    }
  
    const sharp: SharpConstructor;
    export default sharp;
  }
    