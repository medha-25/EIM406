// Both script references are retained for compatibility with the original template.
// Initialise only once, after the document and Grid.js are ready.
function initialiseTimeline() {
  const target = document.getElementById("table-1");
  if (!target || target.dataset.gridInitialised || !window.gridjs) return;
  target.dataset.gridInitialised = "true";
  new gridjs.Grid({
    columns: ["Month", "Tasks"],
    data: [
      ["Nov & Dec", [
        "Research and refine parameters for numerical thermal modelling",
        "Design the external casing for the physical thermal phantom"
      ]],
      ["Jan", [
        "Fabricate the phantom casing and hydrogel testing setup",
        "Conduct Peltier-based surface cooling experiments"
      ]],
      ["Feb", [
        "Compare and analyse results from ANSYS simulations, Peltier cooling experiments, and hydrogel testing",
        "Draw preliminary conclusions from the findings"
      ]],
      ["Mar", [
        "Refine the experimental design to potentially incorporate simulated blood perfusion",
        "Repeat experiments as necessary to address discrepancies"
      ]],
      ["Apr", [
        "Consolidate findings to inform the development of a larger-scale thermal phantom",
        "Finalise comparative analysis and draw conclusions regarding the research hypothesis"
      ]],
    ].map(([month, tasks]) => [month, gridjs.html(`<ul class="timeline-tasks">${tasks.map(task => `<li>${task}</li>`).join("")}</ul>`)]),
    style: {
      table: { width: "100%", tableLayout: "fixed" },
      th: { whiteSpace: "normal" },
      td: { whiteSpace: "normal", overflowWrap: "anywhere" }
    },
  }).render(target);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialiseTimeline, { once: true });
} else {
  initialiseTimeline();
}

class TableComponent extends HTMLElement {
  static get observedAttributes() {
    return ["subtitle"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, _, newValue) {
    this[name] = newValue;
  }

  render() {
    const div = document.createElement("div");
    div.innerHTML = `
    <slot></slot>
    <sub>${this.subtitle}</sub>
    <style>
      :host {
        display: block;
        text-align: center;
      }

      sub {
        font-size: 1rem;
        font-style: italic;
      }
    </style>
  `;

    this.shadowRoot.appendChild(div);
  }
}

if (!customElements.get("table-component")) {
  customElements.define("table-component", TableComponent);
}
