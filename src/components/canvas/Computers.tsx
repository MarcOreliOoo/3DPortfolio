import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }: { isMobile: boolean }) => {
	const computer = useGLTF("./desktop_pc/scene.gltf");
	return (
		<mesh>
			<hemisphereLight intensity={0.15} groundColor="black" />
			<pointLight intensity={1} />
			<spotLight
				position={[-20, 50, 10]}
				angle={0.12}
				penumbra={1}
				intensity={1}
				castShadow
				shadow-mapSize={1024}
			/>
			<primitive
				object={computer.scene}
				scale={isMobile ? 0.7 : 0.75}
				position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
				rotation={[-0.01, -0.2, -0.1]}
			/>
		</mesh>
	);
};

const ComputersCanvas = () => {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		/** Event listener that get a change for a screen size  */
		const mediaQuery = window.matchMedia("(max-width: 500px)");

		/** Set the init value of isMobile */
		setIsMobile(mediaQuery.matches);

		/** Define a callback function that will handle the set when listen to a change to the media query  */
		const handleMediaQueryChange = (event: {
			matches: boolean | ((prevState: boolean) => boolean);
		}) => {
			setIsMobile(event.matches);
		};
		/** Add the callback function as a listener */
		mediaQuery.addEventListener("change", handleMediaQueryChange);

		/** Remove the listenner when it is unmounted*/
		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
		};
	}, []);

	return (
		<>
			{/* camera where we are lookin from 20x 3y 5z and fieldOfView = how wide we are looking from */}
			<Canvas
				frameloop="demand"
				shadows
				camera={{ position: [20, 3, 5], fov: 25 }}
				gl={{ preserveDrawingBuffer: true }}
			>
				{/* Suspense block from react allows us to have a loader while the model is loading. OrbitControls from left to right, and not zoom in, just scroll for the next page
				fallback={<CanvasLoader />}
				*/}
				<Suspense>
					<OrbitControls
						enableZoom={false}
						maxPolarAngle={Math.PI / 2}
						minPolarAngle={Math.PI / 2}
					/>
					<Computers isMobile={isMobile} />
				</Suspense>
				<Preload all />
			</Canvas>
		</>
	);
};
export default ComputersCanvas;
