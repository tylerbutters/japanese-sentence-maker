import { useEffect, useState } from "react"
import AddElementModal from "../AddElementModal"
import "../App.css"
import Adjective from "./Adjective"
import Noun from "./Noun"
import Verb from "./Verb"
import useElementsStore from "../useElementsStore"
import Coupla from "./Coupla"
import Punctuation from "./Punctuation"

export default function Element({ type, text, mouse, replaceElement, deleteElement }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const allElements = useElementsStore((state) => state)
	const [selectedElements, setSelectedElements] = useState()

	const defaultElements = {
		noun: allElements.noun,
		verb: allElements.verb,
		adjective: allElements.adjective,
	}

	const stem = text.slice(0, -1)
	const lastChar = text.at(-1)

	useEffect(() => {
		if (selectedElements) {
			replaceElement(selectedElements)
			setSelectedElements(null)
		}
	}, [isModalOpen])

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elements={defaultElements}
				onSelect={setSelectedElements}
				deleteElement={deleteElement}
				isElement={true}
			/>
			{type === "noun" && (
				<Noun
					text={text}
					mouse={mouse}
					defaultElements={defaultElements}
					onClickSelf={() => setIsModalOpen(true)}
				/>
			)}
			{type === "adjective" && (
				<Adjective text={text} mouse={mouse} onClickSelf={() => setIsModalOpen(true)} />
			)}
			{type === "verb" && (
				<Verb text={text} mouse={mouse} onClickSelf={() => setIsModalOpen(true)} />
			)}
			{type === "coupla" && (
				<Coupla text={text} mouse={mouse} onClickSelf={() => setIsModalOpen(true)} />
			)}
			{type === "punctuation" && (
				<Punctuation text={text} mouse={mouse} onClickSelf={() => setIsModalOpen(true)} />
			)}
		</div>
	)
}
