import WebGL from '@/class/three/WebGL'

declare function Paul_Pio(props: Record<any, any>): void
declare global {
  interface Window {
    webGL: WebGL
  }
}
export {}
