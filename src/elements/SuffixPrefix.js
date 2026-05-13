import { useEffect, useRef, useState } from "react"
import "../App.css"
import AddButton from "../AddButton"

export default function SuffixPrefix({ text }) {
	if (!text) text = "は"

	return (
		<div className="baseInsideElement suffixPrefixElement">
			<div className=" elementText">{text}</div>
		</div>
	)
}
