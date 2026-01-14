import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";

@customElement("pixel-editor")
export class PixelEditor extends LitElement {
  static override styles = css`
    :host {
      display: block;
      touch-action: none;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 100%;
    }

    .canvas-wrapper {
      position: relative;
      border: 2px solid #333;
      border-radius: 4px;
      overflow: hidden;
      background: #111;
    }

    canvas {
      display: block;
      image-rendering: pixelated;
      cursor: crosshair;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
    }

    .color-picker {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    input[type="color"] {
      width: 3rem;
      height: 2.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      padding: 0;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      background: #333;
      color: white;
      transition: background 0.2s;
    }

    button:hover {
      background: #555;
    }

    button:active {
      background: #666;
    }

    .tool-buttons {
      display: flex;
      gap: 0.25rem;
    }

    .tool-buttons button {
      padding: 0.5rem 0.75rem;
    }

    .tool-buttons button.active {
      background: #0066cc;
    }

    .presets {
      display: flex;
      gap: 0.25rem;
      flex-wrap: wrap;
    }

    .preset-color {
      width: 1.5rem;
      height: 1.5rem;
      border: 2px solid transparent;
      border-radius: 4px;
      cursor: pointer;
      padding: 0;
    }

    .preset-color:hover {
      border-color: #fff;
    }

    .preset-color.active {
      border-color: #0066cc;
    }
  `;

  @property({ type: Number }) width = 32;
  @property({ type: Number }) height = 8;
  @property({ type: Number }) pixelSize = 20;

  @state() private currentColor = "#ff0000";
  @state() private tool: "draw" | "erase" = "draw";
  @state() private pixels: string[][] = [];

  @query("canvas") private canvas!: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private isDrawing = false;

  private presetColors = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ff8000",
    "#8000ff",
    "#00ff80",
    "#ff0080",
  ];

  override connectedCallback() {
    super.connectedCallback();
    this.initPixels();
  }

  override firstUpdated() {
    this.ctx = this.canvas.getContext("2d");
    this.render2D();
  }

  private initPixels() {
    this.pixels = Array(this.height)
      .fill(null)
      .map(() => Array(this.width).fill("#000000"));
  }

  private render2D() {
    if (!this.ctx) return;

    const displayWidth = this.width * this.pixelSize;
    const displayHeight = this.height * this.pixelSize;

    this.canvas.width = displayWidth;
    this.canvas.height = displayHeight;

    this.drawPixels();
  }

  private drawPixels() {
    if (!this.ctx) return;

    // Clear the canvas first
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < this.height; y++) {
      const row = this.pixels[y];
      if (!row) continue;
      for (let x = 0; x < this.width; x++) {
        this.ctx.fillStyle = row[x] ?? "#000000";
        this.ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);

        // Draw grid lines
        this.ctx.strokeStyle = "#222";
        this.ctx.lineWidth = 0.5;
        this.ctx.strokeRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
      }
    }
  }

  private getPixelCoords(e: MouseEvent | TouchEvent): { x: number; y: number } | null {
    const rect = this.canvas.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ("touches" in e && e.touches.length > 0) {
      const touch = e.touches[0];
      if (!touch) return null;
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return null;
    }

    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const x = Math.floor(((clientX - rect.left) * scaleX) / this.pixelSize);
    const y = Math.floor(((clientY - rect.top) * scaleY) / this.pixelSize);

    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      return { x, y };
    }
    return null;
  }

  private setPixel(x: number, y: number) {
    const color = this.tool === "erase" ? "#000000" : this.currentColor;
    const row = this.pixels[y];
    if (!row) return;

    row[x] = color;
    this.emitPixelDrawn(x, y, color);

    this.drawPixels();
    this.requestUpdate();
  }

  private emitPixelDrawn(x: number, y: number, color: string) {
    this.dispatchEvent(
      new CustomEvent("pixel-drawn", {
        detail: { x, y, color },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handlePointerDown(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    this.isDrawing = true;
    const coords = this.getPixelCoords(e);
    if (coords) {
      this.setPixel(coords.x, coords.y);
    }
  }

  private handlePointerMove(e: MouseEvent | TouchEvent) {
    if (!this.isDrawing) return;
    e.preventDefault();
    const coords = this.getPixelCoords(e);
    if (coords) {
      this.setPixel(coords.x, coords.y);
    }
  }

  private handlePointerUp() {
    this.isDrawing = false;
  }

  private setTool(tool: "draw" | "erase") {
    this.tool = tool;
  }

  private setColor(color: string) {
    this.currentColor = color;
    this.tool = "draw";
  }

  getPixelData(): string[][] {
    return this.pixels.map((row) => [...row]);
  }

  setPixelData(data: string[][]) {
    this.pixels = data.map((row) => [...row]);
    this.drawPixels();
  }

  /**
   * Set a single pixel externally (e.g., from websocket).
   * Does NOT emit pixel-drawn event to avoid loops.
   */
  setPixelExternal(x: number, y: number, color: string) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    const row = this.pixels[y];
    if (!row) return;
    row[x] = color;
    this.drawPixels();
  }

  /**
   * Set multiple pixels externally (e.g., from websocket bulk update).
   * Does NOT emit pixel-drawn events to avoid loops.
   */
  setPixelsExternal(pixels: { x: number; y: number; color: string }[]) {
    for (const { x, y, color } of pixels) {
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) continue;
      const row = this.pixels[y];
      if (!row) continue;
      row[x] = color;
    }
    this.drawPixels();
  }

  /**
   * Get a single pixel color.
   */
  getPixel(x: number, y: number): string | null {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return null;
    const row = this.pixels[y];
    return row?.[x] ?? null;
  }

  override render() {
    return html`
      <div class="container">
        <div class="canvas-wrapper">
          <canvas
            @mousedown=${this.handlePointerDown}
            @mousemove=${this.handlePointerMove}
            @mouseup=${this.handlePointerUp}
            @mouseleave=${this.handlePointerUp}
            @touchstart=${this.handlePointerDown}
            @touchmove=${this.handlePointerMove}
            @touchend=${this.handlePointerUp}
            @touchcancel=${this.handlePointerUp}
          ></canvas>
        </div>

        <div class="controls">
          <div class="color-picker">
            <input
              type="color"
              .value=${this.currentColor}
              @input=${(e: Event) => this.setColor((e.target as HTMLInputElement).value)}
            />
          </div>

          <div class="presets">
            ${this.presetColors.map(
              (color) => html`
                <button
                  class="preset-color ${this.currentColor === color ? "active" : ""}"
                  style="background: ${color}"
                  @click=${() => this.setColor(color)}
                ></button>
              `,
            )}
          </div>

          <div class="tool-buttons">
            <button class=${this.tool === "draw" ? "active" : ""} @click=${() => this.setTool("draw")} title="Draw">
              ✏️
            </button>
            <button class=${this.tool === "erase" ? "active" : ""} @click=${() => this.setTool("erase")} title="Erase">
              🧹
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pixel-editor": PixelEditor;
  }
}
