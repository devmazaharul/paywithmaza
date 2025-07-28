import {
  AlertCircleIcon,
  CheckCircle2Icon,
} from "lucide-react";

type stype = "default" | "destructive";

interface AlertMessageProps {
  title: string;
  desc: string;
  type: stype;
}

export function Alertmessage({ title, desc, type }: AlertMessageProps) {
  // Icon & style mapping based on type
  const config = {
    default: {
      icon: <CheckCircle2Icon size={18} className="text-green-500" />,
      bg: "bg-green-800/10",
      text: "text-green-500",
    },
    destructive: {
      icon: <AlertCircleIcon size={18} className="text-red-500" />,
      bg: "bg-red-600/10",
      text: "text-red-600",
    },
  };

  const { icon, bg, text } = config[type];

  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <div className={`${bg} ${text} p-2 rounded-md`}>
        <div className="flex items-center gap-1 mb-1">
          {icon}
          <h1 className=" capitalize py-1 ">{title}</h1>
        </div>
        <p className={`${type=="destructive"?"text-red-700":"text-green-600"} text-sm px-4`} >{desc}</p>
      </div>
    </div>
  );
}
