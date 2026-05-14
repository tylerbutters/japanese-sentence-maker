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
	prefix: [
		"お",
		"ご",
		"大",
		"小",
		"真",
		"新",
		"旧",
		"不",
		"無",
		"未",
		"再",
		"反",
		"前",
		"後",
		"最",
		"超",
		"極",
		"多",
		"少",
	],
	suffix: ["間", "中", "後", "前", "回"],
	particle: ["は", "が", "を", "に", "で", "の", "と", "も", "へ", "から"],

	ichidanConjugations: {
		default: ["ない", "たい", "た", "て", "られる", "させる"],
		ない: ["かった", "くて"],
		くない: ["い", "かった"],
		たい: ["ない", "かった"],

		た: [],

		て: ["いる", "おく"],

		られる: ["ない", "たい"],

		させる: ["られる", "ない"],
	},
	conjugations: {
		default: ["ない", "たい", "た", "て", "られる", "させる"],

		ない: {
			characters: "な",
			ending: "い",
			conjugationOptions: ["かった", "くて"],
		},

		たい: {
			characters: "た",
			ending: "い",
			conjugationOptions: ["ない", "かった"],
		},

		た: {
			characters: "た",
			ending: null,
			conjugationOptions: ["て", "り"],
		},

		て: {
			characters: "て",
			ending: null,
			conjugationOptions: ["いる", "おく"],
		},

		られる: {
			characters: "られ",
			ending: "る",
			conjugationOptions: ["ない", "たい"],
		},

		させる: {
			characters: "させ",
			ending: "る",
			conjugationOptions: ["られる", "たい", "ない"],
		},

		く: {
			characters: "く",
			ending: null,
			conjugationOptions: ["ない", "て"],
		},

		くない: {
			characters: "くな",
			ending: "い",
			conjugationOptions: ["かった", "くて"],
		},

		かった: {
			characters: "かった",
			ending: null,
			conjugationOptions: [],
		},
	},

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
