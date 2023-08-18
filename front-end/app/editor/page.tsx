'use client'

import styles from './page.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';


const Editor = () => {
  const canvasRef = useRef(null);
  const [objectCoordinates, setObjectCoordinates] = useState({ x: 0, y: 0 });
  const [objectSize, setObjectSize] = useState({ width: 0, height: 0 });


  useEffect(() => { 
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);

      
      canvas.on('object:scaling', (e) => {
        const activeObject = e.target as fabric.Rect;
      
        if (activeObject instanceof fabric.Rect) {
          const scaleX = activeObject.scaleX ?? 1;
          const scaleY = activeObject.scaleY ?? 1;
          const width = activeObject.width ?? 0;
          const height = activeObject.height ?? 0;
          const left = activeObject.left ?? 0;
          const top = activeObject.top ?? 0;
      
          activeObject.set({
            width: width * scaleX,
            height: height * scaleY,
            scaleX: 1,
            scaleY: 1
          });


      
          setObjectCoordinates({ x: left, y: top });
          setObjectSize({ width, height });
      
          canvas.renderAll();
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
              left: Math.random() * 200,
              top: Math.random() * 200,
            });

            canvas.add(img);
          });
        }
      };
   
      const handleChangeRadiusInput = () => {
        const borderRadiusInput = prompt('Enter border-radius value:');
        const borderRadius = borderRadiusInput !== null ? parseFloat(borderRadiusInput) : 0;
      
        const activeObject = canvas.getActiveObject();
        if (activeObject instanceof fabric.Rect) {
          const scaleX = activeObject.scaleX ?? 1;
          const scaleY = activeObject.scaleY ?? 1;
      
          const scaledWidth = activeObject.getScaledWidth();
          const scaledHeight = activeObject.getScaledHeight();

          console.log("맞아?", scaledWidth)
          const newRx = Math.min(borderRadius * scaleX, scaledWidth / 2);
          const newRy = Math.min(borderRadius * scaleY, scaledHeight / 2);

          console.log("최종 rx, ry", newRx,)
          activeObject.set('rx', newRx);
          activeObject.set('ry', newRy);
          canvas.renderAll();
        }
      };
      const changeRadiusInputButton = document.getElementById('change-radius-input-button');
      changeRadiusInputButton?.addEventListener('click', handleChangeRadiusInput);
    

      
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
        // changeRadiusIncreaseButton?.removeEventListener('click', () => handleChangeRadius(true));
        // changeRadiusDecreaseButton?.removeEventListener('click', () => handleChangeRadius(false));

        
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
        <button id="change-radius-input-button">Change Radius (Input)</button>
        <p>Object Coordinates: X: {objectCoordinates.x.toFixed(2)}, Y: {objectCoordinates.y.toFixed(2)}</p>
        <p>Object size: Width: {objectSize.width.toFixed(2)}, Object size : : {objectSize.height.toFixed(2)}</p>

      </div>
      <div className={styles['tool_container_right']}></div>
    </div>
  );
};

export default Editor;