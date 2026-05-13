import { useEffect, useState } from "react"
import "./App.css"
import AddButton from "./AddButton"
import Noun from "./elements/Noun"
import Adjective from "./elements/Adjective"
import Verb from "./elements/Verb"
import Particle from "./elements/Particle"
import useElementsStore from "./useElementsStore"
import Element from "./elements/Element"

export default function App() {
	const [mouse, setMouse] = useState({ x: 0, y: 0 })
	const [addedElements, setAddedElements] = useState([])
	const allElements = useElementsStore((state) => state)
	const defaultElements = {
		noun: allElements.noun,
		verb: allElements.verb,
		adjective: allElements.adjective,
		punctuation: allElements.punctuation,
		coupla: allElements.coupla,
	}

	useEffect(() => {
		function handleMove(e) {
			setMouse({ x: e.clientX, y: e.clientY })
		}

		window.addEventListener("mousemove", handleMove)
		return () => window.removeEventListener("mousemove", handleMove)
	}, [])

	function addElement(index, element) {
		setAddedElements((prev) => {
			const copy = [...prev]
			copy.splice(index, 0, element)
			return copy
		})
	}
	function replaceElement(index, element) {
		setAddedElements((prev) => {
			const copy = [...prev]
			copy[index] = element
			return copy
		})
	}

	function deleteElement(index) {
		setAddedElements((prev) => {
			const copy = [...prev]
			copy.splice(index, 1)
			return copy
		})
	}

	return (
		<div className="app">
			<div style={{ color: "white", display: "flex", flexDirection: "row", marginBottom: 20 }}>
				{addedElements.map((element, index) => (
					<div key={index}>{element.text}</div>
				))}
			</div>
			<div className="elementsContainer">
				{addedElements.map((element, index) => (
					<div key={index} style={{ display: "flex", alignItems: "center" }}>
						<AddButton
							mouse={mouse}
							elements={defaultElements}
							addElement={(element) => addElement(index, element)}
						/>
						<Element
							type={element.type}
							text={element.text}
							mouse={mouse}
							replaceElement={(newElement) => replaceElement(index, newElement)}
							deleteElement={() => deleteElement(index)}
						/>
						{index === addedElements.length - 1 && (
							<AddButton
								mouse={mouse}
								elements={defaultElements}
								addElement={(element) => addElement(index + 1, element)}
							/>
						)}
					</div>
				))}
				{!addedElements.length && (
					<AddButton
						locked={true}
						mouse={mouse}
						elements={defaultElements}
						addElement={(element) => addElement(0, element)}
					/>
				)}
			</div>
		</div>
	)
}
