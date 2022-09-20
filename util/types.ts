export interface User {
	userID: string;
	passwordHash: string;
	email: string;
	sessions: string[];
}

export interface Entry {
	userID: string;
	entryID: string;
	amount: number;
	description?: string;
	date: Date;
}
