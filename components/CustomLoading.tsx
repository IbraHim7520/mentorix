import { cn } from "@/lib/utils"

interface LoaderProps extends React.ComponentProps<"div"> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

function CustomLoader({ className, label = "Loading...", size = "md", ...props }: LoaderProps) {
  const sizeClasses = {
    sm: "size-6",
    md: "size-10",
    lg: "size-16"
  }

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex flex-col justify-center items-center bg-white/80 backdrop-blur-md transition-opacity duration-300",
        className
      )} 
      {...props}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Glow / Pulse */}
        <div className={cn(
          "absolute inset-0 rounded-full bg-purple-500/20 blur-xl animate-pulse",
          sizeClasses[size]
        )} />
        
        {/* The Main Spinner */}
        <svg
          className={cn("animate-spin text-purple-600", sizeClasses[size])}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-100"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>

      {/* Optional Elegant Text */}
      {label && (
        <p className="mt-4 text-sm font-medium text-slate-500 tracking-widest uppercase animate-pulse">
          {label}
        </p>
      )}
    </div>
  )
}

export default CustomLoader