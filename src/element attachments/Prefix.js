import { useState } from "react"
import "../App.css"
import AddElementModal from "../AddElementModal"
import dictionary from "../jmdict/processed-jmdict.json"
import AddButton from "../AddButton"

export default function Prefix({ element, updateElement, deleteElement, mouse }) {
	const [isModalOpen, setIsModalOpen] = useState()
	const prefixOptions = dictionary.prefixes

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elementOptions={prefixOptions}
				onSelect={updateElement}
				deleteElement={() => {
					deleteElement()
					setIsModalOpen(false)
				}}
				hasDelete={true}
			/>
			{element ? (
				<div className="baseInsideElement suffixPrefixElement" onClick={() => setIsModalOpen(true)}>
					<div className="insideElementText">{element.text}</div>
				</div>
			) : (
				<AddButton
					mouse={mouse}
					elementOptions={prefixOptions}
					addElement={updateElement}
					hasSearch={true}
				/>
			)}
		</div>
	)
}
