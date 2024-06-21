import { API_URL } from "./config";

export const downloadFile = async (
  header: any,
  body: any,
  verticalHeader: any,
  fileName: string
) => {
  const url = `${API_URL}/v1/csv/download`;
  const data = {
    header,
    body,
    verticalHeader,
    fileName,
    title: fileName,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();

    const downloadUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${data.fileName}.xlsx`;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
