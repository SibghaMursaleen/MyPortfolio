import React, { useRef, useEffect, useState } from 'react';
import './ThreeDInteractive.css';

export default function ThreeDInteractive({ isModalMode = false }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D parameters
  const particleCount = isModalMode ? 100 : 70;
  const nodesRef = useRef([]);
  const rotationXRef = useRef(0.003); // Drift speed around X
  const rotationYRef = useRef(0.005); // Drift speed around Y
  const currentAngleXRef = useRef(0);
  const currentAngleYRef = useRef(0);
  
  // Drag physics tracking
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.003, y: 0.005 });
  const mouseInCanvasRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Initialize particles in a 3D sphere
  const initializeSphere = (width, height) => {
    const radius = Math.min(width, height) * 0.38;
    const tempNodes = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Uniform distribution on sphere surface (Fibonacci spiral or random spherical)
      const theta = Math.acos(1 - 2 * (i / particleCount));
      const phi = Math.acos(0) * 4 * (i / particleCount) * Math.sqrt(particleCount);

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      tempNodes.push({
        x,
        y,
        z,
        // Base coordinate values for resetting
        ox: x,
        oy: y,
        oz: z,
        color: i % 3 === 0 ? 'rgba(99, 102, 241, ' : i % 3 === 1 ? 'rgba(6, 182, 212, ' : 'rgba(168, 85, 247, ' // Indigo, Cyan, Purple
      });
    }
    nodesRef.current = tempNodes;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize handler
    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Initialize sphere dimensions
      initializeSphere(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Setup Resize Observer for robust container tracking
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // 3D Perspective Projection Formulas
    // Center point
    const cx = () => canvas.width / 2;
    const cy = () => canvas.height / 2;
    const focalLength = 320;

    // Animation Loop
    const draw = () => {
      if (!canvas || !ctx) return;

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Decelerate velocities back to drift speeds if not dragging
      if (!isDraggingRef.current) {
        velocityRef.current.x += (rotationXRef.current - velocityRef.current.x) * 0.05;
        velocityRef.current.y += (rotationYRef.current - velocityRef.current.y) * 0.05;
        
        currentAngleXRef.current += velocityRef.current.x;
        currentAngleYRef.current += velocityRef.current.y;
      }

      const radX = currentAngleXRef.current;
      const radY = currentAngleYRef.current;

      const cosX = Math.cos(radX);
      const sinX = Math.sin(radX);
      const cosY = Math.cos(radY);
      const sinY = Math.sin(radY);

      // Rotate nodes and calculate projections
      const projectedNodes = nodesRef.current.map(node => {
        // Rotate around Y axis
        let x1 = node.ox * cosY - node.oz * sinY;
        let z1 = node.ox * sinY + node.oz * cosY;

        // Rotate around X axis
        let y2 = node.oy * cosX - z1 * sinX;
        let z2 = node.oy * sinX + z1 * cosX;

        // Apply perspective projection
        const scale = focalLength / (focalLength + z2);
        const projX = x1 * scale + cx();
        const projY = y2 * scale + cy();

        return {
          ...node,
          x3d: x1,
          y3d: y2,
          z3d: z2,
          x2d: projX,
          y2d: projY,
          scale: scale
        };
      });

      // Painter's algorithm: sort nodes by depth (z3d) descending
      // So nodes in the back are drawn first, and nodes in the front are drawn on top.
      projectedNodes.sort((a, b) => b.z3d - a.z3d);

      // Max distance for drawing connection lines
      const maxDistance = isModalMode ? 140 : 100;

      // Draw connection lines
      for (let i = 0; i < projectedNodes.length; i++) {
        const nodeA = projectedNodes[i];

        for (let j = i + 1; j < projectedNodes.length; j++) {
          const nodeB = projectedNodes[j];

          // Compute distance in 3D space
          const dx = nodeA.x3d - nodeB.x3d;
          const dy = nodeA.y3d - nodeB.y3d;
          const dz = nodeA.z3d - nodeB.z3d;
          const dist3d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3d < maxDistance) {
            // Compute opacity based on distance and average scale (depth)
            const distRatio = 1 - dist3d / maxDistance;
            const avgScale = (nodeA.scale + nodeB.scale) / 2;
            const lineOpacity = distRatio * 0.15 * Math.max(0.1, avgScale);

            ctx.beginPath();
            ctx.moveTo(nodeA.x2d, nodeA.y2d);
            ctx.lineTo(nodeB.x2d, nodeB.y2d);
            
            // Set gradient line between node colors or indigo/cyan blend
            const grad = ctx.createLinearGradient(nodeA.x2d, nodeA.y2d, nodeB.x2d, nodeB.y2d);
            grad.addColorStop(0, `${nodeA.color}${lineOpacity})`);
            grad.addColorStop(1, `${nodeB.color}${lineOpacity})`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8 * avgScale;
            ctx.stroke();
          }
        }
      }

      // Draw connection lines to mouse if mouse is inside the canvas
      if (mouseInCanvasRef.current) {
        projectedNodes.forEach(node => {
          const dx = node.x2d - mousePosRef.current.x;
          const dy = node.y2d - mousePosRef.current.y;
          const dist2d = Math.sqrt(dx * dx + dy * dy);

          if (dist2d < 120) {
            const opacity = (1 - dist2d / 120) * 0.25 * node.scale;
            ctx.beginPath();
            ctx.moveTo(node.x2d, node.y2d);
            ctx.lineTo(mousePosRef.current.x, mousePosRef.current.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5 * node.scale;
            ctx.stroke();
          }
        });
      }

      // Draw nodes
      projectedNodes.forEach(node => {
        const radius = Math.max(1, (isModalMode ? 4 : 3) * node.scale);
        const nodeOpacity = Math.max(0.15, 0.85 * node.scale);

        // Draw particle glow
        if (node.scale > 0.8) {
          ctx.beginPath();
          ctx.arc(node.x2d, node.y2d, radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${node.color}${nodeOpacity * 0.15})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x2d, node.y2d, radius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${nodeOpacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [particleCount, isModalMode]);

  // Drag interaction handlers
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    // Store mouse position relative to canvas
    mousePosRef.current = { x: mx, y: my };

    if (isDraggingRef.current) {
      const deltaX = e.clientX - prevMousePosRef.current.x;
      const deltaY = e.clientY - prevMousePosRef.current.y;

      // Adjust rotation angles dynamically based on drag distance
      currentAngleYRef.current += deltaX * 0.005;
      currentAngleXRef.current -= deltaY * 0.005;

      // Update dragging velocity for physics release
      velocityRef.current = {
        x: -deltaY * 0.001,
        y: deltaX * 0.001
      };

      prevMousePosRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    } else {
      // Mouse move hover parallax effect: add minor offset based on mouse position relative to center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const offX = (mx - centerX) / centerX;
      const offY = (my - centerY) / centerY;
      
      // Let it influence the rotation slightly
      rotationYRef.current = 0.005 + offX * 0.002;
      rotationXRef.current = 0.003 - offY * 0.002;
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseEnter = () => {
    mouseInCanvasRef.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseInCanvasRef.current = false;
    isDraggingRef.current = false;
    setIsHovered(false);
    // Reset drift speed values
    rotationXRef.current = 0.003;
    rotationYRef.current = 0.005;
  };

  return (
    <div 
      className={`threed-canvas-container ${isModalMode ? 'modal-3d' : ''} ${isHovered ? 'canvas-active' : ''}`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="threed-canvas"
      />
      <div className="threed-instructions">
        <span>{isDraggingRef.current ? 'Spinning...' : 'Drag to rotate • Hover to connect'}</span>
      </div>
    </div>
  );
}
