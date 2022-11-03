import styles from "../styles/Navbar.module.css";
import Link from "next/link";
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<Link href="/Home" className={styles.listItem}>
				Home
			</Link>
			<Link href="/Search" className={styles.listItem}>
				Search
			</Link>
			<Link href="/Graph" className={styles.listItem}>
				Graph
			</Link>
			<Link href="/Account" className={styles.listItem}>
				Account
			</Link>
		</nav>
	);
}
