const reportPath =
  "./research/in-vivo-car-t/in-vivo-car-t-market-intelligence-report.md";
const reportUrl = new URL(reportPath, window.location.href);

const reportEl = document.getElementById("report");
const tocEl = document.getElementById("toc");

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanHeadingText(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const headingIdAliases = new Map([
  ["1. Executive summary", "executive-summary"],
  ["1. Why the field matters now", "executive-summary"],
  ["2. How CAR-T therapy works: general mechanism", "2-how-car-t-therapy-works-general-mechanism"],
  ["2. How CAR-T works", "2-how-car-t-therapy-works-general-mechanism"],
  ["How CAR-T works", "2-how-car-t-therapy-works-general-mechanism"],
  ["Allogeneic / off-the-shelf CAR-T", "allogeneic-off-the-shelf-car-t"],
  ["4. In Vivo CAR-T therapy", "4-in-vivo-car-t-therapy"],
  ["4. In Vivo CAR-T as a delivery model", "4-in-vivo-car-t-therapy"],
  ["In vivo CAR-T as a delivery model", "4-in-vivo-car-t-therapy"],
  ["7. Delivery methods for in vivo CAR-T", "7-delivery-methods-for-in-vivo-car-t"],
  ["7. Delivery methods and strategic implications for in vivo CAR-T", "7-delivery-methods-for-in-vivo-car-t"],
  ["Delivery methods and strategic implications", "7-delivery-methods-for-in-vivo-car-t"],
]);

function createHeadingId(text, counts) {
  const plainText = cleanHeadingText(text);
  const baseId = headingIdAliases.get(plainText) || slugify(plainText);
  const currentCount = counts.get(baseId) || 0;
  const nextCount = currentCount + 1;
  counts.set(baseId, nextCount);
  return nextCount === 1 ? baseId : `${baseId}-${nextCount}`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function headingIconType(title) {
  const text = title.toLowerCase();

  if (
    text.includes("executive") ||
    text.includes("why the field matters") ||
    text.includes("overview")
  ) {
    return "summary";
  }
  if (text.includes("car-t 101") || text.includes("biology")) return "cell";
  if (text.includes("differentiation") || text.includes("engineering happens")) {
    return "compare";
  }
  if (text.includes("bottleneck")) return "funnel";
  if (text.includes("technology") || text.includes("delivery modality")) return "particle";
  if (text.includes("delivery")) return "particle";
  if (text.includes("developer") || text.includes("landscape")) return "network";
  if (text.includes("partnership") || text.includes("deal")) return "deals";
  if (text.includes("partner-free") || text.includes("unpartnered")) return "solo";
  if (text.includes("financing") || text.includes("funding") || text.includes("investor")) return "bars";
  if (text.includes("conclusion")) return "compass";
  if (text.includes("strategic")) return "compass";
  if (text.includes("caveat") || text.includes("data gap")) return "shield";
  if (text.includes("appendix") || text.includes("source")) return "docs";
  if (text.includes("autoimmune")) return "reset";
  if (text.includes("oncology")) return "target";
  if (text.includes("lentiviral")) return "vector";

  return "spark";
}

function createHeadingIcon(type) {
  const icons = {
    summary: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="4,15 9,10 13,13 20,6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></polyline>
        <circle cx="4" cy="15" r="1.4" fill="currentColor"></circle>
        <circle cx="9" cy="10" r="1.4" fill="currentColor"></circle>
        <circle cx="13" cy="13" r="1.4" fill="currentColor"></circle>
        <circle cx="20" cy="6" r="1.4" fill="currentColor"></circle>
      </svg>
    `,
    cell: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="2"></circle>
        <circle cx="9" cy="10" r="1.3" fill="currentColor"></circle>
        <circle cx="14.5" cy="9" r="1.5" fill="currentColor"></circle>
        <circle cx="13.5" cy="14.5" r="1.2" fill="currentColor"></circle>
        <rect x="17.2" y="10.5" width="4.2" height="3" rx="1.5" fill="currentColor"></rect>
      </svg>
    `,
    compare: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="6" width="6.5" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
        <rect x="14" y="6" width="6.5" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
        <line x1="12" y1="4.5" x2="12" y2="19.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
      </svg>
    `,
    funnel: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16l-6 6v5l-4 2v-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path>
      </svg>
    `,
    particle: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="2.5" fill="currentColor"></circle>
        <circle cx="6" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="2"></circle>
        <circle cx="18" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="2"></circle>
        <circle cx="18" cy="16" r="2" fill="none" stroke="currentColor" stroke-width="2"></circle>
        <line x1="8" y1="8.8" x2="10.2" y2="10.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <line x1="14" y1="10.2" x2="16.1" y2="8.9" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <line x1="14" y1="13.8" x2="16.1" y2="15.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
      </svg>
    `,
    network: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="6" cy="12" r="2.2" fill="currentColor"></circle>
        <circle cx="18" cy="7" r="2.2" fill="currentColor"></circle>
        <circle cx="18" cy="17" r="2.2" fill="currentColor"></circle>
        <line x1="8.2" y1="11.2" x2="15.8" y2="7.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <line x1="8.2" y1="12.8" x2="15.8" y2="16.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
      </svg>
    `,
    deals: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 8h8l-2.5-2.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M20 16h-8l2.5 2.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M12 6v12" fill="none" stroke="currentColor" stroke-width="2"></path>
      </svg>
    `,
    solo: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" stroke-width="2"></circle>
        <circle cx="12" cy="12" r="2.2" fill="currentColor"></circle>
      </svg>
    `,
    bars: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="12" width="3.5" height="7" rx="1" fill="currentColor"></rect>
        <rect x="10.2" y="8" width="3.5" height="11" rx="1" fill="currentColor"></rect>
        <rect x="16.4" y="5" width="3.5" height="14" rx="1" fill="currentColor"></rect>
      </svg>
    `,
    compass: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="2"></circle>
        <path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor"></path>
      </svg>
    `,
    shield: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4l6 2.4v5.4c0 4.2-2.4 6.8-6 8.2-3.6-1.4-6-4-6-8.2V6.4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path>
        <line x1="12" y1="8" x2="12" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <circle cx="12" cy="16.2" r="1.2" fill="currentColor"></circle>
      </svg>
    `,
    docs: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="6.5" y="4.5" width="11" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
        <line x1="9" y1="9" x2="15" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <line x1="9" y1="12.5" x2="15" y2="12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <line x1="9" y1="16" x2="13" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
      </svg>
    `,
    reset: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 7a7 7 0 1 1-1 8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path>
        <path d="M7 4v4h4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    `,
    target: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="2"></circle>
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"></circle>
        <line x1="12" y1="3.5" x2="12" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <line x1="12" y1="18" x2="12" y2="20.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <line x1="3.5" y1="12" x2="6" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <line x1="18" y1="12" x2="20.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
      </svg>
    `,
    vector: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8" cy="12" r="2.4" fill="currentColor"></circle>
        <path d="M10.5 12h8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path>
        <path d="M15 8l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    `,
    spark: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4l1.8 4.2L18 10l-4.2 1.8L12 16l-1.8-4.2L6 10l4.2-1.8z" fill="currentColor"></path>
      </svg>
    `,
  };

  return icons[type] || icons.spark;
}

function decorateHeading(heading) {
  if (heading.querySelector(".heading-shell")) {
    return;
  }

  const title = heading.textContent.trim();
  const type = headingIconType(title);
  const isSubheading = heading.tagName === "H3";
  const originalHtml = heading.innerHTML;

  heading.innerHTML = `
    <span class="heading-shell ${isSubheading ? "subheading-shell" : ""}">
      <span class="heading-icon icon-${type}">${createHeadingIcon(type)}</span>
      <span class="heading-text">${originalHtml}</span>
    </span>
  `;
}

function decorateHeadings() {
  reportEl
    .querySelectorAll("h2:not([data-no-toc]), h3:not([data-no-toc])")
    .forEach(decorateHeading);
}

function parseInline(text, footnoteIndexById) {
  let html = escapeHtml(text);

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const safeHref = href.trim();
    const isExternal = /^https?:\/\//i.test(safeHref);
    const externalAttrs = isExternal
      ? ' target="_blank" rel="noopener noreferrer"'
      : "";
    return `<a href="${safeHref}"${externalAttrs}>${label}</a>`;
  });
  html = html.replace(/\[\^([^\]]+)\]/g, (_, id) => {
    const number = footnoteIndexById.get(id);
    if (!number) {
      return "";
    }
    return `<sup><a href="#footnote-${id}">${number}</a></sup>`;
  });
  html = html.replace(/&lt;br\s*\/?&gt;/gi, "<br>");

  return html;
}

function extractFootnotes(markdown) {
  const footnotes = [];
  const remainingLines = [];

  for (const line of markdown.split("\n")) {
    const match = line.match(/^\[\^([^\]]+)\]:\s*(.+)$/);
    if (match) {
      footnotes.push({ id: match[1], text: match[2] });
      continue;
    }
    remainingLines.push(line);
  }

  const footnoteIndexById = new Map(
    footnotes.map((footnote, index) => [footnote.id, index + 1]),
  );

  return {
    body: remainingLines.join("\n"),
    footnotes,
    footnoteIndexById,
  };
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderTable(lines, footnoteIndexById) {
  const rows = lines.map(splitTableRow);
  const header = rows[0];
  const bodyRows = rows.slice(2);

  const headHtml = header
    .map((cell) => `<th>${parseInline(cell, footnoteIndexById)}</th>`)
    .join("");

  const bodyHtml = bodyRows
    .map((row) => {
      const cells = row
        .map((cell) => `<td>${parseInline(cell, footnoteIndexById)}</td>`)
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>${headHtml}</tr>
        </thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    </div>
  `;
}

function renderMarkdown(markdown) {
  const cleaned = markdown
    .replace(/^# .+\n\n\*\*Last updated:\*\*.+\n\n/, "")
    .trim();
  const { body, footnotes, footnoteIndexById } = extractFootnotes(cleaned);
  const lines = body.split("\n");
  const headingCounts = new Map();

  const chunks = [];
  let index = 0;
  let paragraphBuffer = [];
  let listBuffer = [];
  let listType = null;

  function flushParagraph() {
    if (!paragraphBuffer.length) {
      return;
    }
    const text = paragraphBuffer.join(" ");
    chunks.push(`<p>${parseInline(text, footnoteIndexById)}</p>`);
    paragraphBuffer = [];
  }

  function flushList() {
    if (!listBuffer.length || !listType) {
      return;
    }
    const tag = listType === "ol" ? "ol" : "ul";
    const items = listBuffer
      .map((item) => `<li>${parseInline(item, footnoteIndexById)}</li>`)
      .join("");
    chunks.push(`<${tag}>${items}</${tag}>`);
    listBuffer = [];
    listType = null;
  }

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      index += 1;
      continue;
    }

    if (trimmed.startsWith("|")) {
      flushParagraph();
      flushList();
      const tableLines = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      chunks.push(renderTable(tableLines, footnoteIndexById));
      continue;
    }

    const headingMatch = trimmed.match(/^(#{2,3})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = createHeadingId(text, headingCounts);
      chunks.push(
        `<h${level} id="${id}">${parseInline(text, footnoteIndexById)}</h${level}>`,
      );
      index += 1;
      continue;
    }

    const unorderedMatch = trimmed.match(/^- (.+)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listType && listType !== "ul") {
        flushList();
      }
      listType = "ul";
      listBuffer.push(unorderedMatch[1]);
      index += 1;
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType && listType !== "ol") {
        flushList();
      }
      listType = "ol";
      listBuffer.push(orderedMatch[1]);
      index += 1;
      continue;
    }

    paragraphBuffer.push(trimmed);
    index += 1;
  }

  flushParagraph();
  flushList();

  if (footnotes.length) {
    const footnoteItems = footnotes
      .map((footnote, idx) => {
        const label = idx + 1;
        return `
          <li id="footnote-${footnote.id}">
            <span>${label}.</span>
            <span>${parseInline(footnote.text, footnoteIndexById)}</span>
          </li>
        `;
      })
      .join("");

    chunks.push(`
      <section class="footnotes">
        <h3 id="footnotes">Footnotes</h3>
        <ol>${footnoteItems}</ol>
      </section>
    `);
  }

  return chunks.join("\n");
}

function buildToc() {
  const headings = [
    ...reportEl.querySelectorAll("h2:not([data-no-toc]), h3:not([data-no-toc])"),
  ];
  tocEl.innerHTML = headings
    .map((heading) => {
      const depthClass = `depth-${heading.tagName === "H2" ? "2" : "3"}`;
      return `<a class="${depthClass}" href="#${heading.id}">${cleanHeadingText(heading.textContent)}</a>`;
    })
    .join("");
}

function decorateCallouts() {
  reportEl.querySelectorAll("p").forEach((paragraph) => {
    const firstStrong = paragraph.querySelector("strong");
    if (!firstStrong) {
      return;
    }

    const label = firstStrong.textContent.trim().toLowerCase();
    if (label === "method note:" || label === "scope note:") {
      paragraph.classList.add("report-callout", "report-callout-note");
    }
  });
}

function decorateSummarySection() {
  const summaryHeading = document.getElementById("executive-summary");
  if (!summaryHeading) {
    return;
  }

  summaryHeading.classList.add("section-summary-heading");

  let sibling = summaryHeading.nextElementSibling;
  while (sibling && !/^H2$/i.test(sibling.tagName)) {
    if (sibling.tagName === "UL") {
      sibling.classList.add("summary-list");
      break;
    }
    sibling = sibling.nextElementSibling;
  }
}

function decorateInsightLists() {
  [
    "strategic-read-through",
    "what-the-deal-activity-suggests",
    "what-early-financings-suggest",
    "key-diligence-questions",
    "what-to-watch-next",
  ].forEach((id) => {
    const heading = document.getElementById(id);
    if (!heading) {
      return;
    }

    const list = heading.nextElementSibling;
    if (!list || list.tagName !== "UL") {
      return;
    }

    list.classList.add("summary-list", "insight-list");
  });
}

function classifyTablesBySection() {
  reportEl.querySelectorAll(".table-wrap").forEach((tableWrap) => {
    const table = tableWrap.querySelector("table");
    if (!table) {
      return;
    }

    let previous = tableWrap.previousElementSibling;
    while (previous && !/^H[23]$/i.test(previous.tagName)) {
      previous = previous.previousElementSibling;
    }

    if (!previous) {
      return;
    }

    const label = cleanHeadingText(previous.textContent).toLowerCase();
    if (label.includes("modality comparison")) {
      table.classList.add("comparison-table");
    }
    if (label.includes("where to play")) {
      table.classList.add("comparison-table");
    }
    if (label.includes("competitive landscape")) {
      table.classList.add("landscape-table");
    }
    if (label.includes("delivery methods") || label.includes("delivery architectures")) {
      table.classList.add("delivery-table");
    }
    if (label.includes("deals") || label.includes("m&a") || label.includes("partnerships")) {
      table.classList.add("deal-table");
    }
    if (label.includes("funding") || label.includes("financing")) {
      table.classList.add("funding-table");
    }
    if (label.includes("constraints")) {
      table.classList.add("constraint-table");
    }
  });
}

function decorateEmphasisCallouts() {
  ["final-takeaway"].forEach((id) => {
    const heading = document.getElementById(id);
    if (!heading) {
      return;
    }

    const block = heading.nextElementSibling;
    if (!block || block.tagName !== "P") {
      return;
    }

    block.classList.add("report-callout", "report-callout-emphasis");
  });
}

function bindInPageNavigation() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) {
      return;
    }

    const href = link.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    const targetId = decodeURIComponent(href.slice(1));
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    history.replaceState(null, "", `#${targetId}`);
  });
}

