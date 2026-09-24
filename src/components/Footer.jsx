export default function Footer() {
  return (
    <footer className={"site-footer"}>
      <a className={"brand footer-brand"} href={"#main"}>
        <span className={"brand-mark"} aria-hidden={"true"}>
          {"N"}
        </span>
        <span>{"NEXUS"}</span>
      </a>
      <span>{"BEYOND THE SCREEN. INTO YOUR ELEMENT."}</span>
      <a href={"#main"}>
        {"Back to the surface "}
        <svg className={"icon small"}>
          <use href={"#icon-arrow"}></use>
        </svg>
      </a>
    </footer>
  );
}
