import { setCookie } from "cookies-next";
import { NextRouter, useRouter } from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "../styles/Login.module.css";
function performLogin(router: NextRouter) {
	// setCookie("session", "true");
	// router.push("/");
}

export default function Login() {
	const router = useRouter();
	return (
		<div className={styles.wrapper}>
			<div className={styles.loginPage}>
				<div className={styles.label}>Email</div>
				<input
					placeholder="chad@example.com"
					className={styles.inputField}
				/>
				<div className={styles.label}>Password</div>
				<input
					type="password"
					placeholder="chad loves 69"
					className={styles.inputField}
				/>
				<Button
					variant="contained"
					onClick={() => performLogin(router)}
					sx={{
						display: "flex",
						alignSelf: "end",
						width: "2cm",
						backgroundColor: "#3f51b5",
					}}
				>
					Login
				</Button>
			</div>
		</div>
	);
}
