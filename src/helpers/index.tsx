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

export function formatNumber(number: number) {
  return (number || 0).toLocaleString('id-Id')
}
