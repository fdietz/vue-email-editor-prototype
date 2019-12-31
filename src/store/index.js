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
  backgroundColor: DEFAULT_ELEMENT_BACKGROUND_COLOR
});

export const buildDefaultElementButtonAttrs = () => ({
  padding: DEFAULT_PADDING,
  textAlign: "center",
  color: DEFAULT_COLOR,
  backgroundColor: DEFAULT_ELEMENT_BACKGROUND_COLOR
});

export const buildDefaultElementImageAttrs = () => ({
  padding: DEFAULT_PADDING,
  textAlign: "center",
  color: DEFAULT_COLOR,
  backgroundColor: DEFAULT_ELEMENT_BACKGROUND_COLOR
});

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
              attrs: buildDefaultElementImageAttrs(),
              imageSrc: "https://via.placeholder.com/400x100?text=You Logo here"
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
              textContent: `
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
              attrs: buildDefaultElementImageAttrs(),
              imageSrc: "https://via.placeholder.com/220x200"
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
              textContent: `
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
              textContent: `
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
              textContent: ` 
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
          textContent: "Lorem ipsum",
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
    typeProps = { textContent: "Lorem ipsum" };
  } else if (type === "button") {
    attrs = buildDefaultElementButtonAttrs();
    typeProps = { buttonText: "Press me" };
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
