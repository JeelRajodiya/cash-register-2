import { setCookie } from "cookies-next";
import { NextRouter, useRouter } from "next/router";
import Button from "@mui/material/Button";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";
import { useState } from "react";
import ShowAlert from "../components/ShowAlert";
import type { errorType } from "../components/ShowAlert";
const theme = createTheme({
	palette: {
		primary: blue,
		secondary: blue,
	},
});

async function performLogin(
	router: NextRouter,
	email: string,
	password: string,
	setShowAlert: (value: boolean) => void,
	setAlertMessage: (value: string) => void,
	setAlertType: (value: errorType) => void
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
	const status = response.status;
	let serverResponse: any;
	if (status === 200) {
		serverResponse = await response.json();
		setCookie("session", serverResponse.session, {
			maxAge: 60 * 60 * 24 * 365,
		});
		setCookie("email", email, { maxAge: 60 * 60 * 24 * 365 });
		router.push("/Home");
	} else {
		serverResponse = await response.text();
		setShowAlert(true);
		setAlertMessage(`${status} : ${serverResponse}`);
		setAlertType("error");
		setTimeout(() => {
			setShowAlert(false);
		}, 5000);
	}
}

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState<errorType>("error");

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
				{showAlert && (
					<ShowAlert
						message={alertMessage}
						type={alertType}
					></ShowAlert>
				)}
				<Button
					color="primary"
					variant="contained"
					onClick={() =>
						performLogin(
							router,
							email,
							password,
							setShowAlert,
							setAlertMessage,
							setAlertType
						)
					}
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
