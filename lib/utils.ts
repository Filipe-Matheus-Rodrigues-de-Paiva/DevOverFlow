import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTimeElapsed(createdAt: Date): string {
  return formatDistanceToNow(createdAt, { addSuffix: true, locale: ptBR });
}

export function formatAndDivideNumber(number: number): string {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)} mi`;
  } else if (number >= 1000) {
    return `${(number / 1000).toFixed(1)} mil`;
  } else {
    return `${number}`;
  }
}
