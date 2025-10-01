export const Input = ({ 
  label, 
  error, 
  type = 'text', 
  required = false,
  icon: Icon,
  success = false,
  className = '',
  ...props 
}) => {
  const inputClasses = [
    'input-field',
    Icon ? 'pl-12' : '',
    error ? 'error' : '',
    success ? 'success' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
        )}
        <input
          type={type}
          className={inputClasses}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error flex items-center">
          <span className="w-1 h-1 bg-error rounded-full mr-2"></span>
          {error}
        </p>
      )}
      {success && !error && (
        <p className="text-sm text-success flex items-center">
          <span className="w-1 h-1 bg-success rounded-full mr-2"></span>
          Looks good!
        </p>
      )}
    </div>
  );
};
