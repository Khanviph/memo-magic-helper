import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { setPassword, verifyPassword, isPasswordSet, changePassword } from "../services/authService";

interface PasswordPromptProps {
  onAuthenticated: () => void;
}

export const PasswordPrompt = ({ onAuthenticated }: PasswordPromptProps) => {
  const [password, setPasswordInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSettingPassword, setIsSettingPassword] = useState(true);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkPassword = async () => {
      const hasPassword = await isPasswordSet();
      setIsSettingPassword(!hasPassword);
    };
    checkPassword();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSettingPassword) {
      if (password.length < 4) {
        toast({
          description: "密码长度至少需要4位",
          variant: "destructive",
        });
        return;
      }
      await setPassword(password);
      toast({
        description: "密码设置成功",
      });
      onAuthenticated();
    } else if (isChangingPassword) {
      if (newPassword.length < 4) {
        toast({
          description: "新密码长度至少需要4位",
          variant: "destructive",
        });
        return;
      }
      const success = await changePassword(password, newPassword);
      if (success) {
        toast({
          description: "密码修改成功",
        });
        setIsChangingPassword(false);
        onAuthenticated();
      } else {
        toast({
          description: "当前密码错误",
          variant: "destructive",
        });
      }
    } else {
      const isValid = await verifyPassword(password);
      if (isValid) {
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
          {isSettingPassword 
            ? "设置访问密码" 
            : isChangingPassword 
              ? "修改访问密码" 
              : "请输入访问密码"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder={isSettingPassword ? "请设置密码" : "请输入当前密码"}
            className="w-full"
          />
          {isChangingPassword && (
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="请输入新密码"
              className="w-full"
            />
          )}
          <Button type="submit" className="w-full">
            {isSettingPassword 
              ? "设置密码" 
              : isChangingPassword 
                ? "修改密码" 
                : "验证密码"}
          </Button>
          {!isSettingPassword && !isChangingPassword && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setIsChangingPassword(true)}
            >
              修改密码
            </Button>
          )}
          {isChangingPassword && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsChangingPassword(false);
                setNewPassword("");
              }}
            >
              取消
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
};