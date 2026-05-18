import { useEffect, useState } from "react"
import "../App.css"
import AddButton from "../AddButton"
import Particle from "./Particle"
import Suffix from "./Suffix"
import Prefix from "./Prefix"
import useElementsStore from "../useElementsStore"
import dictionary from "../jmdict/processed-jmdict.json"

export default function Noun({ mouse, element, onClickSelf, updateElement }) {
	const [isOpen, setIsOpen] = useState(false)
	const allElements = useElementsStore((state) => state)
	const prefixOptions = dictionary.prefixes
	const suffixOptions = dictionary.suffixes

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

	function deleteElement(elementType) {
		switch (elementType) {
			case "prefix":
				updateElement({ ...element, prefix: null })
				return
			case "suffix":
				updateElement({ ...element, suffix: null })
				return
		}
	}

	return (
		<div className="baseElement nounElement">
			{element.prefix ? (
				<Prefix
					element={element.prefix}
					elementOptions={prefixOptions}
					updateElement={addElement}
					deleteElement={deleteElement}
				/>
			) : (
				<AddButton
					mouse={mouse}
					elementOptions={prefixOptions}
					addElement={addElement}
					hasSearch={true}
				/>
			)}
			<div className="elementText" onClick={onClickSelf}>
				{element?.text}
			</div>
			{element.suffix ? (
				<Suffix
					element={element.suffix}
					elementOptions={suffixOptions}
					updateElement={addElement}
					deleteElement={deleteElement}
				/>
			) : (
				<AddButton
					mouse={mouse}
					elementOptions={suffixOptions}
					addElement={addElement}
					hasSearch={true}
				/>
			)}
		</div>
	)
}
