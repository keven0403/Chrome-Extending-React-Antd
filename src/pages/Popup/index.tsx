import { useEffect } from "react"
import ComCibActionBar from "../../components/CibActionBar"
import "./index.less"
import Home from "../Home"

export default function () {
	useEffect(() => {
		console.log("Hello from the popup111!")
	}, [])

	const buttonClick = () => {
		alert("Hello from the popup")
	}

	return (
		<div className="popup">
			<div className="chat-content">
				<Home />
			</div>
			
			<ComCibActionBar id="aaa" />
		</div>
	)
}
