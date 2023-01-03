import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<Link href="/Home" className={styles.listItem}>
				<Image
					src="/icons/home.svg"
					alt="home"
					width={25}
					height={25}
					className={styles.navIcon}
				/>
			</Link>
			<Link href="/Search" className={styles.listItem}>
				<Image
					src="/icons/search.svg"
					alt="search"
					width={25}
					height={25}
					className={styles.navIcon}
				/>
			</Link>
			<Link href="/Graph" className={styles.listItem}>
				<Image
					src="/icons/graph.svg"
					alt="graph"
					width={25}
					height={25}
					className={styles.navIcon}
				/>
			</Link>
			<Link href="/Account" className={styles.listItem}>
				<Image
					src="/icons/account.svg"
					alt="user"
					width={25}
					height={25}
					className={styles.navIcon}
				/>
			</Link>
		</nav>
	);
}
