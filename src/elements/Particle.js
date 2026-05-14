import { useState } from "react"
import AddElementModal from "../AddElementModal"
import "../App.css"
import useElementsStore from "../useElementsStore"

export default function Particle({ text, replaceElement }) {
	const [isModalOpen, setIsModalOpen] = useState()
	const allElements = useElementsStore((state) => state)
	const particleElements = { particle: allElements.particle }

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elements={particleElements}
				onSelect={replaceElement}
				isElement={true}
			/>
			<div className="baseInsideElement particleElement" onClick={() => setIsModalOpen(true)}>
				<div className="insideElementText">{text}</div>
			</div>
		</div>
	)
}
