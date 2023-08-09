import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Editor.css"

const Editor = ({quilValue, setQuilValue }) => {
    var toolbarOptions = [['bold', 'italic', 'strike'], ['link'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['blockquote'],['code-block']];
    const modules = {
        toolbar: toolbarOptions
    }


    return (
        <div>
            <ReactQuill placeholder='Text goes here' theme="snow" modules={modules} value={quilValue} onChange={setQuilValue} />
        </div>
    )
}

export default Editor
