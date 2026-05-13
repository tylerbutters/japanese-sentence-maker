import { create } from "zustand"

const useElementsStore = create((set) => ({
	verb: ["食べる", "飲む", "行く", "来る", "見る", "する", "話す", "書く", "読む", "寝る"],
	adjective: [
		"大きい",
		"小さい",
		"高い",
		"安い",
		"新しい",
		"古い",
		"いい",
		"悪い",
		"面白い",
		"忙しい",
	],
	noun: ["人", "本", "学校", "水", "食べ物", "日本", "車", "時間", "友達", "言葉"],
	prefix: ["各"],
	suffix: ["屋"],
	particles: ["は", "が", "を", "に", "で", "の", "と", "も", "へ", "から"],
	ichidanConjugations: ["ない", "れば", "られる", "させる", "ろ", "よう", "て", "た"],
	godanConjugations: {
		B1: ["ない", "れる", "せる", "ず"],
		B2: [],
		B3: [],
		B4: ["ば", "る"],
		B5: ["う"],
		Bte: ["て"],
		Bta: ["た"],
	},
	adjectiveConjugations: ["くない", "かった", "くなかった", "く"],
	punctuation: ["、", "。"],
	coupla: ["だ", "です"],
}))

export default useElementsStore
