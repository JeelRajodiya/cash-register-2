import { Button } from "@mui/material";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
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
						variant="contained"
						color="success"
						sx={{ margin: "0.5em" }}
					>
						+
					</Button>
					<Button
						sx={{ margin: "0.5em" }}
						variant="contained"
						className={styles.inputButton}
						color="error"
					>
						-
					</Button>
				</div>
			</div>
		</Layout>
	);
}
