import { useEffect, useState } from "react"
import "../App.css"
import AddButton from "../AddButton"
import Particle from "../element attachments/Particle"
import Suffix from "../element attachments/Suffix"
import Prefix from "../element attachments/Prefix"
import useElementsStore from "../useElementsStore"
import dictionary from "../jmdict/processed-jmdict.json"

export default function Noun({ mouse, element, onClickSelf, updateElement, secondaryColor }) {
	const [isOpen, setIsOpen] = useState(false)
	const allElements = useElementsStore((state) => state)

	function addElement(selectedElement) {
		// alert(JSON.stringify(selectedElement))
		switch (selectedElement?.elementType) {
			case "prefix":
				updateElement({ ...element, prefix: selectedElement })
				return
			case "suffix":
				updateElement({ ...element, suffix: selectedElement })
				return
		}
	}

	return (
		<div className="baseElement nounElement">
			<Prefix
				element={element.prefix}
				updateElement={addElement}
				deleteElement={() => updateElement({ ...element, prefix: null })}
				mouse={mouse}
				color={secondaryColor}
			/>
			<div className="elementText" onClick={onClickSelf}>
				{element?.text}
			</div>
			<Suffix
				element={element.suffix}
				updateElement={addElement}
				deleteElement={() => updateElement({ ...element, suffix: null })}
				mouse={mouse}
				color={secondaryColor}
			/>
		</div>
	)
}
