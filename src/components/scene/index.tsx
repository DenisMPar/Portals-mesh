import { CameraControls, Text, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { BackSide, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { World } from "../worlds";
export function Scene() {
  const [active, setActive] = useState<string | null>(null);
  const cameraRef = useRef<CameraControls | null>(null);
  const scene = useThree((state) => state.scene);
  const map = useTexture("/laboratory.jpg");
  useEffect(() => {
    if (!cameraRef.current) return;
    if (active) {
      const targetPos = new Vector3();
      scene.getObjectByName(active)?.getWorldPosition(targetPos);
      cameraRef.current.setLookAt(
        0,
        0,
        0,
        targetPos.x,
        targetPos.y,
        targetPos.z,
        true
      );
    } else {
      cameraRef.current.setLookAt(0, 0, 1, 1, 0, 0, true);
    }
  }, [active]);
  return (
    <>
      <mesh>
        <sphereGeometry args={[5, 50, 50]} />
        <meshStandardMaterial map={map} side={BackSide} />
        <ambientLight intensity={2} />
        <CameraControls
          ref={cameraRef}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Text
          fontSize={0.3}
          color={"red"}
          position={[2.2, 1.9, -2.3]}
          rotation={[0, -0.8, 0]}
        >
          Click and hold, then move the mouse to rotate.
        </Text>
        <Text
          fontSize={0.3}
          color={"red"}
          position={[2.2, 1.4, -2.3]}
          rotation={[0, -0.8, 0]}
        >
          Double click on the portal to travel.
        </Text>
        <World
          active={active}
          setActive={setActive}
          name="suburb"
          texture="/suburb.jpg"
          position-x={3}
          position-z={-1}
          rotation-y={degToRad(100)}
        />
        <World
          active={active}
          setActive={setActive}
          name="jungle"
          texture="/jungle.jpg"
          position-x={1}
          position-z={-3}
          rotation-y={degToRad(180)}
        />
      </mesh>
    </>
  );
}
