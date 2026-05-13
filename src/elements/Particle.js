import { useState } from "react"
import AddElementModal from "../AddElementModal"
import "../App.css"
import useElementsStore from "../useElementsStore"

export default function Particle({ text }) {
	const [isModalOpen, setIsModalOpen] = useState()
	const allElements = useElementsStore((state) => state)
	const particles = { particles: allElements.particles }

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elements={particles}
				// onSelect={replaceElement}
				isElement={true}
			/>
			<div className="baseInsideElement particleElement" onClick={() => setIsModalOpen(true)}>
				<div className=" elementText">{text}</div>
			</div>
		</div>
	)
}
