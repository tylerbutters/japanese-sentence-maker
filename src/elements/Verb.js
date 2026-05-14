import { useEffect, useState } from "react"
import AddElementModal from "../AddElementModal"
import "../App.css"
import useElementsStore from "../useElementsStore"

export default function Verb({ element, onClickSelf, replaceElement }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const allElements = useElementsStore((state) => state)

	useEffect(() => {
		const alreadyInitialized = element?.characters && element?.next

		if (alreadyInitialized) return

		if (!element?.value) return

		const characters = element.value.slice(0, -1)
		const ending = element.value.at(-1)

		replaceElement({
			type: "verb",
			characters,
			next: {
				characters: ending,
				ending: null,
				next: {},
			},
		})
	}, [element, replaceElement])

	return (
		<div className="baseElement verbElement">
			<div className="elementText" onClick={onClickSelf}>
				{element.characters}
			</div>
			<Stem
				parentStem={element}
				updateStem={(newStem) =>
					replaceElement({
						...element,
						next: newStem,
					})
				}
			/>
		</div>
	)
}

function Stem({ parentStem, updateStem }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const allElements = useElementsStore((state) => state)
	const stem = parentStem?.next

	// useEffect(() => {
	// 	alert(
	// 		`${JSON.stringify(`${parentStem?.characters}${parentStem?.ending}`)}${
	// 			allElements?.conjugations?.[`${parentStem?.characters}${parentStem?.ending}`]
	// 				?.conjugationOptions
	// 		}`,
	// 	)
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
	// 	alert(JSON.stringify(allElements?.conjugations.default))
	// }, [allElements.conjugations.default])

	function getStemToReplace(selectedStem) {
		updateStem({
			...stem,
			characters: allElements.conjugations[selectedStem.value].characters,
			ending: allElements.conjugations[selectedStem.value].ending,
			next: {},
		})
	}

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elements={
					allElements?.conjugations?.[`${parentStem?.characters}${parentStem?.ending}`]
						?.conjugationOptions || allElements.conjugations.default
				}
				onSelect={getStemToReplace}
			/>
			<div className="baseInsideElement verbLastChar">
				<div className="elementText" onClick={() => setIsModalOpen(true)}>
					{stem?.characters}
				</div>

				{stem?.characters && Object.keys(stem.next || {}).length !== 0 ? (
					<Stem
						parentStem={stem}
						updateStem={(updatedChild) =>
							updateStem({
								...stem,
								next: updatedChild,
							})
						}
					/>
				) : (
					stem?.ending && (
						<StemEnding
							stem={stem}
							addStem={(newEnd) =>
								updateStem({
									...stem,
									...newEnd,
								})
							}
						/>
					)
				)}
			</div>
		</div>
	)
}

function StemEnding({ stem, addStem }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const allElements = useElementsStore((state) => state)

	function onSelect(selected) {
		addStem({
			next: {
				characters: allElements.conjugations[selected.value].characters,
				ending: allElements.conjugations[selected.value].ending,
			},
		})
	}

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elements={allElements.ichidanConjugations[`${stem?.characters}${stem?.ending}`] || []}
				onSelect={onSelect}
			/>
			<div className="baseInsideElement stemEnding" onClick={() => setIsModalOpen(true)}>
				{stem.ending}
			</div>
		</div>
	)
}
