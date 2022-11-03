import Head from "next/head";
import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

interface child {
	children: ReactNode;
}

export default function Layout({ children }: child) {
	const router = useRouter();
	// make sure the user is logged in

	useEffect(() => {
		const session = getCookie("session")?.toString();
		// if (session === undefined) {
		// router.push("/Login");
		// }
	});

	return (
		<main style={{ height: "100%" }}>
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
