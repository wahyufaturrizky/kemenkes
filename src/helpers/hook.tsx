import * as XLSX from 'xlsx';

interface DownloadFileType {
  header: string[]
  body: any
  verticalHeader: string[]
  fileName: string
}

export const downloadFile = async (
  { header, body, verticalHeader, fileName }: DownloadFileType
) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Prepare the data
  let data = body;
  if (verticalHeader) {
    data = data.map((row: any, index: any) => [verticalHeader[index], ...row]);
  }
  if (header) {
    data.unshift(header);
  }

  // Create a worksheet
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Generate the Excel file
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Create a Blob from the buffer
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Create a download link and trigger the download
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.xlsx`;
  a.click();

  // Clean up
  window.URL.revokeObjectURL(url);
};