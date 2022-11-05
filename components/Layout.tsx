import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";
import { NextRouter, useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

interface child {
	children: ReactNode;
}

async function isValidSession(session: string) {
	const response = await fetch("/api/login", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			session: session,
		}),
	});
	const status = response.status;
	if (status === 200) {
		return true;
	}
	return false;
}
async function checkIfUserIsLoggedIn(router: NextRouter) {
	const session = getCookie("session")?.toString();

	if (session === undefined) {
		router.push("/Login");
	} else if (!(await isValidSession(session))) {
		router.push("/Login");
	}
}
export default function Layout({ children }: child) {
	const router = useRouter();
	// make sure the user is logged in

	useEffect(() => {
		checkIfUserIsLoggedIn(router);
	});
	const [value, setValue] = useState(0);

	return (
		<main style={{ height: "100%" }} className={styles.wrapper}>
			<Head>
				<title>Cash Register</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<main className={styles.container}>
				{children}
				<Navbar />
			</main>
		</main>
	);
}
