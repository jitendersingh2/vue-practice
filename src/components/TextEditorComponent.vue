<template>
  <div class="custom-texteditor" :class="{ 'd-chars-count': showCharsCount }">
    <ckeditor
      class="form-control"
      tag-name="textarea"
      rows="10"
      :placeholder="inputPlaceholder"
      :editor="editor"
      :config="editorConfig"
      v-model="editorText"
    ></ckeditor>

    <span class="chars-count text-muted" v-text="charsCount" v-if="showCharsCount"></span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlignmentPlugin from '@ckeditor/ckeditor5-alignment/src/alignment';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  components: {
    ckeditor: CKEditor.component,
  },
})
export default class TextEditorComponent extends Vue {
  @Prop({ default: '', type: String }) public readonly inputPlaceholder!: string;
  @Prop({ default: 255, type: Number }) public readonly maxChars!: number;
  @Prop({ default: false, type: Boolean })
  public readonly showCharsCount!: boolean;
  @Prop({ default: '<p></p>', type: String }) public readonly value!: string;

  private editor = ClassicEditor;
  private editorConfig = {
    removePlugins: [
      'MediaEmbed',
    ],

    extraPlugins: [
      AlignmentPlugin,
    ],

    toolbar: {
      items: [
        'heading',
        '|',
        'alignment',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'imageUpload',
        'blockQuote',
        'insertTable',
      ],
    },
  };

  // @TODO: Write an adapter to upload files to the server for CK Editor.
  // private uploadAdapter = undefined;

  get charsCount() {
    return (
      this.value.replace(/(<([^>]+)>)/gi, '').length + ' / ' + this.maxChars
    );
  }

  get editorText() {
    return this.value;
  }

  set editorText(value) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" scoped>
.d-chars-count {
  position: relative;

  form-control {
    padding-right: 70px;
  }

  .chars-count {
    font-size: 14px;
    position: absolute;
    bottom: 25px;
    right: 25px;
  }
}
</style>

<style lang="scss">
.custom-texteditor {
  background-color: #FAFAFA;
  border: 1px solid transparent;
  border-radius: 15px;
  padding: 15px;

  .ck.ck-editor {
    background-color: transparent !important;

    .ck.ck-editor__top .ck-sticky-panel .ck-toolbar {
      border: 0;
    }

    .ck.ck-editor__main > .ck-editor__editable {
      border-color: #f2f2f2;
      min-height: 150px;
    }
  }
}
</style>
