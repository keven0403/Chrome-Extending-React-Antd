import { useEffect, useState } from "react"
import ComCibActionBar from "../../components/CibActionBar"
import "./index.less"
import Home from "../Home"
import Conversation from "../../components/Conversation"

export default function () {
	const [currentType, setCurrentType] = useState('Home') // Home/Conversation

	const [question, setQuestion] = useState('')

	useEffect(() => {
		console.log("Hello from the popup111!")
	}, [])

	const updateLoadingStatus = (loading: boolean) => {}

	const updateIsLoadingStatus = (isLoading: boolean) => {}

	const updateIsEndStatus = (isEnd: boolean) => {}

	// 首页推荐问题点击事件
	const itemQuestionClick = (question: string) => {
		setCurrentType('Conversation')
		setQuestion(question)
	}

	return (
		<div className="popup-content">
			<div className="chat-content">
				{
					currentType === 'Home' ?
						<Home 
							itemQuestionClick={(question: string) => itemQuestionClick(question)}
						/>
					:
						currentType === 'Conversation' ?
							<Conversation
								question={question}
								updateLoadingStatus={(loading: boolean) => updateLoadingStatus(loading)}
								updateIsLoadingStatus={(isLoading: boolean) => updateIsLoadingStatus(isLoading)}
								updateIsEndStatus={(isEnd: boolean) => updateIsEndStatus(isEnd)}
							/>
						:
							null
				}
			</div>
			
			<ComCibActionBar 
				itemQuestionClick={(question: string) => itemQuestionClick(question)}
			/>
		</div>
	)
}
