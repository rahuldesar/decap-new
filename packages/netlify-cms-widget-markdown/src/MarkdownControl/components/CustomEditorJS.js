/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import CustomDebbugger from './CustomDebugger';
import { EDITOR_JS_TOOLS } from '../helpers/tools';

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: 'paragraph',
        data: {
          text: 'This is my awesome editor!',
          level: 1,
        },
      },
    ],
  };
};

const CustomEditorJS = ({ value }) => {
  const ReactEditorJS = createReactEditorJS();

  const [data, setData] = useState(DEFAULT_INITIAL_DATA);
  const editorCore = useRef(null);
  let mdData = [];

  const handleInitialize = useCallback(instance => {
    editorCore.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.dangerouslyLowLevelInstance?.save();
    setData(savedData);
  }, []);

  const renderMD = editorJSOutput => {
    if (!editorJSOutput) {
      return null;
    }
    let temp = [];
    for (let i = 0; i < editorJSOutput.blocks.length; i++) {
      const block = editorJSOutput.blocks[i];
      const convertedMDX = blockToMDX(block);

      console.log('convertedMDX', convertedMDX);
      temp.push(convertedMDX);
    }
    mdData = [...temp];
  };

  function blockToMDX(block) {
    console.log('Generating MDX based on type', block);
    switch (block.type) {
      case 'paragraph':
        return `${block.data.text}\n\n`;
      case 'header':
        const level = block.data.level;
        return `${'#'.repeat(level)} ${block.data.text}\n\n`;
      case 'list':
        let items = '';
        if (block.data.style === 'ordered') {
          let index = 1;
          block.data.items.forEach((item, index) => {
            items += `${index + 1}. ${item}\n`;
          });
        } else {
          block.data.items.forEach((item, index) => {
            items += `- ${item}\n`;
          });
        }
        return `${items}\n`;
      default:
        return '';
    }
  }

  useEffect(() => {
    console.log('================== UPDATED ==================');
    console.log('Data from Editor: ', data);
    renderMD(data);
    console.log('Final MdData Array:', mdData);
  }, [data]);

  return (
    <>
      <ReactEditorJS
        onInitialize={handleInitialize}
        holder="custom"
        defaultValue={data}
        tools={EDITOR_JS_TOOLS}
        onChange={handleSave}
      >
        <div id="custom" />
      </ReactEditorJS>

      {/* <CustomDebbugger value={value} /> */}
    </>
  );
};

export default CustomEditorJS;
