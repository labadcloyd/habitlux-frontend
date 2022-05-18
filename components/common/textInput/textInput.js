import { useEffect, useState } from "react"
import css from "./textInput.module.css"

export default function TextInput(props) {
	const {value, setValue, placeholder, title, ...rest} = props

	const [inputValue, setInputValue] = useState("")

	function handleChange(e) {
		const currentValue = e.target.value
		setInputValue(currentValue)
		setValue(currentValue)
	}

	useEffect(() => {
		setInputValue(value)
	}, [value])

	return (
		<div className={css.inputWrapper}>
			{title && <h3> {title} </h3>}
			<input
				placeholder={placeholder || ""}
				value={inputValue}
				onChange={handleChange}
				{...rest}
				>
			</input>
		</div>
	)
}