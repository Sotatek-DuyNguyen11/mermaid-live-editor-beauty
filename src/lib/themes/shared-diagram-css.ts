/**
 * Structural diagram CSS reused by all themes.
 * Extracted from diagram-theme-css.ts sharedThemeCSS.
 */

export const sharedDiagramCSS = `
/* ============================================================
   UNIVERSAL - applies to all diagram types
   ============================================================ */

/* Unified 16px rounded rectangles for all node shapes */
.node rect,
.node .label-container,
.stateGroup rect,
.entityBox,
.actor,
.note,
.cluster rect,
g.classGroup rect {
  rx: 16;
  ry: 16;
}

/* Typography - primary labels (semibold, 1.1em) */
.nodeLabel,
g.classGroup .title-text,
.stateGroup .state-title,
text.er.entityLabel,
.actor-man tspan,
.label text {
  font-family: "Inter Variable", system-ui, sans-serif !important;
  font-weight: 600;
  font-size: 1.1em;
  line-height: 1.4;
}

/* Typography - secondary/metadata labels (regular, full opacity for readability) */
.edgeLabel,
.noteText,
.messageText,
.loopText,
.labelText {
  font-family: "Inter Variable", system-ui, sans-serif !important;
  font-size: 0.85em;
}

/* Edge labels — transparent background, text elevated above lines via SVG post-processor */
.edgeLabel {
  padding: 2px 6px !important;
}

/* Typography - technical/monospace text */
.entityBox .attribute,
.classLabel .label,
.node .label code,
text.er.entityLabel tspan,
g.classGroup .classText {
  font-family: "JetBrains Mono Variable", "JetBrains Mono", monospace !important;
  font-size: 0.85em;
}

/* Generous inner padding for all node labels */
.node .label,
g.classGroup .label,
.stateGroup .label {
  padding: 12px 24px;
}

/* Consistent 2px stroke weight on ALL connector lines */
.flowchart-link,
.edge-pattern-solid,
.edge-pattern-dotted,
.messageLine0,
.messageLine1,
.relation,
.transition,
path.er.relationshipLine {
  stroke-width: 2px !important;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ============================================================
   FLOWCHART (also covers Use Case, Activity, Component, Deployment)
   ============================================================ */

/* Cluster/Subgraph - ultra-subtle "swimlane" partitioning */
.cluster rect {
  rx: 16 !important;
  ry: 16 !important;
  stroke-width: 1px !important;
  stroke-dasharray: 6 4 !important;
}
.cluster .nodeLabel,
.cluster-label .nodeLabel {
  font-weight: 500 !important;
  font-size: 0.8em !important;
  opacity: 0.55 !important;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* ============================================================
   SEQUENCE DIAGRAM
   ============================================================ */

.actor {
  rx: 16;
  ry: 16;
}

/* Activation bars - slightly rounded */
.activation0,
.activation1,
.activation2 {
  rx: 6;
  ry: 6;
}

/* Loop/alt/opt boxes - consistent rounding */
.loopLine {
  stroke-width: 1.5px !important;
  stroke-dasharray: 4 3 !important;
}

/* ============================================================
   CLASS DIAGRAM
   ============================================================ */

g.classGroup .title-text {
  font-weight: 600 !important;
  font-size: 1.1em;
}
g.classGroup rect.divider {
  stroke-width: 1.5px;
}
g.classGroup rect {
  rx: 16 !important;
  ry: 16 !important;
}
/* Mermaid v11 prefixes marker IDs: {svgId}_class-compositionStart etc. */
[id$="compositionStart"], [id$="compositionEnd"],
[id$="aggregationStart"], [id$="aggregationEnd"],
[id$="dependencyStart"], [id$="dependencyEnd"] {
  stroke-width: 1.5px;
}

/* ============================================================
   STATE DIAGRAM (also covers Activity diagrams)
   ============================================================ */

.stateGroup rect {
  rx: 16;
  ry: 16;
}
.stateGroup text {
  font-family: "Inter Variable", system-ui, sans-serif !important;
  font-weight: 600;
}
.start-state,
.end-state-outer,
.end-state-inner {
  stroke-width: 2px;
}
.transition {
  stroke-width: 2px !important;
}
.composit {
  rx: 16;
  ry: 16;
}

/* ============================================================
   ER DIAGRAM (Entity-Relationship)
   ============================================================ */

.entityBox {
  rx: 16;
  ry: 16;
  stroke-width: 1.5px;
}
text.er.entityLabel {
  font-family: "Inter Variable", system-ui, sans-serif !important;
  font-weight: 600;
  font-size: 1.1em;
}
.er.attributeBoxEven,
.er.attributeBoxOdd {
  rx: 0;
}
path.er.relationshipLine {
  stroke-width: 2px !important;
}
.er.relationshipLabel {
  font-family: "Inter Variable", system-ui, sans-serif !important;
  font-size: 0.85em;
}

/* ============================================================
   NOTES - all diagram types
   ============================================================ */

.note {
  rx: 12;
  ry: 12;
}

/* ============================================================
   BLOCK DIAGRAM & MINDMAP
   Labels use foreignObject HTML nodes; color inherits from theme.
   Background handled by universal foreignObject rule below.
   ============================================================ */
.block .label foreignObject div,
.block .label div,
.block .label span,
.block .label p,
.mindmap-node .label foreignObject div,
.mindmap-node .label div,
.mindmap-node-label div,
.mindmap-node-label span,
.mindmap-node-label p {
  color: inherit !important;
}

/* ============================================================
   GANTT (bonus)
   ============================================================ */
.section0, .section1, .section2, .section3 {
  rx: 6;
  ry: 6;
}

/* ============================================================
   UNIVERSAL FOREIGNOBJECT LABEL FIX
   Mermaid wraps labels in foreignObject > div for many diagram
   types (timeline, journey, kanban, flowchart markdown, etc.).
   Mermaid's theme engine also sets inline background-color on
   .nodeLabel span elements. Force transparent so the node fill
   shows through instead of opaque black/colored blocks on text.
   ============================================================ */
foreignObject div,
foreignObject span,
foreignObject p,
.nodeLabel span,
.label span,
.edgeLabel span,
.timeline-text span,
.journey-section-text span {
  background-color: transparent !important;
  background: transparent !important;
}
`;

