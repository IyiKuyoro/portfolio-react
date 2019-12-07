import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

// CKEditor Plugins
import { CloudinaryImageUploadAdapter } from 'ckeditor-cloudinary-uploader-adapter';
import CodeSnippet from 'ckeditor5-code-snippet-plugin/dist/codesnippet';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolBar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Table from '@ckeditor/ckeditor5-table/src/table';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

import config from '../../../config';

function imagePluginFactory(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new CloudinaryImageUploadAdapter(
    loader,
    'iyikuyoro',
    config.imageUploadPreset,
    [160, 500, 1000, 1052],
  );
}

export default function Editor(props) {
  const { body, handleBodyChange, disabled } = props;
  const editorConfig = {
    plugins: [
      Essentials, Bold, Italic, Link, Paragraph,
      CodeSnippet, FileRepository, Heading, List,
      Indent, Image, ImageUpload, BlockQuote, Table,
      ImageToolBar, ImageCaption, ImageStyle, ImageResize,
    ],
    image: {
      toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
      styles: ['full', 'alignLeft', 'alignRight'],
    },
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'insertTable', '|', 'indent', 'imageUpload', 'blockQuote', 'codeSnippet', '|', 'undo', 'redo'],
    styles: ['full', 'alignLeft', 'alignRight'],
    extraPlugins: [imagePluginFactory],
  };

  return (
    <CKEditor
      editor={BalloonEditor}
      data={body}
      onChange={handleBodyChange}
      config={editorConfig}
      disabled={disabled}
    />
  );
}

Editor.defaultProps = {
  body: '',
};

Editor.propTypes = {
  body: PropTypes.string,
  handleBodyChange: PropTypes.func,
  disabled: PropTypes.bool,
};

Editor.defaultProps = {
  disabled: false,
  handleBodyChange: () => {},
};
