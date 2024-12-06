import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { setPassword, verifyPassword, isPasswordSet } from "../services/authService";

interface PasswordPromptProps {
  onAuthenticated: () => void;
}

export const PasswordPrompt = ({ onAuthenticated }: PasswordPromptProps) => {
  const [password, setPasswordInput] = useState("");
  const [isSettingPassword, setIsSettingPassword] = useState(!isPasswordSet());
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSettingPassword) {
      if (password.length < 4) {
        toast({
          description: "密码长度至少需要4位",
          variant: "destructive",
        });
        return;
      }
      setPassword(password);
      toast({
        description: "密码设置成功",
      });
      onAuthenticated();
    } else {
      if (verifyPassword(password)) {
        onAuthenticated();
      } else {
        toast({
          description: "密码错误",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          {isSettingPassword ? "设置访问密码" : "请输入访问密码"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder={isSettingPassword ? "请设置密码" : "请输入密码"}
            className="w-full"
          />
          <Button type="submit" className="w-full">
            {isSettingPassword ? "设置密码" : "验证密码"}
          </Button>
        </form>
      </Card>
    </div>
  );
};