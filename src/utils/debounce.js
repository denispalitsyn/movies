export function debounce(f, t) {
  return function () {
    clearTimeout(this.timer);

    this.timer = setTimeout(f, t);
  };
}
