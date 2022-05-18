import { motion } from "framer-motion"
import { useEffect, useState } from 'react';
import moment from 'moment';

import css from './dateChanger.module.css'
import { SwitchBtn, SmallBtn, Button } from "../../common";
import { ArrowLeft, ArrowRight, Plus } from '../../../public/svgs';
import { DATE_CHOICES, DEFAULT_HABIT_LIST } from '../../../common/constants';

export default function DateChanger (props) {
	const {
		dateSort,
		setDateSort,
		changeDate,
		selectedDates,
		setIsHabitModalListOpen,
		setCurrentHabitList,
		setIsLoading
	} = props

	const [dateTitle, setDateTitle] = useState("")

	useEffect(() => {
		const start_date = moment(selectedDates[0]) 
		const end_date = moment(selectedDates[selectedDates.length -1]) 

		if( start_date.year() !== end_date.year() ) {
			return setDateTitle(`${start_date.format('MMMM D, YYYY')} - ${end_date.format('MMMM D, YYYY')}`)
		} else if (start_date.year() === end_date.year()) {
			if (start_date.month() === end_date.month()) {
				return setDateTitle(`${start_date.format('MMMM D')} - ${end_date.format('D, YYYY')}`)
			}
			return setDateTitle(`${start_date.format('MMMM D')} - ${end_date.format('MMMM D, YYYY')}`)
		}
	}, [selectedDates, dateSort])


	return (
		<div className={css.wrapper}>
			<div className={css.container}>
				<div>
					<div className={css.arrowBtnContainer}>
						<SmallBtn onClick={() => {setIsLoading(true); changeDate({increment: false})}}>
							<ArrowLeft/>
						</SmallBtn>
						<motion.div
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							transition={{ duration: 0.3 }}

							className={css.dateContainerSmall}
						>
							{dateTitle}
						</motion.div>
						<SmallBtn onClick={() => {setIsLoading(true); changeDate({increment: true})}}>
							<ArrowRight/>
						</SmallBtn>
					</div>
					<div className={css.dateContainer}>
						{dateTitle}
					</div>
					<div className={css.dateChoiceWrapper}>
						<SwitchBtn values={["Bi-Weekly", "Monthly"]} setValue={setDateSort} setIsLoading={setIsLoading}/>
					</div>
				</div>
				<Button onClick={() => {setIsHabitModalListOpen(true); setCurrentHabitList(DEFAULT_HABIT_LIST);}}>
					<Plus/>
					Add habit
				</Button>
			</div>
		</div>
	)
}