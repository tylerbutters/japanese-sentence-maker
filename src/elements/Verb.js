import { useEffect, useState } from "react"
import AddElementModal from "../AddElementModal"
import "../App.css"
import useElementsStore from "../useElementsStore"

export default function Verb({ element, onClickSelf, replaceElement }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const allElements = useElementsStore((state) => state)

	return (
		<div className="baseElement verbElement">
			<div className="elementText" onClick={onClickSelf}>
				{element.stem}
			</div>
			<Conjugation
				parentConjugation={element}
				updateConjugation={(newConjugation) => replaceElement(newConjugation)}
			/>
		</div>
	)
}
function Conjugation({ parentConjugation, updateConjugation }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const allElements = useElementsStore((state) => state)
	const [conjugationOptions, setConjugationOptions] = useState()
	const currentConjugation = parentConjugation?.next

	useEffect(() => {
		setConjugationOptions(getConjugationOptions())
	}, [])

	function getGodanElements() {
		const godanMap = {
			く: ["か", "き", "く", "け", "こ", "いて", "いた"],
			ぐ: ["が", "ぎ", "ぐ", "げ", "ご", "いで", "いだ"],
			す: ["さ", "し", "す", "せ", "そ", "して", "した"],
			ぶ: ["ば", "び", "ぶ", "べ", "ぼ", "んで", "んで"],
			む: ["ま", "み", "む", "め", "も", "んで", "んだ"],
			ぬ: ["な", "に", "ぬ", "ね", "の", "いて", "いた"],
			る: ["ら", "り", "る", "れ", "ろ", "って", "った"],
			つ: ["た", "ち", "つ", "て", "と", "って", "った"],
			う: ["わ", "い", "う", "え", "お", "って", "った"],
		}

		const row = godanMap[parentConjugation.ending]
		if (!row) return null

		const [a, i, u, e, o, te, ta] = row

		return {
			[a]: ["ない", "れる", "せる", "ず"],
			[i]: [],
			[u]: [],
			[e]: ["ば", "る"],
			[o]: ["う"],
			[te]: [],
			[ta]: [],
		}
	}

	function getConjugationOptions() {
		// alert(JSON.stringify(parentConjugation))
		switch (parentConjugation.verbType) {
			case "suru":
				return allElements?.conjugations?.["する"].conjugationOptions || []
			case "ichidan":
				return allElements?.conjugations?.["ichidanDefault"].conjugationOptions || []
				return
			case "godan":
				return getGodanElements()
			default:
				return (
					allElements?.conjugations?.[
						`${parentConjugation?.stem}${parentConjugation?.ending || ""}`
					]?.conjugationOptions || []
				)
		}
	}

	function getConjugationToReplace(selectedConjugation) {
		// alert(JSON.stringify(selectedConjugation))

		if (parentConjugation.verbType === "godan") {
			if (!selectedConjugation.type) {
				updateConjugation({
					...parentConjugation,
					ending: selectedConjugation.value,
					next: {},
				})
			} else {
				updateConjugation({
					...parentConjugation,
					ending: selectedConjugation.type,
					next: {
						...currentConjugation,

						stem: allElements.conjugations[selectedConjugation.value].stem || "",
						ending: allElements.conjugations[selectedConjugation.value].ending || "",
						next: {},
					},
				})
			}
		} else {
			// alert(JSON.stringify(allElements.conjugations[selectedConjugation.value]))
			updateConjugation({
				...parentConjugation,
				next: {
					...currentConjugation,
					stem: allElements.conjugations[selectedConjugation.value].stem || "",
					ending: allElements.conjugations[selectedConjugation.value].ending || "",
					next: {},
				},
			})
		}
	}

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elements={conjugationOptions}
				onSelect={getConjugationToReplace}
			/>
			<div className="baseInsideElement conjugation">
				<div className="insideElementText" onClick={() => setIsModalOpen(true)}>
					{parentConjugation.verbType === "godan" && parentConjugation.ending}
					{currentConjugation?.stem}
				</div>

				{Object.keys(currentConjugation?.next || {}).length !== 0 ? (
					<Conjugation
						parentConjugation={currentConjugation}
						updateConjugation={(updatedChild) =>
							updateConjugation({
								...currentConjugation,
								next: updatedChild,
							})
						}
					/>
				) : (
					currentConjugation?.ending && (
						<ConjugationEnding
							conjugation={currentConjugation}
							addConjugation={(newEnd) =>
								updateConjugation({
									...currentConjugation,
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

function ConjugationEnding({ conjugation, addConjugation }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const allElements = useElementsStore((state) => state)

	function onSelect(selected) {
		addConjugation({
			next: {
				stem: allElements.conjugations[selected.value]?.stem,
				ending: allElements.conjugations[selected.value]?.ending,
			},
		})
	}

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elements={
					allElements.conjugations[`${conjugation?.stem}${conjugation?.ending}`]
						.conjugationOptions || []
				}
				onSelect={onSelect}
			/>
			<div className="baseInsideElement conjugationEnding" onClick={() => setIsModalOpen(true)}>
				<div className="insideElementText">{conjugation.ending}</div>
			</div>
		</div>
	)
}