function buildScientificFigure({ kicker, title, subtitle, ariaLabel, svg }) {
  return `
    <section class="report-exhibit">
      <article class="visual-panel visual-panel-wide">
        <div class="panel-head">
          <p class="panel-kicker">${kicker}</p>
          <h2 data-no-toc>${title}</h2>
          <p>${subtitle}</p>
        </div>
        <div class="science-figure" role="img" aria-label="${ariaLabel}">
          ${svg}
        </div>
      </article>
    </section>
  `;
}

function buildScientificFigureImage({ kicker, title, subtitle, ariaLabel, src, alt }) {
  return `
    <section class="report-exhibit">
      <article class="visual-panel visual-panel-wide">
        <div class="panel-head">
          <p class="panel-kicker">${kicker}</p>
          <h2 data-no-toc>${title}</h2>
          <p>${subtitle}</p>
        </div>
        <div class="science-figure science-figure-image" role="img" aria-label="${ariaLabel}">
          <img src="${src}" alt="${alt}" loading="lazy" />
        </div>
      </article>
    </section>
  `;
}

function buildGeneralMoaFigure() {
  return buildScientificFigureImage({
    kicker: "Mechanism of action",
    title: "General CAR-T mechanism",
    subtitle: "Recognition, activation and target-cell killing.",
    ariaLabel:
      "General CAR-T mechanism showing a native T cell, CAR engineering, antigen recognition, T-cell activation, tumor-cell killing and immune signaling",
    src: "./research/in-vivo-car-t/assets/how_car_t_cells_work.svg",
    alt: "Figure 1: CAR-T mechanism of action",
  });
}

