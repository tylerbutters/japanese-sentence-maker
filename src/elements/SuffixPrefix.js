import { useState } from "react"
import "../App.css"
import AddButton from "../AddButton"
import AddElementModal from "../AddElementModal"

export default function SuffixPrefix({ elements, text, replaceElement }) {
	const [isModalOpen, setIsModalOpen] = useState()

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elements={elements}
				onSelect={replaceElement}
			/>
			<div className="baseInsideElement suffixPrefixElement" onClick={() => setIsModalOpen(true)}>
				<div className="insideElementText">{text}</div>
			</div>
		</div>
	)
}
