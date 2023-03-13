import * as vue from 'vue'
declare module 'vue' {
  export default interface HTMLAttributes {
    className?: string
    vHtml?: string
    frameBorder?: string
  }
}
export default vue