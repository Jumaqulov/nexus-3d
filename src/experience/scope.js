/** Own browser resources for one React effect, including StrictMode/HMR cleanup. */
export function createScope(host = window) {
  let active = true;
  const cleanups = [];
  const frames = new Set();
  const guard =
    (callback) =>
    (...args) => {
      if (active) return callback(...args);
    };
  const onDispose = (cleanup) => cleanups.push(cleanup);
  const observe = (Observer, callback, options) => {
    const observer = new Observer(guard(callback), options);
    onDispose(() => observer.disconnect());
    return observer;
  };
  return {
    get active() {
      return active;
    },
    guard,
    onDispose,
    listen(target, type, listener, options) {
      const callback = guard(listener);
      target.addEventListener(type, callback, options);
      onDispose(() => target.removeEventListener(type, callback, options));
    },
    requestFrame(callback) {
      if (!active) return null;
      const id = host.requestAnimationFrame((time) => {
        frames.delete(id);
        if (active) callback(time);
      });
      frames.add(id);
      return id;
    },
    cancelFrame(id) {
      host.cancelAnimationFrame(id);
      frames.delete(id);
    },
    resizeObserver: (callback) => observe(host.ResizeObserver, callback),
    intersectionObserver: (callback, options) =>
      observe(host.IntersectionObserver, callback, options),
    dispose() {
      if (!active) return;
      active = false;
      frames.forEach((id) => host.cancelAnimationFrame(id));
      frames.clear();
      cleanups.reverse().forEach((cleanup) => cleanup());
    },
  };
}
