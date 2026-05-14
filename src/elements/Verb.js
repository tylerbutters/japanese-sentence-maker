import { useEffect, useState } from "react"
import AddElementModal from "../AddElementModal"
import "../App.css"
import useElementsStore from "../useElementsStore"

export default function Verb({ element, onClickSelf, replaceElement }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const allElements = useElementsStore((state) => state)

	// useEffect(() => {
	// 	if (!element.conjugation) {
	// 		const stem = element?.value.slice(0, -1)
	// 		replaceElement({ ...element, value: stem, conjugation: { type: "る", value: "る" } })
	// 	}
	// 	// alert(JSON.stringify(ichidanConjugations))
	// }, [])

	function updateConjugation(newConjugation) {
		if (newConjugation.value === "られる") {
			newConjugation = { type: newConjugation.value, value: "られ", conjugation: { value: "る" } }
		} else if (newConjugation.value === "させる") {
			newConjugation = { type: newConjugation.value, value: "させ", conjugation: { value: "る" } }
		}
		replaceElement({ ...element, conjugation: newConjugation })
		// alert(JSON.stringify({ ...element, conjugation: newConjugation }))
	}

	return (
		<div className="baseElement verbElement">
			<div className="elementText" onClick={onClickSelf}>
				{element.characters}
			</div>
			<Stem parentStem={element} />
		</div>
	)
}

function Stem({ parentStem }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const allElements = useElementsStore((state) => state)
	const stem = parentStem.next

	// useEffect(() => {
	// 	alert(JSON.stringify(stem.next))
	// }, [])

	// function updateConjugation(newConjugation) {
	// 	if (newConjugation.value === "られる") {
	// 		newConjugation = { value: "られ", conjugation: { value: "る" } }
	// 	} else if (newConjugation.value === "させる") {
	// 		newConjugation = { value: "させ", conjugation: { value: "る" } }
	// 	}
	// 	replaceElement({
	// 		...element,
	// 		conjugation: { ...element.conjugation, conjugation: newConjugation },
	// 	})
	// }
	// useEffect(() => {
	// 	alert(JSON.stringify(stem.next))
	// }, [])
	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elements={
					parentStem.type === "verb"
						? allElements.ichidanConjugations.default
						: allElements.ichidanConjugations[`${parentStem?.characters}${parentStem?.ending}`] ||
							[]
				}
				// onSelect={updateConjugation}
			/>
			<div className="baseInsideElement verbLastChar">
				<div className="elementText" onClick={() => setIsModalOpen(true)}>
					{stem?.characters}
				</div>

				{stem?.characters && Object.keys(stem.next).length !== 0 ? (
					<Stem parentStem={stem} />
				) : (
					stem?.ending && (
						<div className="baseInsideElement stemEnding" onClick={() => setIsModalOpen(true)}>
							{stem.ending}
						</div>
					)
				)}
			</div>
		</div>
	)
}
