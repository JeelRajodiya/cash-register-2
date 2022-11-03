import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";

interface child {
	children: ReactNode;
}

export default function Layout({ children }: child) {
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
