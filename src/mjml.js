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

const buildHead = content => {
  const fontFamily = `Roboto, sans-serif`;
  return `
  <mj-attributes>
    <mj-class name="blue" color="blue" />
    <mj-class name="big" font-size="20px" />
    <mj-font name="Roboto, sans-serif" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" />
    <mj-all font-family="${fontFamily}" font-size="16px" line-height="24px"/>
    <mj-text font-size="16px" line-height="24px" />
    <mj-button background-color="#18a0fa" color="#FFF" />
  </mj-attributes>
  <mj-style inline="inline">
    h2 {
      font-size: 32px;
      line-height: 38.4px;
      font-weight: 500;
    }
    a {
      color: #18a0fa;
      text-decoration: none;
    }
  </mj-style>
  `;
};
const buildBody = content => {
  return `
    <mjml>
      <mj-head>
        ${buildHead(content)}
      </mj-head>
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
      ${element.content}
    </mj-text>`;
  } else if (element.type === "image") {
    return `
    <mj-image ${buildElementAttrs(element.attrs)}>
    </mj-image>`;
  } else if (element.type === "button") {
    return `
    <mj-button ${buildElementAttrs(element.attrs)}>
      ${element.content}
    </mj-button>`;
  }
};

const buildElementArray = elements => {
  return elements.map(e => buildElement(e)).join(" ");
};
