// src/components/QuillEditor.jsx

import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ content, setContent }) => {
    const handleEditorChange = (content, delta, source, editor) => {
        setContent(content);
    };

    return (
        <ReactQuill
            value={content}
            onChange={handleEditorChange}
            modules={{
                toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' },
                    { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image', 'video'],
                    ['clean']
                ],
            }}
            formats={[
                'header', 'font', 'size',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image', 'video'
            ]}
            theme="snow"
        />
    );
};

export default QuillEditor;
