import { useEffect, useRef, useState } from "react"
import "../App.css"
import AddButton from "../AddButton"
import Particle from "./Particle"
import SuffixPrefix from "./SuffixPrefix"
import AddElementModal from "../AddElementModal"
import useElementsStore from "../useElementsStore"

export default function Noun({ mouse, element, onClickSelf, replaceElement }) {
	const [prefix, setPrefix] = useState(null)
	const [suffix, setSuffix] = useState(null)
	const [particle, setParticle] = useState(null)
	const [isOpen, setIsOpen] = useState(false)
	const allElements = useElementsStore((state) => state)
	const prefixElements = {
		prefix: allElements.prefix,
	}
	const suffixElements = {
		suffix: allElements.suffix,
	}
	const particleElements = {
		particle: allElements.particle,
	}
	const defaultElements = {
		noun: allElements.noun,
		verb: allElements.verb,
		adjective: allElements.adjective,
	}

	function addElement(newElement) {
		let newItem

		if (newElement.type === "prefix") {
			newItem = { ...element, prefix: newElement.value }
		} else if (newElement.type === "suffix") {
			newItem = { ...element, suffix: newElement.value }
		} else if (newElement.type === "particle") {
			newItem = { ...element, particle: newElement.value }
		}
		replaceElement(newItem)
	}
	return (
		<div className="baseElement nounElement">
			{element.prefix ? (
				<SuffixPrefix
					value={element.prefix}
					elements={prefixElements}
					replaceElement={addElement}
				/>
			) : (
				<AddButton mouse={mouse} elements={prefixElements} addElement={addElement} />
			)}
			<div className="elementText" onClick={onClickSelf}>
				{element?.value}
			</div>
			{element.suffix ? (
				<SuffixPrefix
					value={element.suffix}
					elements={suffixElements}
					replaceElement={addElement}
				/>
			) : (
				<AddButton mouse={mouse} elements={suffixElements} addElement={addElement} />
			)}
			{element.particle ? (
				<Particle
					value={element.particle}
					elements={particleElements}
					replaceElement={addElement}
				/>
			) : (
				<AddButton mouse={mouse} elements={particleElements} addElement={addElement} />
			)}
		</div>
	)
}
