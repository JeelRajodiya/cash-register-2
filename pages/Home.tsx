import { Button } from "@mui/material";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { getCookie } from "cookies-next";
import { useState, useEffect, Dispatch } from "react";
import Entry from "../components/Entry";
import type { Entry as EntryProps } from "../pages/api/util/types";

async function fetchRecent(setData: Dispatch<any>) {
	const session = getCookie("session");
	const response = await fetch(
		`/api/entry?session=${session}&&maxResults=10`
	);
	const data = await response.json();
	setData(data);
}
export default function Home() {
	const [latestEntries, setLatestEntries] = useState([]);
	useEffect(() => {
		fetchRecent(setLatestEntries);
	});
	return (
		<Layout>
			{/* <div style={{ height: "100%" }}>Home</div> */}
			<div className={styles.inputArea}>
				<div className={styles.inputLabel}>Amount</div>
				<input className={styles.inputField}></input>
				<div className={styles.inputLabel}>Description</div>
				<input className={styles.inputField}></input>
				<div className={styles.inputButtonArea}>
					<Button
						className={styles.inputButton}
						variant="outlined"
						color="success"
						sx={{ margin: "0.5em", fontSize: "1.5rem" }}
					>
						<AddRoundedIcon />
					</Button>
					<Button
						sx={{ margin: "0.5em", fontSize: "1.5rem" }}
						variant="outlined"
						className={styles.inputButton}
						color="error"
					>
						<RemoveRoundedIcon />
					</Button>
				</div>
			</div>
			<div className={styles.recentEntriesWindow}>
				<div className={styles.recentEntriesTitle}>Recent Entries</div>
				{latestEntries.map((entry: EntryProps) => (
					<Entry key={entry.entryID} {...entry} />
				))}
			</div>
		</Layout>
	);
}
