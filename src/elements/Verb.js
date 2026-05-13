import { useState } from "react"
import AddElementModal from "../AddElementModal"
import "../App.css"
import useElementsStore from "../useElementsStore"

export default function Verb({ text, onClickSelf }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [lastChar, setLastChar] = useState(text.at(-1))
	const allElements = useElementsStore((state) => state)
	const godanConjugations = allElements.godanConjugations
	const ichidanConjugations = { ichidanConjugations: allElements.ichidanConjugations }
	const isIchidan = false
	const stem = text.slice(0, -1)

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elements={isIchidan ? ichidanConjugations : godanConjugations}
				onSelect={(element) => setLastChar(element.text)}
			/>
			<div className="baseElement verbElement">
				<div className="elementText" onClick={onClickSelf}>
					{stem}
				</div>
				<div className="baseInsideElement verbLastChar" onClick={() => setIsModalOpen(true)}>
					{lastChar}
				</div>
			</div>
		</div>
	)
}
