import React from 'react';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
} from 'react-native';

interface ActionButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;

  variant?:
    | 'primary'
    | 'success'
    | 'secondary'
    | 'danger';

  disabled?: boolean;

  fullWidth?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  fullWidth = true,
}) => {
  const variantClasses = {
    primary: 'bg-blue-900',
    success: 'bg-emerald-600',
    secondary: 'bg-slate-200',
    danger: 'bg-red-600',
  };

  const textClasses = {
    primary: 'text-white',
    success: 'text-white',
    secondary: 'text-slate-700',
    danger: 'text-white',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`
        ${fullWidth ? 'w-full' : ''}
        py-3.5
        px-5
        rounded-xl
        items-center
        justify-center
        ${fullWidth ? 'my-2' : ''}
        shadow-sm
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50' : ''}
      `}
    >
      <Text
        className={`
          font-bold
          text-base
          tracking-wide
          ${textClasses[variant]}
        `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};