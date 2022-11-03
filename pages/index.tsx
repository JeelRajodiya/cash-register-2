import type { NextPage } from "next";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useEffect } from "react";
const Handler: NextPage = () => {
	const router = useRouter();
	useEffect(() => {
		const session = getCookie("session")?.toString();
		if (session === undefined) {
			router.push("/Login");
		} else {
			router.push("/Home");
		}
	});
	return <Layout>Starting ...</Layout>;
};

export default Handler;
