import React, { forwardRef } from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'neutral';
  loading?: boolean;
  active?: boolean;
}

export const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  variant = 'neutral', 
  className = '', 
  loading = false,
  active = false,
  disabled,
  ...props 
}) => {
  // Increased text-sm to text-base/lg and padding
  const baseStyles = "font-pixel uppercase px-5 py-3 text-lg border-4 border-black shadow-pixel active:shadow-pixel-active active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-pixel-primary text-white hover:bg-red-600",
    secondary: "bg-pixel-secondary text-black hover:bg-teal-400",
    danger: "bg-red-700 text-white hover:bg-red-800",
    neutral: "bg-white text-black hover:bg-gray-100"
  };

  const activeStyle = active ? "translate-x-[2px] translate-y-[2px] shadow-pixel-active bg-gray-200" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${activeStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "..." : children}
    </button>
  );
};

interface PixelCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

export const PixelCard: React.FC<PixelCardProps> = ({ title, children, className = '', headerClassName='', bodyClassName='' }) => {
  return (
    <div className={`bg-white border-4 border-black shadow-pixel flex flex-col ${className}`}>
      {title && (
        <div className={`bg-pixel-dark text-white font-pixel p-3 text-xl border-b-4 border-black flex justify-between items-center shrink-0 ${headerClassName}`}>
          <span>{title}</span>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-red-500 border border-white"></div>
            <div className="w-4 h-4 bg-yellow-400 border border-white"></div>
            <div className="w-4 h-4 bg-green-500 border border-white"></div>
          </div>
        </div>
      )}
      <div className={`p-5 flex-1 min-h-0 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export const PixelInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input 
      {...props}
      className={`w-full font-pixel bg-gray-100 border-4 border-black p-3 text-lg focus:outline-none focus:bg-white focus:shadow-pixel-sm transition-all ${props.className || ''}`}
    />
  );
};

export const PixelTextArea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>((props, ref) => {
  return (
    <textarea 
      ref={ref}
      {...props}
      className={`w-full font-pixel bg-gray-100 border-4 border-black p-3 text-lg focus:outline-none focus:bg-white focus:shadow-pixel-sm transition-all ${props.className || ''}`}
    />
  );
});
PixelTextArea.displayName = 'PixelTextArea';
