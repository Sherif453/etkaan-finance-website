import "server-only";
import { JWT } from "google-auth-library";

type LeadRow = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export async function appendLeadRow(row: LeadRow) {
  const clientEmail = getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(
    /\\n/g,
    "\n"
  );
  const spreadsheetId = getRequiredEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const sheetName = getRequiredEnv("GOOGLE_SHEETS_SHEET_NAME");

  const auth = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const accessToken = await auth.getAccessToken();
  const token = accessToken.token;

  if (!token) {
    throw new Error("Google auth did not return an access token");
  }

  const range = encodeURIComponent(`${sheetName}!A:K`);
  const url = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append`
  );
  url.searchParams.set("valueInputOption", "USER_ENTERED");
  url.searchParams.set("insertDataOption", "INSERT_ROWS");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      values: [row]
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google Sheets append failed: ${response.status} ${detail}`);
  }
}
