import ExcelJS from "exceljs";
const path = process.argv[2];
const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(path);
console.log("=== ", path.split("/").pop());
for (const ws of wb.worksheets) {
  console.log(`\n--- SHEET "${ws.name}"  rows=${ws.rowCount} cols=${ws.columnCount} state=${ws.state}`);
  console.log("  views:", JSON.stringify(ws.views));
  const widths = [];
  for (let c = 1; c <= Math.min(ws.columnCount, 12); c++) widths.push(ws.getColumn(c).width ?? "-");
  console.log("  col widths:", widths.join(", "));
  console.log("  merges:", JSON.stringify((ws.model.merges ?? []).slice(0, 12)));
  const imgs = ws.getImages?.() ?? [];
  console.log("  images:", imgs.length, imgs.slice(0, 3).map(i => `@${JSON.stringify(i.range?.tl)}`).join(" "));
  // First ~14 rows: values + style fingerprints + hyperlinks
  const maxR = Math.min(ws.rowCount, 15);
  for (let r = 1; r <= maxR; r++) {
    const row = ws.getRow(r);
    const cells = [];
    row.eachCell({ includeEmpty: false }, (cell, col) => {
      let v = cell.value;
      if (v && typeof v === "object") {
        if (v.richText) v = "RT:" + v.richText.map(t => t.text).join("");
        else if (v.hyperlink) v = `LINK[${v.hyperlink}]${v.text ?? ""}`;
        else if (v.formula) v = `={${v.formula}}`;
        else if (v.result !== undefined) v = `=?${v.result}`;
      }
      const st = [];
      const f = cell.font ?? {};
      if (f.bold) st.push("B");
      if (f.size) st.push(`s${f.size}`);
      if (f.color?.argb) st.push(`c${f.color.argb}`);
      if (f.name) st.push(f.name);
      const fill = cell.fill;
      if (fill?.fgColor?.argb) st.push(`bg${fill.fgColor.argb}`);
      if (cell.numFmt) st.push(`fmt[${cell.numFmt}]`);
      if (cell.border?.bottom?.style) st.push(`bb:${cell.border.bottom.style}`);
      cells.push(`${cell.address}=${JSON.stringify(String(v).slice(0, 28))}${st.length ? "{" + st.join(",") + "}" : ""}`);
    });
    if (cells.length) console.log(`  r${r} h=${row.height ?? "-"}: ${cells.join(" | ")}`);
  }
  // row heights histogram for image rows
  const hs = {};
  ws.eachRow((row) => { const h = Math.round(row.height ?? 15); hs[h] = (hs[h] ?? 0) + 1; });
  console.log("  row-height histogram:", JSON.stringify(hs));
}