function buildAllogeneicFigure() {
  return buildScientificFigureImage({
    kicker: "Allogeneic CAR-T",
    title: "Autologous versus allogeneic ex vivo CAR-T",
    subtitle: "External engineering, with patient-derived versus donor-derived cells.",
    ariaLabel:
      "Comparison of autologous and allogeneic CAR-T cell therapy workflows and tradeoffs",
    src: "./research/in-vivo-car-t/assets/autologous_vs_allogeneic_car_t_cell_therapy.svg",
    alt: "Figure 3: Autologous versus allogeneic CAR-T cell therapy",
  });
}

function buildInVivoFigure() {
  return buildScientificFigureImage({
    kicker: "<em>In vivo</em> CAR-T",
    title: "<em>Ex vivo</em> versus <em>in vivo</em> CAR-T",
    subtitle: "The main shift is from external manufacturing to in-body engineering.",
    ariaLabel:
      "Comparison of ex vivo and in vivo CAR-T workflows and timelines",
    src: "./research/in-vivo-car-t/assets/ex_vivo_vs_in_vivo_car_t.svg",
    alt: "Figure 4: Ex vivo versus in vivo CAR-T",
  });
}

function buildDeliveryExhibit() {
  return `
    <section class="report-exhibit">
      <article class="visual-panel visual-panel-wide vector-panel">
        <div class="panel-head">
          <p class="panel-kicker">Delivery methods</p>
          <h2 data-no-toc>Major delivery architectures</h2>
          <p>Carrier choice drives targeting logic, expression profile and redosing options.</p>
        </div>

        <div class="delivery-matrix" role="img" aria-label="Comparison matrix of major in vivo CAR-T delivery architectures">
          <div class="delivery-head">Modality</div>
          <div class="delivery-head">Payload</div>
          <div class="delivery-head">Expression profile</div>
          <div class="delivery-head">Main watchpoint</div>

          <div class="delivery-cell delivery-name">Targeted LNP + linear RNA</div>
          <div class="delivery-cell">mRNA</div>
          <div class="delivery-cell">Transient</div>
          <div class="delivery-cell">Targeting precision and repeat dosing</div>

          <div class="delivery-cell delivery-name">Targeted LNP + circular RNA</div>
          <div class="delivery-cell">Circular RNA</div>
          <div class="delivery-cell">Potentially longer expression</div>
          <div class="delivery-cell">Dose control and durability</div>

          <div class="delivery-cell delivery-name">Retargeted lentivirus</div>
          <div class="delivery-cell">DNA cassette</div>
          <div class="delivery-cell">Potentially durable</div>
          <div class="delivery-cell">Off-target transduction and vector immunity</div>

          <div class="delivery-cell delivery-name">AAV-assisted targeted insertion</div>
          <div class="delivery-cell">DNA template + editing system</div>
          <div class="delivery-cell">Potentially durable</div>
          <div class="delivery-cell">Multi-component complexity</div>

          <div class="delivery-cell delivery-name">Polymeric or other non-viral particles</div>
          <div class="delivery-cell">Design-dependent nucleic acid payload</div>
          <div class="delivery-cell">Usually transient</div>
          <div class="delivery-cell">Specificity and CMC consistency</div>
        </div>
      </article>
    </section>
  `;
}

