import { setCookie } from "cookies-next";
import { NextRouter, useRouter } from "next/router";
import Button from "@mui/material/Button";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";

const theme = createTheme({
	palette: {
		primary: blue,
		secondary: blue,
	},
});

function performLogin(router: NextRouter) {
	// setCookie("session", "true");
	// router.push("/");
}

export default function Login() {
	const router = useRouter();
	return (
		<div className={styles.wrapper}>
			<h2>Login to Your Account</h2>
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
					color="primary"
					variant="contained"
					onClick={() => performLogin(router)}
					sx={{ marginTop: "1rem" }}
				>
					Login
				</Button>
				<div className={styles.changeWindowPrompt}>
					Already have an account?{" "}
					<u className={styles.changeWindowLink}>
						<Link href="/Register">Register</Link>
					</u>
				</div>
			</div>
		</div>
	);
}
