import Layout from "../components/Layout";
import { getCookie, setCookie } from "cookies-next";
import { Button } from "@mui/material";
import { NextRouter, useRouter } from "next/router";

async function performLogout(router: NextRouter) {
	const response = await fetch("/api/login", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ session: getCookie("session") }),
	});
	const status = response.status;
	if (status === 200) {
		router.push("/Login");
		setCookie("session", "", { expires: new Date(0) });
	} else {
		alert("Logout failed");
	}
}
export default function Search() {
	const router = useRouter();
	return (
		<Layout>
			<div style={{ height: "100%", width: "100%" }}>
				<h3>
					Logged in As <code>{getCookie("email")?.toString()}</code>
				</h3>
				<Button
					sx={{ width: "100%" }}
					variant="contained"
					color="error"
					onClick={() => performLogout(router)}
				>
					Logout
				</Button>
			</div>
		</Layout>
	);
}
// skeleton
