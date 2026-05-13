import { useEffect, useRef, useState } from "react"
import "../App.css"
import AddButton from "../AddButton"
import Particle from "./Particle"
import SuffixPrefix from "./SuffixPrefix"
import AddElementModal from "../AddElementModal"
import useElementsStore from "../useElementsStore"

export default function Noun({ mouse, text, onClickSelf }) {
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
		particles: allElements.particles,
	}
	const defaultElements = {
		noun: allElements.noun,
		verb: allElements.verb,
		adjective: allElements.adjective,
	}
	function addElement(element) {
		if (element.type === "prefix") setPrefix(element.text)
		if (element.type === "suffix") setSuffix(element.text)
		if (element.type === "particles") setParticle(element.text)
	}

	return (
		<div className="baseElement nounElement">
			{prefix ? (
				<SuffixPrefix text={prefix} />
			) : (
				<AddButton mouse={mouse} elements={prefixElements} addElement={addElement} />
			)}
			<div className="elementText" onClick={onClickSelf}>
				{text}
			</div>
			{suffix ? (
				<SuffixPrefix text={suffix} />
			) : (
				<AddButton mouse={mouse} elements={suffixElements} addElement={addElement} />
			)}
			{particle ? (
				<Particle text={particle} />
			) : (
				<AddButton mouse={mouse} elements={particleElements} addElement={addElement} />
			)}
		</div>
	)
}
