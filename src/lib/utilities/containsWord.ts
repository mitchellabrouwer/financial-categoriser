import pluralize from "pluralize";

export const containsFullWord = (phrase: string, target: string): boolean => {
  const cleanPhrase = phrase.replace(/'/g, "");
  const cleanTarget = target.replace(/'/g, "");

  const words = cleanTarget.split(/\s+/);
  const lastWord = words.pop() as string;

  const variations = [pluralize(lastWord), pluralize.singular(lastWord)];

  if (words.length) {
    const prefix = words.join(" ");
    variations.forEach((variation, index) => {
      variations[index] = `${prefix} ${variation}`;
    });
  }

  const regex = new RegExp(`\\b(${variations.join("|")})\\b`, "i");
  return regex.test(cleanPhrase);
};

export const containsWordPartial = (
  phrase: string,
  target: string,
): boolean => {
  const cleanPhrase = phrase.replace(/'/g, "").toLowerCase();
  const cleanTarget = target.replace(/'/g, "").toLowerCase();

  const words = cleanPhrase.split(/\s+/);

  return words.some((word) => word.includes(cleanTarget));
};
