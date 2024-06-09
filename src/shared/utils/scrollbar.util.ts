export class Scrollbar {
  static scrollbarCSSVar: string = "--scrollbar-width"
  static initialBodyOverflow: string = this.isClient()
    ? getComputedStyle(document.body).overflow
    : "none"

  private static isClient(): boolean {
    return typeof document !== "undefined"
  }

  static isScrollbarVisible(): boolean {
    if (!this.isClient()) {
      return false
    }

    return document.documentElement.offsetWidth !== window.innerWidth
  }

  static getScrollbarWidth(): number {
    if (!this.isClient()) {
      return 0
    }

    const outer = document.createElement("div")
    outer.style.visibility = "hidden"
    outer.style.width = "100px"
    outer.style.height = "100px"
    outer.style.overflow = "scroll"
    document.body.appendChild(outer)

    const inner = document.createElement("div")
    inner.style.width = "100%"
    inner.style.height = "100%"
    outer.appendChild(inner)

    const widthDiff = outer.offsetWidth - inner.offsetWidth
    outer.remove()

    return widthDiff
  }

  static lock(): void {
    if (!this.isClient()) {
      return
    }

    const scrollbarWidth = this.getScrollbarWidth()
    this.initialBodyOverflow = getComputedStyle(document.body).overflow

    document.body.style.overflow = "hidden"
    document.documentElement.style.setProperty(this.scrollbarCSSVar, `${scrollbarWidth}px`)
  }

  static unlock(): void {
    if (!this.isClient()) {
      return
    }

    document.body.style.overflow = this.initialBodyOverflow
    document.documentElement.style.removeProperty(this.scrollbarCSSVar)
  }
}
