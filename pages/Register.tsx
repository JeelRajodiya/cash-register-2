import { NextRouter, useRouter } from "next/router";
import Button from "@mui/material/Button";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { useState } from "react";
import type { errorType } from "../components/ShowAlert";
import ShowAlert from "../components/ShowAlert";
import { setCookie } from "cookies-next";

export default function Register() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState<errorType>("error");
	async function performRegister(
		router: NextRouter,
		email: string,
		password: string,
		confirmPassword: string
	) {
		if (password !== confirmPassword) {
			setShowAlert(true);
			setAlertMessage("Passwords do not match");
			setAlertType("error");
			setTimeout(() => {
				setShowAlert(false);
			}, 5000);
		}
		const response = await fetch("/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		let serverResponse: any;

		const status = response.status;
		if (status === 200) {
			serverResponse = await response.json();
			setCookie("session", serverResponse.session);
			setCookie("email", email);
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
					placeholder="chad loves 69"
					className={styles.inputField}
				/>
				<div className={styles.label}>Password (Again)</div>
				<input
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					type="password"
					placeholder="chad loves 69"
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
						performRegister(
							router,
							email,
							password,
							confirmPassword
						)
					}
					sx={{ marginTop: "1rem" }}
				>
					Register
				</Button>
				<div className={styles.changeWindowPrompt}>
					Don&apos;t have an Account?{" "}
					<u className={styles.changeWindowLink}>
						<Link href="/Login">Login</Link>
					</u>
				</div>
			</div>
		</div>
	);
}
// 12
