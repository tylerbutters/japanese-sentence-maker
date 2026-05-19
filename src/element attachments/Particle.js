import { useState } from "react"
import AddElementModal from "../AddElementModal"
import "../App.css"

export default function Particle({ element, elementOptions, updateElement, deleteElement }) {
	const [isModalOpen, setIsModalOpen] = useState()

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elementOptions={elementOptions}
				onSelect={updateElement}
				deleteElement={() => deleteElement(element.elementType)}
				hasDelete={true}
			/>
			<div
				className="baseInsideElement"
				style={{ background: "#FF7794", marginLeft: 5 }}
				onClick={() => setIsModalOpen(true)}
			>
				{element.text}
			</div>
		</div>
	)
}
