import Layout from "../components/Layout";
import styles from "../styles/Search.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
export default function Search() {
	return (
		<Layout>
			<div className={styles.searchWindow}>
				<div className={styles.searchBar}>
					<input
						className={styles.mainInput}
						placeholder="Start Searching ..."
					></input>
					<Button
						color="inherit"
						// sx={{ borderRadius: "2em" }}
						className={styles.searchBtn}
					>
						<SearchIcon />
					</Button>
				</div>
			</div>
		</Layout>
	);
}
