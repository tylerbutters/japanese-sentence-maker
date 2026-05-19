import { useEffect, useState } from "react"
import "../App.css"
import AddButton from "../AddButton"
import Particle from "../element attachments/Particle"
import Suffix from "../element attachments/Suffix"
import Prefix from "../element attachments/Prefix"
import useElementsStore from "../useElementsStore"
import dictionary from "../jmdict/processed-jmdict.json"
import AddElementModal from "../AddElementModal"

export default function Adverb({ mouse, element, onClickSelf, updateElement, elementOptions }) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	function initializeAdjective(newElement) {
		if (newElement.elementType === "verb" || newElement.adjectiveType === "i-type") {
			updateElement({
				...newElement,
				conjugation: {
					stem: newElement?.ending,
				},
			})
		} else {
			updateElement(newElement)
		}
	}

	return (
		<div className="baseElement nounElement">
			<div className="elementText" onClick={onClickSelf}>
				{element?.text}
			</div>
		</div>
	)
}
