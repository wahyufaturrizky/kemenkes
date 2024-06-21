export function standardOptionSameLabel(data: any[]) {
  const value = data.map((r) => {
    return {
      label: r,
      value: r,
    };
  });
  return value;
}
export function standardOptions(data: any[], key1: string, key2: string) {
  const value = (data || [])?.map((r) => {
    return {
      label: r[key1],
      value: r[key2],
    };
  });
  return value;
}

export function generateYearsArray(startYear: number, endYear: number) {
  const yearsArray = [];
  for (let year = startYear; year <= endYear; year++) {
    yearsArray.push(year);
  }
  return yearsArray.sort((a, b) => b - a);
}

export function formatNumber(input: number) {
  // Coba konversi input ke angka
  const number = typeof input === "number" ? input : parseFloat(String(input));

  // Jika hasil konversi bukan angka (NaN), setel nilai default menjadi 0
  if (isNaN(number)) {
    return Intl.NumberFormat("id-ID").format(0);
  }
  // Format angka dengan dua digit desimal dan konversi kembali ke angka
  const formattedNumber = Number(number.toFixed(2));

  // Format angka sesuai dengan lokal Indonesia
  return Intl.NumberFormat("id-ID").format(formattedNumber);
  // return Intl.NumberFormat("id-ID").format(Number((number || 0)?.toFixed(2)));
}

export function ageResponseConvert(data: any) {
  let pct_1_2: any = {};
  let pct_2_3: any = {};
  let pct_3_4: any = {};
  let pct_4_5: any = {};

  for (const [key, value] of Object.entries(data)) {
    if (key.endsWith("_1_2")) {
      pct_1_2[key] = value;
    } else if (key.endsWith("_2_3")) {
      pct_2_3[key] = value;
    } else if (key.endsWith("_3_4")) {
      pct_3_4[key] = value;
    } else if (key.endsWith("_4_5")) {
      pct_4_5[key] = value;
    }
  }

  return {
    pct_1_2, pct_2_3, pct_3_4, pct_4_5
  }
}