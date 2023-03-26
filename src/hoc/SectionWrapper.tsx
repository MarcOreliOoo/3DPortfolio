import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const SectionWrapper = (Component: JSX.Element, idName: string) =>
	function HOC() {
		return (
			<motion.section>
				<Component key={idName} />
			</motion.section>
		);
	};

export default SectionWrapper;
