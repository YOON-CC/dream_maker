'use client'
import Image from 'next/image';
import styles from './page.module.scss'; 
import React, { useEffect, useState, useRef  } from 'react';
import Konva from 'konva';''



const KonvaDemo: React.FC = () => {
  const stageRef = useRef<Konva.Stage | null>(null);
  const layerRef = useRef<Konva.Layer | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);
  const selectionRectangleRef = useRef<Konva.Rect | null>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const stage = new Konva.Stage({
      container: 'container',
      width: 1000,
      height: 500,
    });
    stageRef.current = stage;

    const layer = new Konva.Layer();
    stage.add(layer);
    layerRef.current = layer;

    const tr = new Konva.Transformer();
    layer.add(tr);
    trRef.current = tr;

    const selectionRectangle = new Konva.Rect({
      fill: 'rgba(0,0,255,0.5)',
      visible: false,
    });
    layer.add(selectionRectangle);
    selectionRectangleRef.current = selectionRectangle;

    let x1: number, y1: number, x2: number, y2: number;

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (e.target !== stageRef.current) {
        return;
      }
      e.evt.preventDefault();
      x1 = stageRef.current?.getPointerPosition()?.x || 0;
      y1 = stageRef.current?.getPointerPosition()?.y || 0;
      x2 = stageRef.current?.getPointerPosition()?.x || 0;
      y2 = stageRef.current?.getPointerPosition()?.y || 0;

      selectionRectangleRef.current?.visible(true);
      selectionRectangleRef.current?.width(0);
      selectionRectangleRef.current?.height(0);
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (!selectionRectangleRef.current?.visible()) {
        return;
      }
      e.evt.preventDefault();
      x2 = stageRef.current?.getPointerPosition()?.x || 0;
      y2 = stageRef.current?.getPointerPosition()?.y || 0;

      selectionRectangleRef.current?.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
      });
    };

    const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (!selectionRectangleRef.current?.visible()) {
        return;
      }
      e.evt.preventDefault();
      setTimeout(() => {
        selectionRectangleRef.current?.visible(false);
      });

      const shapes = layerRef.current?.find('.rect') as Konva.Shape[];
      const box = selectionRectangleRef.current?.getClientRect();
      const selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );
      trRef.current?.nodes(selected);
    };

    const handleClick = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (selectionRectangleRef.current?.visible()) {
        return;
      }

      if (e.target === stageRef.current) {
        trRef.current?.nodes([]);
        return;
      }

      const target = e.target as Konva.Node;
      if (!target.hasName('rect')) {
        return;
      }

      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
      const isSelected = trRef.current?.nodes().indexOf(target) ?? -1;

      if (!metaPressed && isSelected === -1) {
        trRef.current?.nodes([target]);
      } else if (metaPressed && isSelected >= 0) {
        const nodes = trRef.current?.nodes().slice() ?? [];
        nodes.splice(nodes.indexOf(target), 1);
        trRef.current?.nodes(nodes);
      } else if (metaPressed && isSelected === -1) {
        const nodes = trRef.current?.nodes().concat([target]) ?? [];
        trRef.current?.nodes(nodes);
      }
    };

    stageRef.current?.on('mousedown touchstart', handleMouseDown);
    stageRef.current?.on('mousemove touchmove', handleMouseMove);
    stageRef.current?.on('mouseup touchend', handleMouseUp);
    stageRef.current?.on('click tap', handleClick);
  }, []);

  const handleAddRect = () => {
    const newRect = new Konva.Rect({
      x: Math.random() * 800,
      y: Math.random() * 400,
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
      draggable: true,
      name: 'rect',
    });

    layerRef.current?.add(newRect);
    layerRef.current?.batchDraw();
  };

  const handleAddCircle = () => {
    const newCircle = new Konva.Circle({
      x: Math.random() * 800,
      y: Math.random() * 400,
      radius: Math.random() * 50 + 25,
      fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
      draggable: true,
      name: 'rect',
    });

    layerRef.current?.add(newCircle);
    layerRef.current?.batchDraw();
  };

  const handleAddTriangle = () => {
    const newTriangle = new Konva.RegularPolygon({
      x: Math.random() * 800,
      y: Math.random() * 400,
      sides: 3,
      radius: Math.random() * 50 + 25,
      fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
      draggable: true,
      name: 'rect',
    });

    layerRef.current?.add(newTriangle);
    layerRef.current?.batchDraw();
  };

  return (
    <div>
      <button onClick={handleAddRect}>Add Rectangle</button>
      <button onClick={handleAddCircle}>Add Circle</button>
      <button onClick={handleAddTriangle}>Add Triangle</button>
      <div id="container"></div>
    </div>
  );
};



const Editor = () => {
    return (
        <div className={styles['editor_body']}>
            <div className={styles['tool_container_left']}>
                <div className={styles['tool_container_left_menu']}>
                    <div className={styles['tool_container_left_menu_flex']}></div>
                    <div className={styles['tool_container_left_menu_flex']}></div>
                    <div className={styles['tool_container_left_menu_flex']}></div>
                    <div className={styles['tool_container_left_menu_flex']}></div>
                    <div className={styles['tool_container_left_menu_flex']}></div>
                </div>
            </div>
            <div className={styles['canvas_container']}>
                <KonvaDemo></KonvaDemo>
            </div>
            <div className={styles['tool_container_right']}></div>
        </div>
    );
}

export default Editor;