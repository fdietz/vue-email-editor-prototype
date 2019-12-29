<template>
  <div>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <b-button
          variant="light"
          size="sm"
          class="menubar__button"
          :class="{ active: isActive.bold() }"
          @click="commands.bold"
        >
          <font-awesome-icon icon="bold" />
        </b-button>

        <b-button
          variant="light"
          size="sm"
          class="menubar__button"
          :class="{ active: isActive.italic() }"
          @click="commands.italic"
        >
          <font-awesome-icon icon="italic" />
        </b-button>

        <b-button
          variant="light"
          size="sm"
          class="menubar__button"
          :class="{ active: isActive.strike() }"
          @click="commands.strike"
        >
          <font-awesome-icon icon="strikethrough" />
        </b-button>

        <b-button
          variant="light"
          size="sm"
          class="menubar__button"
          :class="{ active: isActive.underline() }"
          @click="commands.underline"
        >
          <font-awesome-icon icon="underline" />
        </b-button>

        <b-button
          variant="light"
          size="sm"
          class="menubar__button"
          :class="{ active: isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <font-awesome-icon icon="paragraph" />
        </b-button>

        <b-button
          variant="light"
          size="sm"
          class="menubar__button"
          :class="{ active: isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </b-button>

        <b-button
          variant="light"
          size="sm"
          class="menubar__button"
          :class="{ active: isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </b-button>

        <b-button
          variant="light"
          size="sm"
          class="menubar__button"
          :class="{ active: isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </b-button>

        <b-button
          variant="light"
          size="sm"
          class="menubar__button"
          @click="commands.undo"
        >
          <font-awesome-icon icon="undo" />
        </b-button>

        <b-button
          variant="light"
          size="sm"
          class="menubar__button"
          @click="commands.redo"
        >
          <font-awesome-icon icon="redo" />
        </b-button>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor"></editor-content>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  HardBreak,
  Heading,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },

  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: this.value,
        onUpdate: ({ getHTML }) => {
          const state = getHTML();
          this.$emit("input", state);
        }
      })
    };
  },
  watch: {
    value(newValue) {
      this.editor.setContent(newValue);
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style lang="scss" scoped></style>