function insertExhibitAfter(headingId, html) {
  const heading = document.getElementById(headingId);
  if (!heading) {
    return;
  }
  heading.insertAdjacentHTML("afterend", html);
}

function insertSectionExhibits() {
  insertExhibitAfter(
    "2-how-car-t-therapy-works-general-mechanism",
    buildGeneralMoaFigure(),
  );

  insertExhibitAfter(
    "allogeneic-off-the-shelf-car-t",
    buildAllogeneicFigure(),
  );

  insertExhibitAfter(
    "4-in-vivo-car-t-therapy",
    buildInVivoFigure(),
  );

  insertExhibitAfter(
    "7-delivery-methods-for-in-vivo-car-t",
    buildDeliveryExhibit(),
  );
}

async function loadReport() {
  reportEl.setAttribute("aria-busy", "true");
  try {
    const response = await fetch(reportUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const markdown = await response.text();
    if (!markdown.trim()) {
      throw new Error("The report source was empty.");
    }

    reportEl.innerHTML = renderMarkdown(markdown);
    insertSectionExhibits();
    decorateHeadings();
    decorateCallouts();
    decorateSummarySection();
    decorateInsightLists();
    decorateEmphasisCallouts();
    classifyTablesBySection();
    buildToc();
  } catch (error) {
    reportEl.innerHTML = `
      <section class="error-state" role="alert">
        <h2>Report unavailable</h2>
        <p>Could not load the local Markdown source for this report.</p>
        <p class="error-detail">${escapeHtml(error.message)}</p>
      </section>
    `;
    tocEl.innerHTML = "";
  } finally {
    reportEl.setAttribute("aria-busy", "false");
  }
}

decorateHeadings();
bindInPageNavigation();
loadReport();
