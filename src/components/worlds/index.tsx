/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, MeshPortalMaterial, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { Dispatch, SetStateAction, useRef } from "react";
import { BackSide, DoubleSide, Group } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
interface OptionalGroup extends Partial<Group> {}

type Props = {
  texture: string;
  active: string | null;
  name: string;
  setActive: Dispatch<SetStateAction<string | null>>;
  group?: OptionalGroup; // Use the OptionalGroup interface here
};

export function World({ texture, active, setActive, name, ...props }: Props) {
  const map = useTexture(texture);
  const portalRef = useRef(null);
  const boxRef = useRef<any>();
  const mapLab = useTexture("/laboratory.jpg");
  useFrame((_state, delta) => {
    const worldActive = active === name;
    if (portalRef.current) {
      easing.damp(portalRef.current, "blend", worldActive ? 1 : 0, 0.2, delta);
    }
  });

  return (
    <group {...props}>
      <Box
        ref={boxRef}
        name={name}
        args={[1, 2, 0.2]}
        onDoubleClick={() => setActive(active === name ? null : name)}
      >
        <MeshPortalMaterial ref={portalRef} side={DoubleSide}>
          <ambientLight intensity={2} />
          <mesh>
            <sphereGeometry args={[5, 50, 50]} />
            <meshStandardMaterial map={map} side={BackSide} />
          </mesh>

          <Box
            position={[2, 0, 0]}
            onDoubleClick={() => setActive(active === name ? null : name)}
            args={[1, 2, 0.2]}
            rotation-y={degToRad(50)}
          >
            {/* <Edges color={"red"} /> */}
            <MeshPortalMaterial>
              <ambientLight intensity={2} />
              <mesh>
                <sphereGeometry args={[5, 50, 50]} />
                <meshStandardMaterial map={mapLab} side={BackSide} />
              </mesh>
            </MeshPortalMaterial>
          </Box>
        </MeshPortalMaterial>
      </Box>
    </group>
  );
}
