import type { Entry as EntryProps } from "../pages/api/util/types";
import styles from "../styles/Entry.module.css";
export default function Entry(props: EntryProps) {
	const numberColor = props.amount > 0 ? styles.green : styles.red;
	return (
		<div className={styles.entryViewer}>
			<span className={styles.entryDate}>
				{new Date(props.date).toDateString()}
			</span>

			<span className={[styles.entryAmount, numberColor].join(" ")}>
				{props.amount}
			</span>
			<span className={styles.entryDescription}>{props.description}</span>
		</div>
	);
}
