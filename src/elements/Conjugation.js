import { useEffect, useState } from "react"
import AddElementModal from "../AddElementModal"
import "../App.css"
import useElementsStore from "../useElementsStore"
import AddButton from "../AddButton"
import dictionary from "../jmdict/processed-jmdict.json"
import Verb from "./Verb"
import ConjugationEnding from "./ConjugationEnding"
import Adjective from "./Adjective"

export default function Conjugation({
	parentConjugation,
	updateConjugation,
	deleteElement,
	mouse,
}) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const conjugations = useElementsStore((state) => state.conjugations)
	const [conjugationOptions, setConjugationOptions] = useState()
	const currentConjugation = parentConjugation?.conjugation
	const auxiliaries = useElementsStore((state) => state.auxiliaries)
	// const isIrregularVerb = currentConjugation.stem === "する" || currentConjugation.stem === "くる"

	useEffect(() => {
		setConjugationOptions(getConjugationOptions())
	}, [parentConjugation])

	function getGodanConjugationOptions() {
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

		//find what category of godan it is
		const row = Object.values(godanMap).find((row) => row.includes(parentConjugation.ending))
		if (!row) return null

		const [B1, B2, B3, B4, B5, Bte, Bta] = row

		const godanDefaults = {
			B1: [{ text: "ない" }, { text: "れる" }, { text: "せる" }, { text: "ず" }],
			B2: [{ text: "ます" }],
			B4: [{ text: "ば" }, { text: "る" }, { text: "れ" }],
			B5: [{ text: "う" }],
		}

		if (parentConjugation.verbType === "godan-aru") {
			return [
				{
					text: B1,
					list: godanDefaults.B1,
				},
				{
					text: "い",
					list: [...godanDefaults.B2, { text: "い" }],
				},
				{
					text: B2,
					list: [{ text: B2, conjugationType: "aux" }],
				},
				{
					text: B3,
					list: [{ text: B3 }],
				},
				{
					text: B4,
					list: godanDefaults.B4,
				},
				{
					text: B5,
					list: godanDefaults.B5,
				},
				{
					text: Bte,
					list: [{ text: Bte, conjugationType: "te" }],
				},
				{
					text: Bta,
					list: [{ text: Bta }],
				},
			]
		} else if (parentConjugation.verbType === "godan-iku") {
			return [
				{
					text: B1,
					list: godanDefaults.B1,
				},
				{
					text: B2,
					list: [...godanDefaults.B2, { text: B2, conjugationType: "aux" }],
				},
				{
					text: B3,
					list: [{ text: B3 }],
				},
				{
					text: B4,
					list: godanDefaults.B4,
				},
				{
					text: B5,
					list: godanDefaults.B5,
				},
				{
					text: "って",
					list: [{ text: "って", conjugationType: "te" }],
				},
				{
					text: "った",
					list: [{ text: "った" }],
				},
			]
		}

		return [
			{
				text: B1,
				list: godanDefaults.B1,
			},
			{
				text: B2,
				list: [...godanDefaults.B2, { text: B2, conjugationType: "aux" }],
			},
			{
				text: B3,
				list: [{ text: B3 }],
			},
			{
				text: B4,
				list: godanDefaults.B4,
			},
			{
				text: B5,
				list: godanDefaults.B5,
			},
			{
				text: Bte,
				list: [{ text: Bte, conjugationType: "te" }],
			},
			{
				text: Bta,
				list: [{ text: Bta }],
			},
		]
	}

	function getConjugationOptions() {
		//is a conjugation in a conjugation
		if (parentConjugation.elementType === "adjective") {
			return conjugations.iadjectives["default"]?.conjugationOptions
		} else if (parentConjugation.elementType === "verb") {
			//is the first conjugation
			switch (parentConjugation.verbType) {
				case "suru":
					return conjugations.verbs["suruDefault"]?.conjugationOptions || []
				case "kuru":
					return conjugations.verbs["kuruDefault"]?.conjugationOptions || []
				case "ichidan":
					return conjugations.verbs["ichidanDefault"]?.conjugationOptions || []
				case "kureru":
					alert("make kureru")
					return
				default:
					//godan, godan-iku, godan-aru
					return getGodanConjugationOptions()
			}
		} else {
			return (
				conjugations.verbs[`${parentConjugation.stem}${parentConjugation.ending}`]
					?.conjugationOptions || []
			)
		}
	}

	function onSelectConjugationChange(selectedConjugation) {
		let conjugationData = conjugations.verbs[selectedConjugation.text]

		//its a verb or adj
		if (
			selectedConjugation.elementType === "verb" ||
			selectedConjugation.elementType === "adjective"
		) {
			return updateConjugation({
				...parentConjugation,
				conjugation: {
					...currentConjugation,
					conjugation: selectedConjugation,
				},
			})
		}

		if (parentConjugation.verbType?.includes("godan")) {
			const selectedCategory = conjugationOptions.find((category) =>
				category.list.some((conjugation) => conjugation.text === selectedConjugation.text),
			)

			const singleCharacterConjugation =
				selectedConjugation.list?.length === 0 || selectedCategory.text === selectedConjugation.text
			//only change the ending of the verb
			if (singleCharacterConjugation) {
				updateConjugation({
					...parentConjugation,
					ending: selectedConjugation.text,
					conjugation: {
						conjugationType: selectedConjugation.conjugationType,
						stem: selectedConjugation.text,
						conjugation: {},
					},
				})
			} else {
				//change the ending of verb and add conjugation
				updateConjugation({
					...parentConjugation,
					ending: selectedCategory.text,
					conjugation: {
						conjugationType: conjugationData.conjugationType,
						stem: conjugationData.stem || "",
						ending: conjugationData.ending || "",
						conjugation: {},
					},
				})
			}
		} else {
			if (selectedConjugation.text === "る") {
				conjugationData = conjugations.verbs["ichidanDefault"]
			}
			// alert(JSON.stringify(selectedConjugation))

			// //if its an te verb or b2

			// alert(JSON.stringify(allElements.conjugations[selectedConjugation.value]))
			updateConjugation({
				...parentConjugation,
				conjugation: {
					conjugationType: conjugationData.conjugationType,
					stem: conjugationData.stem || "",
					ending: conjugationData.ending || "",
					conjugation: {},
				},
			})
		}
	}

	function renderOtherElement() {
		// alert(JSON.stringify(currentConjugation))
		if (Object.keys(currentConjugation?.conjugation || {}).length !== 0) {
			return (
				<Conjugation
					mouse={mouse}
					parentConjugation={currentConjugation}
					updateConjugation={(updatedChild) =>
						updateConjugation({
							...parentConjugation,
							conjugation: {
								...currentConjugation,
								...updatedChild,
							},
						})
					}
				/>
			)
		} else if (currentConjugation.conjugationType === "aux") {
			return (
				<AddButton
					elementOptions={auxiliaries}
					mouse={mouse}
					hasSearch={true}
					addElement={onSelectConjugationChange}
				/>
			)
		} else if (currentConjugation.conjugationType === "te") {
			return (
				<AddButton
					elementOptions={dictionary.verbs}
					mouse={mouse}
					hasSearch={true}
					addElement={onSelectConjugationChange}
				/>
			)
		} else if (currentConjugation?.ending) {
			return (
				<ConjugationEnding
					conjugation={currentConjugation}
					updateConjugation={(nextConjugation) => {
						updateConjugation({
							...parentConjugation,
							conjugation: {
								...currentConjugation,
								conjugation: nextConjugation,
							},
						})
					}}
				/>
			)
		}
	}

	if (currentConjugation?.elementType === "verb") {
		// alert(JSON.stringify(currentConjugation))
		return (
			<Verb
				element={currentConjugation}
				elementOptions={auxiliaries}
				updateElement={(updatedChild) =>
					updateConjugation({
						...parentConjugation,
						conjugation: {
							...currentConjugation,
							...updatedChild,
						},
					})
				}
				deleteElement={() =>
					updateConjugation({
						...parentConjugation,
						conjugation: {},
					})
				}
				mouse={mouse}
			/>
		)
	} else if (currentConjugation?.elementType === "adjective") {
		// alert(JSON.stringify(currentConjugation))
		return (
			<Adjective
				element={currentConjugation}
				elementOptions={auxiliaries}
				updateElement={(updatedChild) =>
					updateConjugation({
						...parentConjugation,
						conjugation: {
							...currentConjugation,
							...updatedChild,
						},
					})
				}
				deleteElement={() =>
					updateConjugation({
						...parentConjugation,
						conjugation: {},
					})
				}
				mouse={mouse}
			/>
		)
	}

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elementOptions={conjugationOptions}
				onSelect={onSelectConjugationChange}
			/>
			<div className="baseInsideElement conjugation">
				<div className="insideElementText" onClick={() => setIsModalOpen(true)}>
					{parentConjugation.verbType?.includes("godan") &&
						parentConjugation.ending !== currentConjugation?.stem &&
						parentConjugation.ending}
					{!currentConjugation?.stem && !currentConjugation?.ending && (
						<div style={{ width: 40, height: 80 }} />
					)}
					{currentConjugation?.stem}
				</div>
				{renderOtherElement()}
			</div>
		</div>
	)
}
