import Layout from "../components/Layout";
import styles from "../styles/Search.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useState, Dispatch, useEffect } from "react";
import { getCookie } from "cookies-next";
import Entry from "../components/Entry";
import type { Entry as EntryProps } from "../pages/api/util/types";
import CircularProgress from "@mui/material/CircularProgress";

async function performSearch(
	query: string,
	setResults: Dispatch<any[]>,
	setIsLatestEntriesLoading: Dispatch<boolean>
) {
	const session = getCookie("session");
	setIsLatestEntriesLoading(true);
	const response = await fetch(
		`/api/search?queryText=${query}&&session=${session}`
	);
	const data = await response.json();
	setResults(data);
	setIsLatestEntriesLoading(false);
}
export default function Search() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [dataUpdateHash, setDataUpdateHash] = useState(new Date().getTime());
	const [isResultsLoading, setIsResultsLoading] = useState(false);
	useEffect(() => {
		performSearch(query, setResults, setIsResultsLoading);
	}, [dataUpdateHash]);

	return (
		<Layout>
			<div className={styles.searchWindow}>
				<div className={styles.searchBar}>
					<input
						className={styles.mainInput}
						placeholder="Start Searching ..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					></input>
					<Button
						color="inherit"
						onClick={() =>
							performSearch(
								query,
								setResults,
								setIsResultsLoading
							)
						}
						// sx={{ borderRadius: "2em" }}
						className={styles.searchBtn}
					>
						{isResultsLoading ? (
							<CircularProgress size={20} />
						) : (
							<SearchIcon />
						)}
					</Button>
				</div>
				<div className={styles.entriesWrapper}>
					{results.map((entry: EntryProps) => (
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
