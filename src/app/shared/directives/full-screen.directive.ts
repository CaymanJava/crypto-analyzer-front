import { Directive, HostListener } from '@angular/core';


@Directive({
  selector: '[fullScreenWindow]'
})
export class FullScreenWindowDirective {

  @HostListener('click', ['$event'])
  toggleFullscreen() {
    const elem = document.body;
    const isInFullScreen = (document['fullScreenElement'] && document['fullScreenElement'] !== null) || (document['mozFullScreen'] || document['webkitIsFullScreen']);

    if (isInFullScreen) {
      this.cancelFullScreen(document);
    } else {
      this.requestFullScreen(elem);
    }
    return false;
  }

  private cancelFullScreen(el) {
    const requestMethod = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullscreen;
    if (requestMethod) {
      requestMethod.call(el);
    }
  }

  private requestFullScreen(el) {
    const requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (requestMethod) {
      requestMethod.call(el);
    }
    return false
  }

}
