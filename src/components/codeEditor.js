// frontend/src/components/CodeEditor.js
import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { io } from "socket.io-client";


const socket = io("http://localhost:5000");


const CodeEditor = () => {
  const editorRef = useRef(null);
  const ydoc = useRef(new Y.Doc()).current;
  const yText = useRef(ydoc.getText("code")).current;
  const docId = "default-doc"; // In a full app, this could be dynamic per project

  useEffect(() => {
    socket.emit("join-document", docId);
  
    socket.on("document-update", (update) => {
      console.log("Received update, length:", update.byteLength);
      try {
        Y.applyUpdate(ydoc, update);
      } catch (error) {
        console.error("Failed to apply update:", error);
      }
    });
  
    ydoc.on("update", (update) => {
      console.log("Sending update, length:", update.byteLength);
      socket.emit("send-update", docId, update);
    });
  
    return () => {
      socket.off("document-update");
    };
  }, [docId, ydoc]);
  

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    new MonacoBinding(yText, editor.getModel(), new Set([editor]), null);
  };

  return (
    <div style={{ height: "90vh" }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
