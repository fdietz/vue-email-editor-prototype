const DEFAULT_PADDING = 20;
const DEFAULT_COLOR = "#555";
const DEFAULT_BACKGROUND_COLOR = "#fff";
const DEFAULT_ELEMENT_BACKGROUND_COLOR = "transparent";

let globalId = 100;

export const buildDefaultBlockAttrs = () => ({
  padding: 20,
  backgroundColor: DEFAULT_BACKGROUND_COLOR
});

export const buildDefaultColumnAttrs = () => ({
  padding: 0,
  alignSelf: "center"
});

export const buildDefaultElementTextAttrs = () => ({
  padding: DEFAULT_PADDING,
  textAlign: "center",
  color: DEFAULT_COLOR,
  backgroundColor: DEFAULT_ELEMENT_BACKGROUND_COLOR,
  textContent: "Lorem ipsum"
});

export const buildDefaultElementButtonAttrs = () => ({
  padding: DEFAULT_PADDING,
  textAlign: "center",
  color: DEFAULT_COLOR,
  backgroundColor: DEFAULT_ELEMENT_BACKGROUND_COLOR,
  buttonText: "Lorem ipsum"
});

export const createDefaultContent = () => ({
  children: [
    {
      id: 1,
      name: "block",
      attrs: buildDefaultBlockAttrs(),
      children: [
        {
          id: 1,
          name: "column",
          attrs: buildDefaultColumnAttrs(),
          children: [
            {
              id: 1,
              name: "element",
              type: "text",
              attrs: buildDefaultElementTextAttrs()
            }
          ]
        },
        {
          id: 2,
          name: "column",
          attrs: buildDefaultColumnAttrs(),
          children: [
            {
              id: 1,
              name: "element",
              type: "text",
              attrs: buildDefaultElementTextAttrs()
            },
            {
              id: 2,
              name: "element",
              type: "text",
              attrs: buildDefaultElementTextAttrs()
            }
          ]
        },
        {
          id: 3,
          name: "column",
          attrs: buildDefaultColumnAttrs(),
          children: []
        }
      ]
    },
    {
      id: 2,
      name: "block",
      attrs: buildDefaultBlockAttrs(),
      children: [
        {
          id: 4,
          name: "column",
          attrs: buildDefaultColumnAttrs(),
          children: [
            {
              id: 1,
              name: "element",
              type: "text",
              attrs: buildDefaultElementTextAttrs()
            }
          ]
        },
        {
          id: 5,
          name: "column",
          attrs: buildDefaultColumnAttrs(),
          children: [
            {
              id: 1,
              name: "element",
              type: "button",
              attrs: buildDefaultElementButtonAttrs()
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "block",
      attrs: buildDefaultBlockAttrs(),
      children: [
        {
          id: 6,
          name: "column",
          attrs: buildDefaultColumnAttrs(),
          children: [
            {
              id: 1,
              name: "element",
              type: "text",
              attrs: {
                ...buildDefaultElementTextAttrs(),
                textContent:
                  "<h2>Heading</h2><p>This is a <b>bold</b> paragraph</p>"
              }
            },
            {
              id: 2,
              name: "element",
              type: "text",
              attrs: buildDefaultElementTextAttrs()
            },
            {
              id: 3,
              name: "element",
              type: "text",
              attrs: buildDefaultElementTextAttrs()
            }
          ]
        }
      ]
    }
  ]
});

export const nextGlobalId = () => {
  globalId++;

  return globalId;
};

export const buildBlock = columnCount => {
  let columns = [];
  for (var i = 0; i < columnCount; i++) {
    columns.push({
      id: i + 1,
      name: "column",
      attrs: buildDefaultColumnAttrs(),
      children: [
        {
          id: 1,
          name: "element",
          type: "text",
          attrs: buildDefaultElementTextAttrs()
        }
      ]
    });
  }

  return {
    id: nextGlobalId(),
    name: "block",
    attrs: buildDefaultBlockAttrs(),
    children: columns
  };
};

export const buildElement = type => {
  let attrs = {}
  if (type === "text") {
    attrs = buildDefaultElementTextAttrs();
  } else if (type === "button") {
    attrs = buildDefaultElementButtonAttrs();
  }

  return {
    id: nextGlobalId(),
    name: "element",
    type,
    attrs
  }
}