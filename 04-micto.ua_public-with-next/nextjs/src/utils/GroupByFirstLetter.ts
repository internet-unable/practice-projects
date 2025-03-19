export default function groupByFirstLetter<T>(
  array: T[],
  key: keyof T
): [Record<string, T[]>, string[]] {
  const grouped = array.reduce((acc, item) => {
    const value = item[key];
    if (typeof value === "string" && value.length > 0) {
      const firstLetter = value[0];

      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(item);
    }
    return acc;
  }, {} as Record<string, T[]>);

  const firstLetters = Object.keys(grouped);

  return [grouped, firstLetters];
}
