import { Button } from "@mui/material";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
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
		</Layout>
	);
}
