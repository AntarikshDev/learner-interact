import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft, Bell, Mail, Moon, Sun, Monitor, Globe, Lock, Shield, 
  Eye, Database, Smartphone, Clock, Palette, Zap, MessageSquare,
  Download, Upload, Trash2, Settings, Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPreferencesPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [studentActivity, setStudentActivity] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Display preferences
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("24");
  const [fontSize, setFontSize] = useState([16]);
  const [compactMode, setCompactMode] = useState(false);

  // Privacy & Security
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [activityLog, setActivityLog] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState("private");

  // Accessibility
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(true);

  const handleSave = () => {
    toast({
      title: "Preferences saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const notificationChannels = [
    { id: "email", label: "Email Notifications", icon: Mail, enabled: emailNotifications, setter: setEmailNotifications },
    { id: "push", label: "Push Notifications", icon: Bell, enabled: pushNotifications, setter: setPushNotifications },
    { id: "sms", label: "SMS Notifications", icon: Smartphone, enabled: smsNotifications, setter: setSmsNotifications },
  ];

  const notificationTypes = [
    { id: "course", label: "Course Updates", description: "New courses, content updates, and announcements", enabled: courseUpdates, setter: setCourseUpdates },
    { id: "student", label: "Student Activity", description: "Enrollments, completions, and engagement alerts", enabled: studentActivity, setter: setStudentActivity },
    { id: "system", label: "System Alerts", description: "Security alerts, system maintenance, and errors", enabled: systemAlerts, setter: setSystemAlerts },
    { id: "reports", label: "Weekly Reports", description: "Performance summaries and analytics", enabled: weeklyReports, setter: setWeeklyReports },
    { id: "marketing", label: "Marketing Emails", description: "Product updates, tips, and promotional content", enabled: marketingEmails, setter: setMarketingEmails },
  ];

  const sessions = [
    { id: 1, device: "Chrome on Windows", location: "Mumbai, India", lastActive: "5 minutes ago", current: true },
    { id: 2, device: "Safari on iPhone", location: "Delhi, India", lastActive: "2 hours ago", current: false },
    { id: 3, device: "Firefox on macOS", location: "Bangalore, India", lastActive: "1 day ago", current: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin-dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Preferences</h1>
              <p className="text-muted-foreground">Customize your platform experience</p>
            </div>
          </div>
          <Button onClick={handleSave}>
            <Check className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notificationChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div key={channel.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <Label htmlFor={channel.id} className="font-medium cursor-pointer">
                          {channel.label}
                        </Label>
                      </div>
                      <Switch
                        id={channel.id}
                        checked={channel.enabled}
                        onCheckedChange={channel.setter}
                      />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>Manage what notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notificationTypes.map((type) => (
                  <div key={type.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="space-y-1 flex-1">
                      <Label htmlFor={type.id} className="font-medium cursor-pointer">
                        {type.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                    <Switch
                      id={type.id}
                      checked={type.enabled}
                      onCheckedChange={type.setter}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display Tab */}
          <TabsContent value="display" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Theme</Label>
                  <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
                    <div>
                      <RadioGroupItem value="light" id="light" className="peer sr-only" />
                      <Label
                        htmlFor="light"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                      >
                        <Sun className="mb-2 h-6 w-6" />
                        Light
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                      <Label
                        htmlFor="dark"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                      >
                        <Moon className="mb-2 h-6 w-6" />
                        Dark
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="system" id="system" className="peer sr-only" />
                      <Label
                        htmlFor="system"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                      >
                        <Monitor className="mb-2 h-6 w-6" />
                        System
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Font Size</Label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Small</span>
                    <Slider
                      value={fontSize}
                      onValueChange={setFontSize}
                      min={12}
                      max={20}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">Large</span>
                    <Badge variant="outline">{fontSize}px</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing and padding</p>
                  </div>
                  <Switch checked={compactMode} onCheckedChange={setCompactMode} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Localization</CardTitle>
                <CardDescription>Set your language, timezone, and format preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger id="timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select value={dateFormat} onValueChange={setDateFormat}>
                      <SelectTrigger id="dateFormat">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeFormat">Time Format</Label>
                    <Select value={timeFormat} onValueChange={setTimeFormat}>
                      <SelectTrigger id="timeFormat">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12-hour</SelectItem>
                        <SelectItem value="24">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <Label className="font-medium">Two-Factor Authentication</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {twoFactorAuth && <Badge variant="outline">Enabled</Badge>}
                    <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout</Label>
                  <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                    <SelectTrigger id="sessionTimeout">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after this period of inactivity
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Activity Log</Label>
                    <p className="text-sm text-muted-foreground">Keep track of account activity</p>
                  </div>
                  <Switch checked={activityLog} onCheckedChange={setActivityLog} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage devices that are currently logged in</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{session.device}</p>
                              {session.current && <Badge variant="outline">Current</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{session.location}</p>
                            <p className="text-xs text-muted-foreground">Last active: {session.lastActive}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Button variant="destructive" className="w-full mt-4">
                  Sign Out All Other Sessions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Controls</CardTitle>
                <CardDescription>Control your data and profile visibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <RadioGroup value={profileVisibility} onValueChange={setProfileVisibility}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public" className="cursor-pointer">
                        Public - Visible to everyone
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="organization" id="organization" />
                      <Label htmlFor="organization" className="cursor-pointer">
                        Organization - Visible to your organization only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private" className="cursor-pointer">
                        Private - Only visible to you
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Analytics & Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">Help improve the platform</p>
                  </div>
                  <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accessibility Tab */}
          <TabsContent value="accessibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Options</CardTitle>
                <CardDescription>Customize the platform for your accessibility needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="space-y-1 flex-1">
                    <Label className="font-medium">High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                </div>

                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="space-y-1 flex-1">
                    <Label className="font-medium">Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimize animations and transitions
                    </p>
                  </div>
                  <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
                </div>

                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="space-y-1 flex-1">
                    <Label className="font-medium">Screen Reader Support</Label>
                    <p className="text-sm text-muted-foreground">
                      Optimize for screen reader compatibility
                    </p>
                  </div>
                  <Switch checked={screenReader} onCheckedChange={setScreenReader} />
                </div>

                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="space-y-1 flex-1">
                    <Label className="font-medium">Keyboard Navigation</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable enhanced keyboard shortcuts
                    </p>
                  </div>
                  <Switch checked={keyboardNav} onCheckedChange={setKeyboardNav} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Export, import, and manage your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <Label className="font-medium">Export Your Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Download a copy of all your data
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Request Data Export
                  </Button>
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <Label className="font-medium">Import Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Import your data from another platform
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>
                </div>

                <div className="p-4 border border-destructive rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <Trash2 className="h-5 w-5 text-destructive" />
                    <div className="flex-1">
                      <Label className="font-medium text-destructive">Delete Account</Label>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                  </div>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete My Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Developer and advanced user options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API Access</Label>
                  <div className="flex gap-2">
                    <Input value="sk_live_xxxxxxxxxxxxxxxxxxxxx" readOnly />
                    <Button variant="outline">Copy</Button>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input placeholder="https://your-domain.com/webhook" />
                </div>

                <div className="space-y-2">
                  <Label>Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable console logging for troubleshooting
                  </p>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
