import classNames from 'classnames'

/**
 * Utility function for combining Tailwind CSS classes
 * Wraps classnames library for consistent usage
 */
export function cn(...inputs: classNames.ArgumentArray): string {
  return classNames(...inputs)
}

export default cn
