import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertDemoProps {
  title: string;
  description: string;
  type: "success" | "error";
}

export const AlertDemo: React.FC<AlertDemoProps> = ({ title, description, type }) => {
  return (
    <Alert className={type === "success" ? "text-green-600" : "text-red-600"}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
