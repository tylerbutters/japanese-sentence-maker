import { useState } from "react"
import "../App.css"
import AddElementModal from "../AddElementModal"
import dictionary from "../jmdict/processed-jmdict.json"
import AddButton from "../AddButton"

export default function Suffix({ element, updateElement, deleteElement, mouse }) {
	const [isModalOpen, setIsModalOpen] = useState()
	const suffixOptions = dictionary.suffixes

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elementOptions={suffixOptions}
				onSelect={updateElement}
				deleteElement={() => deleteElement(element.elementType)}
				hasDelete={true}
			/>
			{element ? (
				<div className="baseInsideElement suffixPrefixElement" onClick={() => setIsModalOpen(true)}>
					<div className="insideElementText">{element.text}</div>
				</div>
			) : (
				<AddButton
					mouse={mouse}
					elementOptions={suffixOptions}
					addElement={updateElement}
					hasSearch={true}
				/>
			)}
		</div>
	)
}
