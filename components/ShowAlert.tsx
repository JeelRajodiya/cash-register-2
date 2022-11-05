import { Alert } from "@mui/material";
export type errorType = "error" | "warning" | "info" | "success";
interface Props {
	message: string;
	type: errorType;
}
export default function showAlert(props: Props) {
	return <Alert severity={props.type}>{props.message} </Alert>;
}
