'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { useAuthentication } from '@/store/useAuthentication';
import { UserCircle, Lock, Bell, Save, Shield } from 'lucide-react';

// --- Schemas ---
const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(3, "Address is too short"),
});

const pinSchema = z.object({
  pin: z
    .string()
    .min(4, "PIN must be 4–6 digits")
    .max(6, "PIN must be 4–6 digits")
    .regex(/^\d+$/, "PIN must contain only digits"),
  confirmPin: z.string(),
}).refine((data) => data.pin === data.confirmPin, {
  message: "PINs do not match",
  path: ["confirmPin"],
});

const notificationSchema = z.object({
  notifications: z.boolean(),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PinFormData = z.infer<typeof pinSchema>;
type NotificationFormData = z.infer<typeof notificationSchema>;

export default function SettingsPage() {
  const user = useAuthentication((state) => state.authenticatedUser);

  // --- Forms with empty default values first ---
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "", address: "" },
  });

  const pinForm = useForm<PinFormData>({
    resolver: zodResolver(pinSchema),
    defaultValues: { pin: "", confirmPin: "" },
  });

  const notifForm = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: { notifications: true },
  });

  // --- Fill forms when user loads ---
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.item.name,
        email: user.item.email,
        address: user.item.address || "",
      });
    }
  }, [user]);

  // --- Submit Handlers ---
  const onProfileSubmit = (data: ProfileFormData) => {
    toast.success("Profile updated successfully!");
    console.log("Profile:", data);
  };

  const onPinSubmit = (data: PinFormData) => {
    toast.success("PIN updated successfully!");
    console.log("PIN:", data);
  };

  const onNotifSubmit = (data: NotificationFormData) => {
    toast.success("Notification setting updated!");
    console.log("Notifications:", data);
  };

  // --- Render loading if user not ready ---
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-10 text-center tracking-tight text-pink-500">
          ⚙️ Dashboard Settings
        </h1>

        {/* --- Profile Form --- */}
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
          <Card className="bg-gray-800 border-gray-700 shadow-2xl shadow-gray-900/50 rounded-2xl mb-6">
            <CardHeader className="flex items-center gap-4">
              <UserCircle size={28} className="text-gray-400" />
              <div>
                <CardTitle className="text-xl font-bold text-gray-100">Profile Information</CardTitle>
                <CardDescription className="text-gray-400 mt-1">
                  Update your account&apos;s profile information.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-gray-300">Name</Label>
                <Input
                  id="name"
                  {...profileForm.register("name")}
                  className="bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500 focus-visible:ring-pink-500 mt-1"
                />
                {profileForm.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{profileForm.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...profileForm.register("email")}
                  className="bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500 focus-visible:ring-pink-500 mt-1"
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-gray-300">Address</Label>
                <Input
                  id="address"
                  {...profileForm.register("address")}
                  className="bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500 focus-visible:ring-pink-500 mt-1"
                />
                {profileForm.formState.errors.address && (
                  <p className="text-red-500 text-sm mt-1">{profileForm.formState.errors.address.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer md:w-auto bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-lg mt-4 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
              >
                <Save size={18} className="mr-2" /> Save Profile
              </Button>
            </CardContent>
          </Card>
        </form>

        {/* --- PIN Form --- */}
        <form onSubmit={pinForm.handleSubmit(onPinSubmit)}>
          <Card className="bg-gray-800 border-gray-700 shadow-2xl shadow-gray-900/50 rounded-2xl mb-6">
            <CardHeader className="flex items-center gap-4">
              <Lock size={28} className="text-gray-400" />
              <div>
                <CardTitle className="text-xl font-bold text-gray-100">Change PIN</CardTitle>
                <CardDescription className="text-gray-400 mt-1">
                  Ensure your account is secure with a new PIN.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="pin" className="text-gray-300">New PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  {...pinForm.register("pin")}
                  placeholder="••••"
                  className="bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500 focus-visible:ring-green-500 mt-1"
                />
                {pinForm.formState.errors.pin && (
                  <p className="text-red-500 text-sm mt-1">{pinForm.formState.errors.pin.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="confirmPin" className="text-gray-300">Confirm PIN</Label>
                <Input
                  id="confirmPin"
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  {...pinForm.register("confirmPin")}
                  placeholder="••••"
                  className="bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500 focus-visible:ring-green-500 mt-1"
                />
                {pinForm.formState.errors.confirmPin && (
                  <p className="text-red-500 text-sm mt-1">{pinForm.formState.errors.confirmPin.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg mt-4 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
              >
                <Shield size={18} className="mr-2" /> Save PIN
              </Button>
            </CardContent>
          </Card>
        </form>

        {/* --- Notification Form --- */}
        <form onSubmit={notifForm.handleSubmit(onNotifSubmit)}>
          <Card className="bg-gray-800 border-gray-700 shadow-2xl shadow-gray-900/50 rounded-2xl mb-6">
            <CardHeader className="flex items-center gap-4">
              <Bell size={28} className="text-gray-400" />
              <div>
                <CardTitle className="text-xl font-bold text-gray-100">Notification Preferences</CardTitle>
                <CardDescription className="text-gray-400 mt-1">
                  Decide which notifications you would like to receive.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700 cursor-pointer">
                <div className="flex flex-col">
                  <h3 className="font-medium text-gray-100">Email Notifications</h3>
                  <p className="text-sm text-gray-400 mt-1">Receive email alerts for important updates.</p>
                </div>
                <Switch {...notifForm.register("notifications")} />
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer md:w-auto bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-lg mt-4 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
              >
                <Save size={18} className="mr-2" /> Save Settings
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
