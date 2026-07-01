import { clsx, type ClassValue } from 'clsx'

/** Une clases condicionalmente. Wrapper de clsx para uso ergonómico. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}
