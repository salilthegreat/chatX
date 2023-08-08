import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Editor.css"

const Editor = ({ setQuilValue }) => {
    var toolbarOptions = [['bold', 'italic', 'strike'], ['link'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['blockquote'],['code-block']];
    const modules = {
        toolbar: toolbarOptions
    }
    const [value, setValue] = useState('');
    setQuilValue(value)


    return (
        <div>
            <ReactQuill placeholder='Text goes here' theme="snow" modules={modules} value={value} onChange={setValue} />
        </div>
    )
}

export default Editor
