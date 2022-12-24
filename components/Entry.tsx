import type { Entry as EntryProps } from "../pages/api/util/types";
import styles from "../styles/Entry.module.css";
import { getCookie } from "cookies-next";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Button } from "@mui/material";
import { Dispatch } from "react";
async function deleteEntry(EntryID: string) {
	const session = getCookie("session");
	const response = await fetch(
		`/api/entry?session=${session}&&entryID=${EntryID}`,
		{
			method: "DELETE",
		}
	);
	const data = await response.text();
	console.log(data, EntryID, session);
	return data;
}
interface EntryProps2 extends EntryProps {
	setDataUpdateHash: Dispatch<number>;
}
export default function Entry(props: EntryProps2) {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "INR",
	});
	const numberColor = props.amount > 0 ? styles.green : styles.red;
	return (
		<div className={styles.entryViewer}>
			<span className={styles.entryDate}>
				{new Date(props.date).toLocaleString("en-IN", {
					year: "numeric",
					month: "long",
					day: "numeric",
					minute: "numeric",
					hour: "numeric",
				})}
			</span>

			<span className={[styles.entryAmount, numberColor].join(" ")}>
				{formatter.format(props.amount)}
			</span>
			<span className={styles.entryDescription}>{props.description}</span>
			<Button
				color="error"
				size="large"
				sx={{ zIndex: -1 }}
				onClick={() => {
					deleteEntry(props.entryID);
					props.setDataUpdateHash(new Date().getTime());
				}}
			>
				<ClearRoundedIcon />
			</Button>
		</div>
	);
}
