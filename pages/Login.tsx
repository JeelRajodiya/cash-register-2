import { setCookie } from "cookies-next";
import { NextRouter, useRouter } from "next/router";
import Button from "@mui/material/Button";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";
import { useState } from "react";

const theme = createTheme({
	palette: {
		primary: blue,
		secondary: blue,
	},
});

async function performLogin(
	router: NextRouter,
	email: string,
	password: string
) {
	console.log(email, password);
	const response = await fetch("/api/login", {
		method: "POST",
		body: JSON.stringify({
			email: email,
			password: password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.text();
	console.log(data);

	// setCookie("session", "true");

	// router.push("/");
}

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className={styles.wrapper}>
			<h2>Login to Your Account</h2>
			<div className={styles.loginPage}>
				<div className={styles.label}>Email</div>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="chad@example.com"
					className={styles.inputField}
				/>
				<div className={styles.label}>Password</div>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="chad loves 699"
					className={styles.inputField}
				/>
				<Button
					color="primary"
					variant="contained"
					onClick={() => performLogin(router, email, password)}
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
