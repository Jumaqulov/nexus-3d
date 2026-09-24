import test from 'node:test';
import assert from 'node:assert/strict';
import { createScope } from '../src/experience/scope.js';

function browser() {
  const frames = new Map();
  const observers = [];
  let nextId = 0;
  class Observer {
    constructor(callback) { this.callback = callback; this.disconnected = false; observers.push(this); }
    disconnect() { this.disconnected = true; }
  }
  return {
    frames, observers,
    requestAnimationFrame(callback) { frames.set(++nextId, callback); return nextId; },
    cancelAnimationFrame(id) { frames.delete(id); },
    ResizeObserver: Observer,
    IntersectionObserver: Observer,
  };
}

test('setup → cleanup → setup leaves exactly one live event handler', () => {
  const target = new EventTarget();
  const host = browser();
  let calls = 0;
  const first = createScope(host);
  first.listen(target, 'click', () => calls++);
  first.dispose();
  const second = createScope(host);
  second.listen(target, 'click', () => calls++);
  target.dispatchEvent(new Event('click'));
  assert.equal(calls, 1);
  second.dispose();
  target.dispatchEvent(new Event('click'));
  assert.equal(calls, 1);
});

test('cleanup cancels frames and disconnects observers, including queued callbacks', () => {
  const host = browser();
  const scope = createScope(host);
  let calls = 0;
  scope.requestFrame(() => calls++);
  const queuedFrame = [...host.frames.values()][0];
  scope.resizeObserver(() => calls++);
  scope.intersectionObserver(() => calls++);
  const delayedFontCallback = scope.guard(() => calls++);
  scope.dispose();
  queuedFrame(16);
  host.observers.forEach((observer) => observer.callback([]));
  delayedFontCallback();
  assert.equal(calls, 0);
  assert.equal(host.frames.size, 0);
  assert.ok(host.observers.every((observer) => observer.disconnected));
  assert.equal(scope.requestFrame(() => calls++), null);
});

test('cleanup runs once in reverse order and cancelled frames are removed', () => {
  const host = browser();
  const scope = createScope(host);
  const order = [];
  scope.onDispose(() => order.push('presentation'));
  scope.onDispose(() => order.push('audio'));
  const frame = scope.requestFrame(() => assert.fail('cancelled frame ran'));
  scope.cancelFrame(frame);
  assert.equal(host.frames.size, 0);
  scope.dispose();
  scope.dispose();
  assert.deepEqual(order, ['audio', 'presentation']);
});
