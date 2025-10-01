export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    link: 'text-primary hover:text-primary-hover underline-offset-4 hover:underline bg-transparent p-0',
  };
  
  const sizes = {
    xs: 'btn-sm',
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    xl: 'btn-xl',
  };

  const buttonClasses = [
    baseStyles,
    variants[variant],
    sizes[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
      {...props}
    >
      {isLoading && (
        <div className="spinner w-4 h-4 mr-2" />
      )}
      {children}
    </button>
  );
};
