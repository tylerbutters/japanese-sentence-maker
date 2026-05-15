import { useEffect, useRef, useState, useLayoutEffect } from "react"
import AddElementModal from "../AddElementModal"
import "../App.css"
import Adjective from "./Adjective"
import Noun from "./Noun"
import Verb from "./Verb"
import useElementsStore from "../useElementsStore"
import Coupla from "./Coupla"
import Punctuation from "./Punctuation"

export default function Element({ element, mouse, replaceElement, deleteElement }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedElements, setSelectedElements] = useState()
	const [isClosing, setIsClosing] = useState(false)
	const allElements = useElementsStore((state) => state)
	const defaultElements = {
		noun: allElements.noun,
		verb: allElements.verb,
		adjective: allElements.adjective,
	}

	function renderElement() {
		const props = {
			element,
			onClickSelf: () => setIsModalOpen(true),
			replaceElement,
		}

		switch (element?.type) {
			case "noun":
				return <Noun {...props} />
			case "adjective":
				return <Adjective {...props} />
			case "verb":
				return <Verb {...props} />
			case "coupla":
				return <Coupla {...props} />
			case "punctuation":
				return <Punctuation {...props} />
			default:
				return null
		}
	}

	return (
		<div className="modalContainer">
			<AddElementModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				elements={defaultElements}
				onSelect={setSelectedElements}
				deleteElement={() => setIsClosing(true)}
				isElement={true}
			/>
			<Resize
				element={element}
				isClosing={isClosing}
				onCloseComplete={() => deleteElement(element)}
			>
				{renderElement()}
			</Resize>
			<DeleteButton deleteElement={() => setIsClosing(true)} mouse={mouse} />
		</div>
	)
}

function DeleteButton({ deleteElement, mouse }) {
	const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState()
	const deleteButtonRef = useRef()
	const EDGE_SIZE = 30

	useEffect(() => {
		const rect = deleteButtonRef.current?.getBoundingClientRect()
		if (!rect) return

		const near =
			mouse.x >= rect.left - EDGE_SIZE &&
			mouse.x <= rect.right + EDGE_SIZE &&
			mouse.y >= rect.top - EDGE_SIZE &&
			mouse.y <= rect.bottom + EDGE_SIZE

		setIsDeleteButtonVisible(near)
	}, [mouse])

	return (
		<div ref={deleteButtonRef} className="deleteElementButtonBoundary">
			<div
				className="deleteElementButton"
				style={{ bottom: isDeleteButtonVisible ? 0 : 100, zIndex: 0 }}
				onClick={deleteElement}
			>
				x
			</div>
		</div>
	)
}

function Resize({ element, isClosing, onCloseComplete, children }) {
	const [width, setWidth] = useState(0)
	const [isOverflowVisible, setIsOverflowVisible] = useState(false)
	const contentRef = useRef(null)

	useLayoutEffect(() => {
		if (!contentRef.current) return

		const el = contentRef.current

		const measure = () => {
			setWidth(el.scrollWidth)
		}
		measure()
		const observer = new ResizeObserver(() => {
			measure()
		})

		observer.observe(el)

		return () => observer.disconnect()
	}, [element])

	useEffect(() => {
		if (isClosing) {
			setIsOverflowVisible(false)
			requestAnimationFrame(() => {
				setWidth(0)
			})
		}
	}, [isClosing])

	return (
		<div
			className="elementContainer"
			style={{
				width,
				overflow: isOverflowVisible ? "visible" : "hidden",
				transition: "width 0.3s ease",
			}}
			onTransitionEnd={(e) => {
				if (e.propertyName !== "width") return

				if (isClosing) {
					onCloseComplete()
				} else {
					setIsOverflowVisible(true)
				}
			}}
		>
			<div
				ref={contentRef}
				style={{
					display: "inline-block",
					whiteSpace: "nowrap",
				}}
			>
				{children}
			</div>
		</div>
	)
}
