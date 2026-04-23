export {};

declare global {
  interface Window {
    CustomEvent: typeof CustomEvent;
  }
}

if (typeof Element !== "undefined" && !Element.prototype.matches) {
  Element.prototype.matches =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Element.prototype as any).msMatchesSelector ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Element.prototype as any).webkitMatchesSelector;
}

if (typeof Element !== "undefined" && !Element.prototype.closest) {
  Element.prototype.closest = function closest(this: Element, selector: string) {
    if (this.matches(selector)) {
      return this;
    }

    let element: Element | null = this.parentElement;
    while (element) {
      if (element.matches(selector)) {
        return element;
      }

      element = element.parentElement;
    }

    return null;
  };
}

if (typeof window !== "undefined" && typeof window.CustomEvent !== "function") {
  const CustomEventPolyfill = function CustomEventPolyfill<T>(
    event: string,
    params?: CustomEventInit<T>
  ) {
    const customEvent = document.createEvent("CustomEvent");
    customEvent.initCustomEvent(
      event,
      params?.bubbles ?? false,
      params?.cancelable ?? false,
      params?.detail ?? null
    );

    return customEvent;
  };

  CustomEventPolyfill.prototype = window.Event.prototype;
  window.CustomEvent = CustomEventPolyfill as unknown as typeof CustomEvent;
}

if (
  typeof NodeList !== "undefined" &&
  NodeList.prototype &&
  !NodeList.prototype.forEach
) {
  NodeList.prototype.forEach = function forEachPolyfill<TNode extends Node>(
    this: NodeListOf<TNode>,
    callbackfn: (value: TNode, key: number, parent: NodeListOf<TNode>) => void,
    thisArg?: unknown
  ) {
    for (let index = 0; index < this.length; index += 1) {
      callbackfn.call(thisArg, this[index], index, this);
    }
  };
}
