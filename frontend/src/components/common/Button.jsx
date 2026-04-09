import { classNames } from '../../utils/classNames';

function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  return (
    <button
      type={type}
      className={classNames('button', `button--${variant}`, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