/**
 * Dark mode CSS fixes for diagram types that render their own backgrounds.
 * ZenUML uses foreignObject with HTML — these CSS rules override its internal styles.
 * Parameterized by theme colors to keep each theme consistent.
 */
export function darkModeDiagramFixCSS(opts: {
  bgColor: string;
  textColor: string;
  borderColor: string;
  mutedColor: string;
  /** ER attribute row fills — Mermaid v11 computes HSL from primaryColor, ignoring attributeBackgroundColor* */
  erAttrEvenFill?: string;
  erAttrOddFill?: string;
}): string {
  return `
/* === ZenUML dark mode override === */
foreignObject .zenuml,
foreignObject .zenuml > div {
  background-color: ${opts.bgColor} !important;
  color: ${opts.textColor} !important;
}
foreignObject .zenuml .participant,
foreignObject .zenuml .participant .head {
  background-color: ${opts.borderColor} !important;
  color: ${opts.textColor} !important;
  border-color: ${opts.mutedColor} !important;
}
foreignObject .zenuml .message,
foreignObject .zenuml .message .label {
  color: ${opts.textColor} !important;
}
foreignObject .zenuml .lifeline {
  border-left-color: ${opts.mutedColor} !important;
}
foreignObject .zenuml .occurrence {
  background-color: ${opts.mutedColor} !important;
}

/* === ER diagram dark mode fix === */
/* Mermaid v11 computes row fills from primaryColor HSL, ignoring
   attributeBackgroundColorEven/Odd.  Override the <path> fills in
   row-rect-even (dark by default) and row-rect-odd (white by default). */
.row-rect-even path {
  fill: ${opts.erAttrEvenFill ?? opts.bgColor} !important;
}
.row-rect-odd path {
  fill: ${opts.erAttrOddFill ?? opts.borderColor} !important;
}
/* Ensure ER attribute text is readable against the overridden row fills */
[id*="entity"] foreignObject div span {
  color: ${opts.textColor} !important;
}
`;
}

export function mindmapLabelColorCSS(opts: { rootColor: string; sectionColors: string[] }): string {
  const sectionRules = opts.sectionColors
    .map(
      (color, index) => `
.section-${index - 1} span,
.section-${index - 1} p,
.section-${index - 1} div {
  color: ${color} !important;
}`
    )
    .join('\n');

  return `
.section-root span,
.section-root p,
.section-root div {
  color: ${opts.rootColor} !important;
}
${sectionRules}
`;
}
