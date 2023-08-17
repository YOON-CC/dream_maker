'use client'

import styles from './page.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';


const Editor = () => {
  const canvasRef = useRef(null);
  const [objectCoordinates, setObjectCoordinates] = useState({ x: 0, y: 0 });


  useEffect(() => { 
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);

      canvas.on('object:moving', (e) => {
        const activeObject = e.target as fabric.Object;
        
        if (activeObject.left !== undefined && activeObject.top !== undefined) {
          setObjectCoordinates({ x: activeObject.left, y: activeObject.top });
        }
      });

      const handleAddRect = () => {
        const newRect = new fabric.Rect({
          left: Math.random() * 400,
          top: Math.random() * 400,
          width: 100,
          height: 100,
          fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
        });

        canvas.add(newRect);
      };

      const handleAddCircle = () => {
        const newCircle = new fabric.Circle({
          left: Math.random() * 400,
          top: Math.random() * 400,
          radius: 50,
          fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
        });

        canvas.add(newCircle);
      };

      const handleAddTriangle = () => {
        const newTriangle = new fabric.Triangle({
          left: Math.random() * 400,
          top: Math.random() * 400,
          width: 100,
          height: 100,
          fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
        });

        canvas.add(newTriangle);
      };

      const handleChangeColor = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          const newColor = prompt('Enter RGB color (e.g. "255, 0, 0"):');
          if (newColor) {
            activeObject.set('fill', `rgb(${newColor})`);
            canvas.renderAll();
          }
        }
      };
      const handleAddTextbox = () => {
        const newTextbox = new fabric.Textbox('Enter your text', {
          left: Math.random() * 400,
          top: Math.random() * 400,
          width: 150,
          fontSize: 20,
          fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
          editable: true, 
        });

        canvas.add(newTextbox);
        canvas.setActiveObject(newTextbox); 
        canvas.renderAll(); 
      };
      const handleDeleteSelectedObjects = () => {
        const selectedObjects = canvas.getActiveObjects();
        if (selectedObjects.length > 0) {
          selectedObjects.forEach(object => {
            canvas.remove(object);
          });
          canvas.discardActiveObject(); 
          canvas.renderAll(); 
        }
      };

      const handleKeyboardDelete = (event: KeyboardEvent) => {
        if (event.key === 'Delete') {
          handleDeleteSelectedObjects();
        }
      };
      const handleSendBackwards = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.sendBackwards(activeObject);
        }
      };

      const handleBringForward = () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.bringForward(activeObject);
        }
      };

      const handleAddImageShape = () => {
        const imageUrl = prompt('Enter image URL:');
        if (imageUrl) {
          fabric.Image.fromURL(imageUrl, (img) => {
            img.set({
              left: Math.random() * 400,
              top: Math.random() * 400,
            });

            canvas.add(img);
          });
        }
      };
   

      document.addEventListener('keydown', handleKeyboardDelete);

      const addButton = document.getElementById('add-button');
      addButton?.addEventListener('click', handleAddRect);

      const addCircleButton = document.getElementById('add-circle-button');
      addCircleButton?.addEventListener('click', handleAddCircle);

      const addTriangleButton = document.getElementById('add-triangle-button');
      addTriangleButton?.addEventListener('click', handleAddTriangle);

      const changeColorButton = document.getElementById('change-color-button');
      changeColorButton?.addEventListener('click', handleChangeColor);

      const addTextboxButton = document.getElementById('add-textbox-button');
      addTextboxButton?.addEventListener('click', handleAddTextbox);

      const deleteButton = document.getElementById('delete-button');
      deleteButton?.addEventListener('click', handleDeleteSelectedObjects);

      const sendBackwardsButton = document.getElementById('send-backwards-button');
      sendBackwardsButton?.addEventListener('click', handleSendBackwards);

      const bringForwardButton = document.getElementById('bring-forward-button');
      bringForwardButton?.addEventListener('click', handleBringForward);

      const addImageShapeButton = document.getElementById('add-image-shape-button');
      addImageShapeButton?.addEventListener('click', handleAddImageShape);

      return () => {
        canvas.off('object:moving');
        addImageShapeButton?.removeEventListener('click', handleAddImageShape);

        document.removeEventListener('keydown', handleKeyboardDelete);
        addButton?.removeEventListener('click', handleAddRect);
        addCircleButton?.removeEventListener('click', handleAddCircle);
        addTriangleButton?.removeEventListener('click', handleAddTriangle);
        changeColorButton?.removeEventListener('click', handleChangeColor);
        addTextboxButton?.removeEventListener('click', handleAddTextbox);
        deleteButton?.removeEventListener('click', handleDeleteSelectedObjects);
        sendBackwardsButton?.removeEventListener('click', handleSendBackwards);
        bringForwardButton?.removeEventListener('click', handleBringForward);
      };
    }
  }, []);

  return (
    <div className={styles['editor_body']}>
      <div className={styles['tool_container_left']}>

      </div>
      <div className={styles['canvas_container']}>
        <canvas ref={canvasRef} width={1000} height={500}></canvas>
        <button id="add-button">Add Rectangle</button>
        <button id="add-circle-button">Add Circle</button>
        <button id="add-triangle-button">Add Triangle</button>
        <button id="change-color-button">Change Color</button>
        <button id="add-textbox-button">Add Textbox</button>
        <button id="delete-button">Delete Selected Objects</button>
        <button id="send-backwards-button">Send Backwards</button>
        <button id="bring-forward-button">Bring Forward</button>
        <button id="add-image-shape-button">Add Image Shape</button>

        <p>Object Coordinates: X: {objectCoordinates.x.toFixed(2)}, Y: {objectCoordinates.y.toFixed(2)}</p>
      </div>
      <div className={styles['tool_container_right']}></div>
    </div>
  );
};

export default Editor;