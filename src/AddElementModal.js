import { useEffect, useState, useRef } from "react"
import "./App.css"

export default function AddElementModal({
	isElement,
	isModalOpen,
	setIsModalOpen,
	onSelect,
	elements,
	deleteElement,
}) {
	const modalRef = useRef(null)
	const [selectedElement, setSelectedElement] = useState(null)

	useEffect(() => {
		function handleClickOutside(e) {
			if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
				setIsModalOpen(false)
				setSelectedElement(null)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [isModalOpen])

	useEffect(() => {
		if (Object.keys(elements).length === 1) {
			const onlyKey = Object.keys(elements)[0]
			setSelectedElement(onlyKey)
		}
	}, [elements])

	function onClickElement(text) {
		onSelect({ type: selectedElement, text: text })
		setIsModalOpen(false)
	}

	function onClickDelete() {
		deleteElement()
		setIsModalOpen(false)
	}

	if (!isModalOpen) return null

	if (Object?.keys(elements).length === 1) {
		const onlyKey = Object.keys(elements)[0]

		return (
			<div
				ref={modalRef}
				style={{
					position: "absolute",
					// backgroundColor: "white",
					// display: "flex",
					// justifySelf: "center",
					bottom: "130%",
				}}
			>
				<div className="secondModal">
					{elements[onlyKey]?.map((text) => (
						<button
							className="addElementModalButton"
							key={text}
							onClick={() => onClickElement(text)}
						>
							{text}
						</button>
					))}
				</div>
			</div>
		)
	}

	return (
		<div
			ref={modalRef}
			style={{
				position: "absolute",
				display: "flex",
				justifySelf: "center",
				bottom: "130%",
			}}
		>
			{/* SECOND STEP MODAL */}
			{selectedElement && (
				<div className="secondModal">
					{elements[selectedElement]?.map((text) => (
						<button
							className="addElementModalButton"
							key={text}
							onClick={() => onClickElement(text)}
						>
							{text}
						</button>
					))}
				</div>
			)}

			{/* FIRST MODAL */}
			<div className="addElementModal">
				{Object.keys(elements).map((el) => (
					<button className="addElementModalButton" key={el} onClick={() => setSelectedElement(el)}>
						{el}
					</button>
				))}
				{isElement && (
					<button style={{ backgroundColor: "red", color: "white" }} onClick={onClickDelete}>
						Delete
					</button>
				)}
			</div>
		</div>
	)
}
