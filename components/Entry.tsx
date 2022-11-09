import type { Entry as EntryProps } from "../pages/api/util/types";
import styles from "../styles/Entry.module.css";
export default function Entry(props: EntryProps) {
	return (
		<div className={styles.entryViewer}>
			<span className={styles.entryAmount}>{props.amount}</span>
			<span className={styles.entryDescription}>{props.description}</span>
		</div>
	);
}
