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
	const [selectedType, setSelectedType] = useState()

	useEffect(() => {
		function handleClickOutside(e) {
			if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
				setIsModalOpen(false)
				setSelectedType(null)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [isModalOpen])

	// useEffect(() => {
	// 	if (Object.keys(elements).length === 1) {
	// 		const onlyKey = Object.keys(elements)[0]
	// 		setSelectedType(onlyKey)
	// 	}
	// }, [elements])

	function onClickElement(selectedValue) {
		// alert(JSON.stringify(selectedValue))
		onSelect({ type: selectedType, value: selectedValue })
		setSelectedType()
		setIsModalOpen(false)
	}

	function onClickDelete() {
		deleteElement()
		setIsModalOpen(false)
	}

	function onClickOption(option) {
		// alert(JSON.stringify(elements[option]))
		if (Array.isArray(elements[option]) && elements[option].length !== 0) {
			setSelectedType(option)
		} else {
			onClickElement(option)
		}
	}

	if (!isModalOpen || !elements) return null

	if (Array.isArray(elements)) {
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
					{elements?.map((value) => (
						<button
							className="addElementModalButton"
							key={value}
							onClick={() => onClickElement(value)}
						>
							{value}
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
			{selectedType && (
				<div className="secondModal">
					{elements[selectedType]?.map((value) => (
						<button
							className="addElementModalButton"
							key={value.word}
							onClick={() => onClickElement(value)}
						>
							{value.word || value}
						</button>
					))}
				</div>
			)}

			{/* FIRST MODAL */}
			<div className="addElementModal">
				{elements &&
					Object.keys(elements).map((el) => (
						<view className="addElementModalButton" key={el} onClick={() => onClickOption(el)}>
							{el}
						</view>
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
