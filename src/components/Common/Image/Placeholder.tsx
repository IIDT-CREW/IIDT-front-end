import cn from 'utils/cn'

const Placeholder = ({ isVisible, className, ...props }: { isVisible: boolean } & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'h-full left-0 absolute top-0 w-full bg-gray-400 transition-opacity duration-[600ms]',
      isVisible ? 'opacity-100' : 'opacity-0',
      className,
    )}
    {...props}
  />
)

export default Placeholder
