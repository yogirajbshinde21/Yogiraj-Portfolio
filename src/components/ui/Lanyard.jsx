/* eslint-disable react/no-unknown-property */
'use client';
import React, { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { useTheme, useThemeActions } from '../../context/ThemeContext';

// Asset imports
import cardGLB from '../../assets/lanyard/card.glb';
import lanyard from '../../assets/lanyard/lanyard.png';
// Using different profile images based on theme for better visual consistency
const profilePicDark = '/og-image.png';
const profilePicLight = '/og-yogiraj-light-theme.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// ... [Keep createRoundedRectGeometry helper exactly as is] ...
function createRoundedRectGeometry(width, height, radius) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  
  const geometry = new THREE.ShapeGeometry(shape);
  const pos = geometry.attributes.position;
  const uvs = [];
  for (let i = 0; i < pos.count; i++) {
    const px = pos.getX(i);
    const py = pos.getY(i);
    uvs.push((px + width / 2) / width, (py + height / 2) / height);
  }
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  
  return geometry;
}

// Create a rounded border frame geometry (ring shape)
function createRoundedBorderGeometry(width, height, radius, borderWidth) {
  // Outer shape
  const outerShape = new THREE.Shape();
  const ox = -width / 2;
  const oy = -height / 2;
  
  outerShape.moveTo(ox + radius, oy);
  outerShape.lineTo(ox + width - radius, oy);
  outerShape.quadraticCurveTo(ox + width, oy, ox + width, oy + radius);
  outerShape.lineTo(ox + width, oy + height - radius);
  outerShape.quadraticCurveTo(ox + width, oy + height, ox + width - radius, oy + height);
  outerShape.lineTo(ox + radius, oy + height);
  outerShape.quadraticCurveTo(ox, oy + height, ox, oy + height - radius);
  outerShape.lineTo(ox, oy + radius);
  outerShape.quadraticCurveTo(ox, oy, ox + radius, oy);
  
  // Inner hole (slightly smaller)
  const innerWidth = width - borderWidth * 2;
  const innerHeight = height - borderWidth * 2;
  const innerRadius = Math.max(radius - borderWidth, 0.01);
  const ix = -innerWidth / 2;
  const iy = -innerHeight / 2;
  
  const holePath = new THREE.Path();
  holePath.moveTo(ix + innerRadius, iy);
  holePath.lineTo(ix + innerWidth - innerRadius, iy);
  holePath.quadraticCurveTo(ix + innerWidth, iy, ix + innerWidth, iy + innerRadius);
  holePath.lineTo(ix + innerWidth, iy + innerHeight - innerRadius);
  holePath.quadraticCurveTo(ix + innerWidth, iy + innerHeight, ix + innerWidth - innerRadius, iy + innerHeight);
  holePath.lineTo(ix + innerRadius, iy + innerHeight);
  holePath.quadraticCurveTo(ix, iy + innerHeight, ix, iy + innerHeight - innerRadius);
  holePath.lineTo(ix, iy + innerRadius);
  holePath.quadraticCurveTo(ix, iy, ix + innerRadius, iy);
  
  outerShape.holes.push(holePath);
  
  return new THREE.ShapeGeometry(outerShape);
}

const Lanyard = memo(function Lanyard({ 
  position, 
  gravity, 
  fov, 
  transparent = true,
  isMobile = false,
  onDrag = null 
}) {
  const [loaded, setLoaded] = useState(false);
  const wrapperRef = useRef(null);

  const defaultPosition = isMobile ? [0, 0, 12] : [0, 0, 9];
  const defaultFov = isMobile ? 26 : 30;
  const defaultGravity = [0, -25, 0];

  const actualPosition = position || defaultPosition;
  const actualFov = fov || defaultFov;
  const actualGravity = gravity || defaultGravity;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={wrapperRef}
      className={`lanyard-wrapper ${loaded ? 'loaded' : ''}`}
      // PERFORMANCE FIX: Isolate layout to prevent global theme changes from causing lag here
      style={{ contain: 'layout paint style' }}
    >
      <Canvas
        camera={{ position: actualPosition, fov: actualFov }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ alpha: transparent }}
        frameloop="always"
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={actualGravity} timeStep={1 / 60} interpolate={true}>
          <Band isMobile={isMobile} position={position} onDrag={onDrag} />
        </Physics>
        <Environment blur={0.75}>
          {/* ... [Keep Lightformers exactly as is] ... */}
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
});

