export function normalizeEgyptianMobile(input: string): string | null {
  let digits = input.replace(/\D/g, "");

  if (digits.startsWith("0020")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("20") && digits.length === 12) {
    digits = `0${digits.slice(2)}`;
  }

  if (digits.length === 10 && digits.startsWith("1")) {
    digits = `0${digits}`;
  }

  return /^01[0125]\d{8}$/.test(digits) ? digits : null;
}

