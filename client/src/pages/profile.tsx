import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Wallet } from "@/components/Wallet";
import { useI18n } from "@/hooks/useI18n";

export default function Profile() {
  const { t } = useI18n();
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-4 ring-background shadow-lg">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">Senior Product Designer • San Francisco, CA</p>
            <div className="flex gap-2 justify-center md:justify-start">
              <Button size="sm">{t("profile.editProfile")}</Button>
              <Button size="sm" variant="outline">{t("profile.share")}</Button>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("profile.personalInfo")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("profile.firstName")}</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("profile.lastName")}</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("profile.email")}</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">{t("profile.bio")}</Label>
                <Input id="bio" defaultValue="Product Designer with 5+ years of experience." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("profile.skills")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                 {["UI Design", "UX Research", "Figma", "Prototyping", "React", "Tailwind CSS"].map((skill) => (
                   <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                     {skill}
                   </span>
                 ))}
                 <button className="px-3 py-1 border border-dashed rounded-full text-sm font-medium text-muted-foreground hover:text-foreground">
                   + {t("profile.addSkill")}
                 </button>
              </div>
            </CardContent>
          </Card>

          <Wallet />
        </div>
      </div>
    </DashboardLayout>
  );
}
