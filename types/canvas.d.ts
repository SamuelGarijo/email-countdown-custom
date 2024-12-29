declare module 'canvas' {
    export function createCanvas(width: number, height: number): Canvas;
    export interface Canvas {
      getContext(contextId: '2d'): CanvasRenderingContext2D;
      toDataURL(): string;
    }
    export interface CanvasRenderingContext2D {
      canvas: Canvas;
      fillStyle: string | CanvasGradient | CanvasPattern;
      font: string;
      textAlign: CanvasTextAlign;
      textBaseline: CanvasTextBaseline;
      fillRect(x: number, y: number, width: number, height: number): void;
      fillText(text: string, x: number, y: number, maxWidth?: number): void;
      measureText(text: string): TextMetrics;
    }
  }  