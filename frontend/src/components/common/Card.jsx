export const Card = ({ 
  children, 
  className = '', 
  title, 
  action, 
  variant = 'default',
  hover = false,
  ...props 
}) => {
  const cardClasses = [
    'card',
    hover ? 'card-hover' : '',
    variant === 'elevated' ? 'card-elevated' : '',
    variant === 'flat' ? 'card-flat' : '',
    variant === 'outlined' ? 'card-outlined' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {(title || action) && (
        <div className="card-header">
          <div className="flex items-center justify-between">
            {title && (
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {title}
              </h3>
            )}
            {action && <div>{action}</div>}
          </div>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};
