import { useEffect, useState } from 'react';
import { SlidesData } from '../data/SlidesData';
const TIMEOUT = 1000;

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
			<h2>Welcome in my slider</h2>
			<article>
				<h3>{SlidesData[slideIndex].title}</h3>
				<img
					src={SlidesData[slideIndex].imageUrl}
					alt={SlidesData[slideIndex].title}
				/>
			</article>
			<ControlButtons />
		</section>
	);
}

export default Slider;
