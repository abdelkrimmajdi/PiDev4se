// style-loader.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleLoaderService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  loadStyles(stylePaths: string[]): void {
    stylePaths.forEach((path) => {
      const styleLink = this.renderer.createElement('link');
      this.renderer.setAttribute(styleLink, 'rel', 'stylesheet');
      this.renderer.setAttribute(styleLink, 'href', path);
      this.renderer.appendChild(document.head, styleLink);
    });
  }
}
