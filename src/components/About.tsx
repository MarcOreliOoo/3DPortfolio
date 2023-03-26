import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

interface IServiceCard {
	index: number;
	title: string;
	icon: string;
}

const ServiceCard = ({ index, title, icon }: IServiceCard) => {
	return (
		<Tilt className="xs:w-[250px] w- full">
			<motion.div
				variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
				className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card "
			>
				<div
					options={{ max: 45, scale: 1, speed: 450 }}
					className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex flex-col items-center justify-evenly"
				>
					<img
						src={icon}
						alt={title}
						className="w-16 h-16 object-contain"
					/>
					<h3 className="font-bold text-white text-[20px] text-center">
						{title}
					</h3>
				</div>
			</motion.div>
		</Tilt>
	);
};

const About = () => {
	return (
		<>
			<motion.div variants={textVariant(5000)}>
				<p className={styles.sectionSubText}>Introduction</p>
				<h2 className={styles.sectionHeadText}>Overview</h2>
			</motion.div>
			<motion.p
				variants={fadeIn("", "", 0.1, 1)}
				className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
			>
				I'm a Blockchain Architect with hands on fullstack development.
				I have also a background in Business Intelligence. I've made a
				lot of projects with tech like NodeJs, React, Typescript,
				NextJs, NestJs and of course with all related blockchain stack:
				ethers.js, solidity, hardhat... I can create efficiently your
				Blockchain Dapps and bring you easily in the web3 world!
			</motion.p>
			<div className="mt-20 flex flex-wrap gap-10">
				{services.map((service, index) => (
					<ServiceCard
						key={service.title}
						index={index}
						{...service}
					/>
				))}
			</div>
		</>
	);
};

export default About;
