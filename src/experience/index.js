import { createScope } from "./scope.js";
import { initializeHero } from "./hero.js";
import { initializeJourney } from "./journey.js";

/** Restore the original React-owned nodes, never clones, when effects are disposed. */
function capturePresentation() {
  const nodes = [
    document.documentElement,
    document.body,
    ...document.getElementById("root").querySelectorAll("*"),
  ];
  const snapshots = nodes.map((node) => ({
    node,
    attributes: [...node.attributes].map(({ name, value }) => [name, value]),
    children: [...node.childNodes],
    texts: [...node.childNodes]
      .filter((child) => child.nodeType === 3)
      .map((child) => [child, child.data]),
  }));
  return () => {
    for (const { node, attributes, children, texts } of snapshots) {
      for (const { name } of [...node.attributes]) node.removeAttribute(name);
      for (const [name, value] of attributes) node.setAttribute(name, value);
      if (
        node.childNodes.length !== children.length ||
        children.some((child, index) => node.childNodes[index] !== child)
      ) {
        node.replaceChildren(...children);
      }
      for (const [child, data] of texts) child.data = data;
    }
  };
}

export function initializeExperience() {
  const scope = createScope();
  scope.onDispose(capturePresentation());
  try {
    initializeHero(scope);
    initializeJourney(scope);
  } catch (error) {
    scope.dispose();
    throw error;
  }
  return () => scope.dispose();
}
