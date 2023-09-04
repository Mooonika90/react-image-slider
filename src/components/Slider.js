import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SlidesData } from '../data/SlidesData';
const TIMEOUT = 2000;

function Slider() {
	const [slideIndex, setSlideIndex] = useState(0);
	const [slideShow, setSlideShow] = useState(false);

	useEffect(() => {
		let intervalId;

		if (slideShow) {
			intervalId = setInterval(() => {
				setSlideIndex((slideIndex) => (slideIndex + 1) % SlidesData.length);
			}, TIMEOUT);
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [slideShow, slideIndex]);

	const ControlButtons = () => {
		return (
			<div className='control-btns'>
				<button
					onClick={() =>
						setSlideIndex(
							(prevIndex) =>
								(prevIndex - 1 + SlidesData.length) % SlidesData.length
						)
					}>
					Prev
				</button>
				<button
					onClick={() =>
						setSlideIndex((prevIndex) => (prevIndex + 1) % SlidesData.length)
					}>
					Next
				</button>
				<button onClick={() => setSlideShow(true)}>Start</button>
				<button onClick={() => setSlideShow(false)}>Stop</button>
			</div>
		);
	};
	return (
		<section>
			<h1>React Slider Component</h1>
			<article>
				<AnimatePresence>
					<motion.article
						className='slide'
						key={slideIndex}
						initial={{ x: 200, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: -200, opacity: 0 }}
						transition={{ duration: 1 }}>
						<h2>{SlidesData[slideIndex].title}</h2>
						<img
							src={SlidesData[slideIndex].imageUrl}
							alt={SlidesData[slideIndex].title}
						/>
					</motion.article>
				</AnimatePresence>
			</article>
			<ControlButtons />
		</section>
	);
}

export default Slider;
