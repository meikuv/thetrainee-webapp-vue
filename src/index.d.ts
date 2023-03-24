import * as vue from 'vue'
declare module 'vue' {
  export default interface HTMLAttributes {
    className?: string
    vHtml?: string
    frameBorder?: string
  }
}
declare global {
  interface Window {
    example: any; // 👈️ turn off type checking
  }
}

export default vue