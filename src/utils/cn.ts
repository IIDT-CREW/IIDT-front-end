import { clsx, type ClassValue } from 'clsx'

/**
 * Utility function for combining Tailwind CSS classes
 * Wraps clsx for consistent usage
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs)
}

export default cn
