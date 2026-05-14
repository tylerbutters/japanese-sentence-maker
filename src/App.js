import { useEffect, useState } from "react"
import "./App.css"
import AddButton from "./AddButton"
import Noun from "./elements/Noun"
import Adjective from "./elements/Adjective"
import Verb from "./elements/Verb"
import Particle from "./elements/Particle"
import useElementsStore from "./useElementsStore"
import Element from "./elements/Element"

const sentenceExample = [
	{
		type: "noun",
		value: "伝道",
		prefix: undefined,
		suffix: "中",
		particle: "に",
	},
	{
		type: "noun",
		value: "わたし",
		prefix: undefined,
		suffix: undefined,
		particle: "は",
	},
	{
		type: "adjective",
		value: "早",
		conjugation: {
			type: "adjectiveConjugation",
			value: "く",
		},
	},
	{
		type: "verb",
		verbType: "godan",
		value: "帰",
		base: "り",
		conjugation: {
			type: "adjective",
			value: "た",
			conjugation: {
				type: "adjective",
				value: "くな",
				conjugation: {
					type: "adjectiveConjugation",
					value: "かった",
				},
			},
		},
	},
	{
		characters: "食べ",
		ending: "る",
		next: {
			characters: "させ",
			ending: "る",
			next: {
				characters: "られ",
				ending: "る",
				next: {
					characters: "た",
					ending: "い",
					next: {
						characters: "くな",
						ending: "い",
						next: {
							characters: "かった",
							ending: null,
							next: {},
						},
					},
				},
			},
		},
	},
]

export default function App() {
	const [mouse, setMouse] = useState({ x: 0, y: 0 })
	const [addedElements, setAddedElements] = useState([
		// {
		// 	type: "verb",
		// 	characters: "食べ",
		// 	stem: {
		// 		ending: null,
		// 		characters: "る",
		// 		next: {
		// 			characters: "させ",
		// 			ending: "る",
		// 			next: {
		// 				characters: "られ",
		// 				ending: "る",
		// 				next: {
		// 					characters: "た",
		// 					ending: "い",
		// 					next: {
		// 						characters: "くな",
		// 						ending: "い",
		// 						next: {
		// 							characters: "かった",
		// 							ending: null,
		// 							next: {},
		// 						},
		// 					},
		// 				},
		// 			},
		// 		},
		// 	},
		// },
	])
	const [sentenceString, setSentenceString] = useState("")
	const allElements = useElementsStore((state) => state)
	const defaultElements = {
		noun: allElements.noun,
		verb: allElements.verb,
		adjective: allElements.adjective,
		punctuation: allElements.punctuation,
		coupla: allElements.coupla,
	}

	useEffect(() => {
		elementsToString(addedElements)
	}, [addedElements])

	useEffect(() => {
		function handleMove(e) {
			setMouse({ x: e.clientX, y: e.clientY })
		}

		window.addEventListener("mousemove", handleMove)
		return () => window.removeEventListener("mousemove", handleMove)
	}, [])

	function elementsToString(addedElements) {
		let string = ""
		function adjective(element) {
			if (element?.value) string += element.value
			if (element?.conjugation?.type === "adjective") adjective(element.conjugation)
			else if (element?.conjugation?.type === "adjectiveConjugation") {
				string += element.conjugation.value
			}
		}

		function verb(verb) {
			function build(node) {
				if (!node) return ""

				// if there is another conjugation after this
				if (node.next) {
					return (node.characters || "") + build(node.next)
				}

				// last node
				return (node.characters || "") + (node.ending || "")
			}

			string += build(verb.stem)
		}

		function noun(element) {
			if (element.prefix) string += element.prefix
			if (element.value) string += element.value
			if (element.suffix) string += element.suffix
			if (element.particle) string += element.particle
		}

		addedElements.forEach((element) => {
			if (element?.type === "noun") noun(element)
			else if (element?.type === "adjective") adjective(element)
			else if (element?.type === "verb") verb(element)
		})

		setSentenceString(string)
	}

	function addElement(index, element) {
		setAddedElements((prev) => {
			const copy = [...prev]
			copy.splice(index, 0, element)
			return copy
		})
	}
	function replaceElement(index, newElement) {
		// alert(JSON.stringify(newElement))
		setAddedElements((prev) => {
			const copy = [...prev]
			copy[index] = newElement
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
				{sentenceString}
			</div>
			{/* <div style={{ color: "white", display: "flex", flexDirection: "row", marginBottom: 20 }}>
				{addedElements.map((element, index) => (
					<div key={index}>{element.value}</div>
				))}
			</div> */}
			<div className="elementsContainer">
				{addedElements.map((element, index) => (
					<div key={index} style={{ display: "flex", alignItems: "center" }}>
						<AddButton
							mouse={mouse}
							elements={defaultElements}
							addElement={(element) => addElement(index, element)}
						/>
						<Element
							element={element}
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
