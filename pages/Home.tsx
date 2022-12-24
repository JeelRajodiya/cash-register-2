import { Button, Alert } from "@mui/material";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { getCookie } from "cookies-next";
import { useState, useEffect, Dispatch, useRef } from "react";
import Entry from "../components/Entry";
import type { Entry as EntryProps } from "../pages/api/util/types";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";

async function fetchRecent(
	setData: Dispatch<any>,
	setIsLatestEntriesLoading: Dispatch<boolean>
) {
	const session = getCookie("session");
	setIsLatestEntriesLoading(true);
	const response = await fetch(
		`/api/entry?session=${session}&&maxResults=15`
	);
	const data = await response.json();
	setData(data);
	setIsLatestEntriesLoading(false);
}
async function postData(
	amount: number,
	description: string,
	setDataHash: Dispatch<number>,
	setIsErrorVisible: Dispatch<boolean>,
	setErrorMsg: Dispatch<string>
) {
	if (amount === 0) {
		setIsErrorVisible(true);
		setErrorMsg("Amount cannot be 0");
		setTimeout(() => {
			setIsErrorVisible(false);
		}, 3000);

		return;
	}
	const session = getCookie("session");
	const response = await fetch("/api/entry", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			session,
			amount,
			description,
		}),
	});
	if (response.status !== 200) {
		setIsErrorVisible(true);
		setErrorMsg("Error: " + (await response.text()));
		setTimeout(() => {
			setIsErrorVisible(false);
		}, 5000);

		return;
	}
	// const data = await response.text();
	// console.log(data);
	setDataHash(new Date().getTime());
}

export default function Home() {
	const [latestEntries, setLatestEntries] = useState([]);
	const [amount, setAmount] = useState<number>(0);
	const [description, setDescription] = useState("");
	const [isLatestEntriesLoading, setIsLatestEntriesLoading] = useState(true);
	const [dataUpdateHash, setDataUpdateHash] = useState(new Date().getTime());
	const [isErrorVisible, setIsErrorVisible] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const amountFieldRef =
		useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
	const descriptionFieldRef =
		useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		// console.log("sd");
		fetchRecent(setLatestEntries, setIsLatestEntriesLoading);
	}, [dataUpdateHash]);

	return (
		<Layout>
			{/* <div style={{ height: "100%" }}>Home</div> */}
			<div className={styles.inputArea}>
				<div className={styles.inputLabel}>Amount</div>
				<input
					ref={amountFieldRef}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							amountFieldRef.current.blur();
							descriptionFieldRef.current.focus();
						}
					}}
					className={styles.inputField}
					onChange={(e) => setAmount(Number(e.target.value))}
					value={amount !== 0 ? amount : ""}
					type="number"
				></input>
				<div className={styles.inputLabel}>Description</div>
				<input
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === "Backspace" && description === "") {
							amountFieldRef.current.focus();
							descriptionFieldRef.current.blur();
						} else if (e.key === "Enter") {
							descriptionFieldRef.current.blur();
							postData(
								amount,
								description,
								setDataUpdateHash,
								setIsErrorVisible,
								setErrorMsg
							);
						}
					}}
					ref={descriptionFieldRef}
					className={styles.inputField}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></input>
				<div className={styles.inputButtonArea}>
					<Button
						onClick={() =>
							postData(
								amount,
								description,
								setDataUpdateHash,
								setIsErrorVisible,
								setErrorMsg
							)
						}
						className={styles.inputButton}
						variant="contained"
						color="success"
						sx={{ margin: "0.5em", fontSize: "1.5rem" }}
					>
						<AddRoundedIcon />
					</Button>
					<Button
						onClick={() =>
							postData(
								-amount,
								description,
								setDataUpdateHash,
								setIsErrorVisible,
								setErrorMsg
							)
						}
						sx={{ margin: "0.5em", fontSize: "1.5rem" }}
						variant="outlined"
						className={styles.inputButton}
						color="error"
					>
						<RemoveRoundedIcon />
					</Button>
				</div>
				{isErrorVisible && <Alert severity="error">{errorMsg}</Alert>}
			</div>
			<div className={styles.recentEntriesWindow}>
				<div className={styles.recentEntriesTitle}>
					Recent Entries{" "}
					{isLatestEntriesLoading ? (
						<CircularProgress size={15}></CircularProgress>
					) : (
						<Image
							src="/icons/refresh.svg"
							width={20}
							className={styles.refreshIcon}
							height={20}
							alt="refresh"
							onClick={() =>
								setDataUpdateHash(new Date().getTime())
							}
						/>
					)}
				</div>
				<div className={styles.entriesWrapper}>
					{latestEntries.map((entry: EntryProps) => (
						<Entry
							key={entry.entryID}
							{...entry}
							setDataUpdateHash={setDataUpdateHash}
						/>
					))}
				</div>
			</div>
		</Layout>
	);
}