function Band({ maxSpeed = 35, minSpeed = 5, isMobile = false, onDrag = null }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: false, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyard);
  const { theme } = useTheme();
  const { toggleTheme } = useThemeActions();
  
  // Load both profile textures upfront for smooth crossfade transition
  const profileTextureDark = useTexture(profilePicDark);
  const profileTextureLight = useTexture(profilePicLight);
  
  // Refs for smooth opacity crossfade animation
  const frontMeshDarkRef = useRef();
  const frontMeshLightRef = useRef();
  const targetOpacity = useRef({ dark: 1, light: 0 });
  const currentOpacity = useRef({ dark: 1, light: 0 });
  
  // Configure both profile textures for proper scaling without stretching
  // Card geometry: 0.85 width x 0.95 height
  useMemo(() => {
    const cardWidth = 0.85;
    const cardHeight = 0.95;
    const cardAspect = cardWidth / cardHeight; // ~0.89 (portrait card)
    
    [profileTextureDark, profileTextureLight].forEach((profileTexture) => {
      // Get actual image dimensions from the loaded texture
      const imgWidth = profileTexture.image?.width || 1;
      const imgHeight = profileTexture.image?.height || 1;
      const imageAspect = imgWidth / imgHeight;
      
      profileTexture.flipY = true;
      profileTexture.center.set(0.5, 0.5);
      profileTexture.rotation = 0;
      
      // Object-fit: cover - scale to fill card while maintaining aspect ratio
      let repeatX, repeatY;
      if (imageAspect > cardAspect) {
        // Image is wider - fit by height, crop width
        repeatX = cardAspect / imageAspect;
        repeatY = 1;
      } else {
        // Image is taller - fit by width, crop height
        repeatX = 1;
        repeatY = imageAspect / cardAspect;
      }
      
      profileTexture.repeat.set(repeatX, repeatY);
      // Center the cropped area, with adjustments to center face properly
      profileTexture.offset.set(
        (1 - repeatX) / 2 - 0.04, // Shift right to center face
        (1 - repeatY) / 2 + 0.02
      );
      profileTexture.wrapS = profileTexture.wrapT = THREE.ClampToEdgeWrapping;
      profileTexture.needsUpdate = true;
    });
  }, [profileTextureDark, profileTextureLight]);
  
  // Update target opacity when theme changes
  useEffect(() => {
    if (theme === 'light') {
      targetOpacity.current = { dark: 0, light: 1 };
    } else {
      targetOpacity.current = { dark: 1, light: 0 };
    }
  }, [theme]);
  
  const roundedCardGeometry = useMemo(() => createRoundedRectGeometry(0.85, 0.95, 0.06), []);
  const borderFrameGeometry = useMemo(() => createRoundedBorderGeometry(0.87, 0.97, 0.065, 0.025), []);
  
  // Theme-aware border color
  const borderColor = theme === 'light' ? '#8B7355' : '#C0C0C0';
  
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [dragStartY, setDragStartY] = useState(null);
  const [hasTriggeredTheme, setHasTriggeredTheme] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  const pendingThemeToggle = useRef(false);

  useFrame((state, delta) => {
    const smoothDelta = Math.min(delta, 0.05);
    
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      
      if (dragStartY !== null && !hasTriggeredTheme) {
        const currentY = state.pointer.y;
        const dragDistance = dragStartY - currentY;
        if (dragDistance > 0.3) {
          pendingThemeToggle.current = true;
          setHasTriggeredTheme(true);
        }
      }
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const distance = ref.current.lerped.distanceTo(ref.current.translation());
        const lerpFactor = Math.min(smoothDelta * (minSpeed + Math.pow(Math.min(distance, 1), 0.5) * (maxSpeed - minSpeed)) * 0.8, 0.3);
        ref.current.lerped.lerp(ref.current.translation(), lerpFactor);
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 24 : 48));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x * 0.98, y: ang.y - rot.y * 0.08, z: ang.z * 0.98 });
    }
    
    // Smooth crossfade animation for profile image transition
    const lerpSpeed = 4; // Adjust for faster/slower transition
    currentOpacity.current.dark += (targetOpacity.current.dark - currentOpacity.current.dark) * smoothDelta * lerpSpeed;
    currentOpacity.current.light += (targetOpacity.current.light - currentOpacity.current.light) * smoothDelta * lerpSpeed;
    
    // Update material opacity
    if (frontMeshDarkRef.current?.material) {
      frontMeshDarkRef.current.material.opacity = currentOpacity.current.dark;
      frontMeshDarkRef.current.material.transparent = true;
    }
    if (frontMeshLightRef.current?.material) {
      frontMeshLightRef.current.material.opacity = currentOpacity.current.light;
      frontMeshLightRef.current.material.transparent = true;
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[1.0, 1.05, 0.01]} />
          <group
            scale={2.4}
            position={[0, -1.2, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
              setDragStartY(null);
              if (pendingThemeToggle.current) {
                pendingThemeToggle.current = false;
                // FIX: Removed 50ms delay. Trigger immediately on next tick.
                setTimeout(() => toggleTheme(), 0);
              }
              setHasTriggeredTheme(false);
            }}
            onPointerDown={e => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
              setDragStartY(e.nativeEvent.offsetY / e.nativeEvent.target.clientHeight * 2 - 1);
              setHasTriggeredTheme(false);
              // Notify parent that drag started
              if (onDrag) onDrag();
            }}
          >
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
            {/* Dark theme profile image */}
            <mesh ref={frontMeshDarkRef} position={[0, 0.47, 0.005]} geometry={roundedCardGeometry}>
              <meshPhysicalMaterial 
                map={profileTextureDark} 
                color="#cccccc" 
                map-anisotropy={16} 
                clearcoat={isMobile ? 0 : 0.5} 
                clearcoatRoughness={0.15} 
                roughness={0.2} 
                metalness={0.05} 
                transparent={true}
                opacity={1}
                depthWrite={true}
              />
            </mesh>
            {/* Light theme profile image (overlaid for crossfade) */}
            <mesh ref={frontMeshLightRef} position={[0, 0.47, 0.0051]} geometry={roundedCardGeometry}>
              <meshPhysicalMaterial 
                map={profileTextureLight} 
                color="#cccccc" 
                map-anisotropy={16} 
                clearcoat={isMobile ? 0 : 0.5} 
                clearcoatRoughness={0.15} 
                roughness={0.2} 
                metalness={0.05} 
                transparent={true}
                opacity={0}
                depthWrite={false}
              />
            </mesh>
            {/* Front border frame */}
            <mesh position={[0, 0.47, 0.006]} geometry={borderFrameGeometry}>
              <meshPhysicalMaterial 
                color={borderColor} 
                metalness={0.7} 
                roughness={0.25} 
                clearcoat={isMobile ? 0 : 0.4} 
                clearcoatRoughness={0.1}
              />
            </mesh>
            <mesh position={[0, 0.47, -0.005]} rotation={[0, Math.PI, 0]} geometry={roundedCardGeometry}>
              <meshPhysicalMaterial color={theme === 'light' ? '#f5f0e8' : '#1a1a2e'} clearcoat={isMobile ? 0 : 0.3} clearcoatRoughness={0.2} roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Back border frame */}
            <mesh position={[0, 0.47, -0.006]} rotation={[0, Math.PI, 0]} geometry={borderFrameGeometry}>
              <meshPhysicalMaterial 
                color={borderColor} 
                metalness={0.7} 
                roughness={0.25} 
                clearcoat={isMobile ? 0 : 0.4} 
                clearcoatRoughness={0.1}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={isMobile ? [800, 1600] : [1000, 1000]} useMap map={texture} repeat={[-4, 1]} lineWidth={isMobile ? 0.8 : 1} />
      </mesh>
    </>
  );
}

export default Lanyard;