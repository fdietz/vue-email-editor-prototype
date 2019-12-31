import mjml2html from "mjml4-in-browser";

function transformMjmlToHtml(mjmlContent) {
  return mjml2html(mjmlContent).html;
}

export function generateMjmlPreview(content) {
  const result = buildBody(content);
  console.log(result);
  return transformMjmlToHtml(result);
}

const buildBodyAttrs = content => {
  return buildAttrsString({ color: "#555", fontFamily: "Arial, sans-serif" });
};

const buildBody = content => {
  return `
    <mjml>
      <mj-body ${buildBodyAttrs(content)}>${buildSectionArray(
    content.children
  )}</mj-body>
    </mjml>
  `;
};

const buildAttrsString = attrs => {
  return Object.keys(attrs)
    .map(key => {
      const normalizedKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${normalizedKey}="${attrs[key]}"`;
    })
    .join(" ");
};

const buildSection = block => {
  return `
  <mj-section ${buildAttrsString(block.attrs)}>
    ${buildColumnArray(block.children)}
  </mj-section>`;
};

const buildSectionArray = sections => {
  return sections.map(s => buildSection(s)).join(" ");
};

const buildColumn = column => {
  return `
  <mj-column ${buildAttrsString(column.attrs)}>
  ${buildElementArray(column.children)}
  </mj-column>`;
};

const buildColumnArray = columns => {
  return columns.map(c => buildColumn(c)).join(" ");
};

const buildElementAttrs = attrs => {
  const result = Object.keys(attrs).reduce((obj, key) => {
    obj[key] = attrs[key];
    return obj;
  }, {});
  return buildAttrsString(result);
};

const buildElement = element => {
  if (element.type === "text") {
    return `
    <mj-text ${buildElementAttrs(element.attrs)}>
      ${element.textContent}
    </mj-text>`;
  } else if (element.type === "image") {
    return `
    <mj-image ${buildElementAttrs(element.attrs)} src="${element.imageSrc}">
    </mj-image>`;
  } else if (element.type === "body") {
    return `
    <mj-button ${buildElementAttrs(element.attrs)}>
      ${element.buttonText}
    </mj-button>`;
  }
};

const buildElementArray = elements => {
  return elements.map(e => buildElement(e)).join(" ");
};
