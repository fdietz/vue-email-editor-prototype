const DEFAULT_PADDING = 20;
const DEFAULT_COLOR = "#555";
const DEFAULT_BRAND_COLOR = "#18a0fa";
const DEFAULT_BACKGROUND_COLOR = "#fff";
const DEFAULT_ELEMENT_BACKGROUND_COLOR = "transparent";
const DEFAULT_ELEMENT_BUTTON_BACKGROUND_COLOR = DEFAULT_BRAND_COLOR;

let globalId = 100;

export const buildDefaultBlockAttrs = () => ({
  padding: 20,
  backgroundColor: DEFAULT_BACKGROUND_COLOR
});

export const buildDefaultColumnAttrs = () => ({
  padding: 0,
  alignSelf: "center"
});

export const buildDefaultElementAttrs = () => ({
  padding: DEFAULT_PADDING,
  textAlign: "center",
  color: DEFAULT_COLOR,
  containerBackgroundColor: DEFAULT_ELEMENT_BACKGROUND_COLOR
});

export const buildDefaultElementTextAttrs = () => {
  return buildDefaultElementAttrs();
};

export const buildDefaultElementButtonAttrs = () => {
  return {
    ...buildDefaultElementAttrs(),
    color: "#fff",
    backgroundColor: DEFAULT_ELEMENT_BUTTON_BACKGROUND_COLOR,
    href: "https://example.com"
  };
};

export const buildDefaultElementImageAttrs = () => {
  return {
    ...buildDefaultElementAttrs(),
    src: "https://via.placeholder.com/100x100",
    href: "https://example.com",
    width: "",
    height: ""
  };
};

export const createDefaultContent = () => ({
  children: [
    {
      id: nextGlobalId(),
      name: "block",
      attrs: buildDefaultBlockAttrs(),
      children: [
        {
          id: nextGlobalId(),
          name: "column",
          attrs: buildDefaultColumnAttrs(),
          children: [
            {
              id: nextGlobalId(),
              name: "element",
              type: "image",
              attrs: {
                ...buildDefaultElementImageAttrs(),
                src: "https://via.placeholder.com/400x100?text=You Logo here"
              }
            }
          ]
        }
      ]
    },
    {
      id: nextGlobalId(),
      name: "block",
      attrs: buildDefaultBlockAttrs(),
      children: [
        {
          id: nextGlobalId(),
          name: "column",
          attrs: buildDefaultColumnAttrs(),
          children: [
            {
              id: nextGlobalId(),
              name: "element",
              type: "text",
              attrs: {
                ...buildDefaultElementTextAttrs(),
                textAlign: "left"
              },
              content: `
                <h2>This is a title</h2>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam at, nihil quas harum mollitia dolores odio. Inventore delectus nihil soluta quos, magni doloribus, 
                voluptas aspernatur explicabo atque perspiciatis possimus voluptates.
                </p>
                
                <a href="#">Learn more</a>
              `
            }
          ]
        },
        {
          id: nextGlobalId(),
          name: "column",
          attrs: buildDefaultColumnAttrs(),
          children: [
            {
              id: nextGlobalId(),
              name: "element",
              type: "image",
              attrs: {
                ...buildDefaultElementImageAttrs(),
                src: "https://via.placeholder.com/220x200"
              }
            }
          ]
        }
      ]
    },
    {
      id: nextGlobalId(),
      name: "block",
      attrs: buildDefaultBlockAttrs(),
      children: [
        {
          id: nextGlobalId(),
          name: "column",
          attrs: buildDefaultColumnAttrs(),
          children: [
            {
              id: nextGlobalId(),
              name: "element",
              type: "text",
              attrs: {
                ...buildDefaultElementTextAttrs(),
                textAlign: "left"
              },
              content: `
                <h2>Sub Section Title</h2>
                <p>
                Sub Section Title
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eum eius numquam sint dolore voluptatibus beatae ab ad, dignissimos fugiat? Nisi odio commodi debitis eveniet tenetur provident aliquid tempora placeat.
                </p>
              `
            }
          ]
        },
        {
          id: nextGlobalId(),
          name: "column",
          attrs: buildDefaultColumnAttrs(),
          children: [
            {
              id: nextGlobalId(),
              name: "element",
              type: "text",
              attrs: {
                ...buildDefaultElementTextAttrs(),
                textAlign: "left"
              },
              content: `
                <h2>Sub Section Title</h2>
                <p>
                Sub Section Title
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eum eius numquam sint dolore voluptatibus beatae ab ad, dignissimos fugiat? Nisi odio commodi debitis eveniet tenetur provident aliquid tempora placeat.
                </p>
                `
            }
          ]
        }
      ]
    },
    {
      id: nextGlobalId(),
      name: "block",
      attrs: buildDefaultBlockAttrs(),
      children: [
        {
          id: nextGlobalId(),
          name: "column",
          attrs: buildDefaultColumnAttrs(),
          children: [
            {
              id: nextGlobalId(),
              name: "element",
              type: "text",
              attrs: {
                ...buildDefaultElementTextAttrs(),
                textAlign: "left"
              },
              content: ` 
                <p>
                  You received this email because you're signed up to receive updates from us
                </p>
                <a href="#">Click here to unsubscribe</a>
              `
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
          content: "Lorem ipsum",
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
  let attrs = {};
  let typeProps = {};
  if (type === "text") {
    attrs = buildDefaultElementTextAttrs();
    typeProps = { content: "Lorem ipsum" };
  } else if (type === "button") {
    attrs = buildDefaultElementButtonAttrs();
    typeProps = { content: "Press me" };
  } else if (type === "image") {
    attrs = buildDefaultElementImageAttrs();
    typeProps = { imageSrc: "https://via.placeholder.com/100x100" };
  }

  return {
    id: nextGlobalId(),
    name: "element",
    type,
    attrs,
    ...typeProps
  };
};
