"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Edit3,
  Save,
  X,
  Activity,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react"

interface ProfilePageProps {
  theme?: string
  language?: string
}

export default function ProfilePage({ theme = "light", language = "en" }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@analyticspro.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Senior Analytics Manager with 8+ years of experience in data-driven decision making and business intelligence.",
    joinDate: "January 2022",
    department: "Analytics & Insights",
    role: "Senior Manager",
  })

  const translations = {
    en: {
      profile: "Profile",
      editProfile: "Edit Profile",
      cancel: "Cancel",
      saveChanges: "Save Changes",
      personalInfo: "Personal Information",
      recentActivity: "Recent Activity",
      achievements: "Achievements",
    },
    es: {
      profile: "Perfil",
      editProfile: "Editar Perfil",
      cancel: "Cancelar",
      saveChanges: "Guardar Cambios",
      personalInfo: "Información Personal",
      recentActivity: "Actividad Reciente",
      achievements: "Logros",
    },
    fr: {
      profile: "Profil",
      editProfile: "Modifier le Profil",
      cancel: "Annuler",
      saveChanges: "Sauvegarder",
      personalInfo: "Informations Personnelles",
      recentActivity: "Activité Récente",
      achievements: "Réalisations",
    },
    de: {
      profile: "Profil",
      editProfile: "Profil Bearbeiten",
      cancel: "Abbrechen",
      saveChanges: "Änderungen Speichern",
      personalInfo: "Persönliche Informationen",
      recentActivity: "Letzte Aktivität",
      achievements: "Erfolge",
    },
  }

  const t = translations[language as keyof typeof translations] || translations.en

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to a backend
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  const activityData = [
    { action: "Generated Revenue Report", time: "2 hours ago", type: "report" },
    { action: "Updated Dashboard Settings", time: "1 day ago", type: "settings" },
    { action: "Exported Product Analytics", time: "3 days ago", type: "export" },
    { action: "Created Comparison Analysis", time: "1 week ago", type: "analysis" },
    { action: "Shared Traffic Insights", time: "2 weeks ago", type: "share" },
  ]

  const achievements = [
    {
      title: "Data Expert",
      description: "Completed 100+ analytics reports",
      icon: Award,
      color: "from-yellow-500 to-orange-600",
    },
    {
      title: "Insight Master",
      description: "Generated 50+ actionable insights",
      icon: TrendingUp,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Team Player",
      description: "Collaborated on 25+ projects",
      icon: User,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Early Adopter",
      description: "First to use new features",
      icon: Activity,
      color: "from-purple-500 to-pink-600",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {t.profile}
          </h1>
          <div className="absolute -bottom-2 left-0 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0"
        >
          {isEditing ? <X className="mr-2 h-4 w-4" /> : <Edit3 className="mr-2 h-4 w-4" />}
          {isEditing ? t.cancel : t.editProfile}
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <div className="relative mx-auto">
              <Avatar className="h-24 w-24 mx-auto ring-4 ring-white/20">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                <AvatarFallback className="text-2xl bg-white/20 text-white">AJ</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30"
              >
                <Camera className="h-4 w-4 text-white" />
              </Button>
            </div>
            <CardTitle className="text-white mt-4">{profileData.name}</CardTitle>
            <CardDescription className="text-blue-100">{profileData.role}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{profileData.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{profileData.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{profileData.location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Joined {profileData.joinDate}</span>
            </div>
            <div className="pt-4">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                {profileData.department}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm border shadow-sm">
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white"
              >
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-white">{t.personalInfo}</CardTitle>
                  <CardDescription className="text-blue-100">Manage your personal details</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                        className="bg-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        className="bg-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="bg-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        disabled={!isEditing}
                        className="bg-white/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!isEditing}
                      className="bg-white/50"
                      rows={3}
                    />
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2 pt-4">
                      <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {t.saveChanges}
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        {t.cancel}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="text-white">{t.recentActivity}</CardTitle>
                  <CardDescription className="text-green-100">Your latest actions and interactions</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {activityData.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg border">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                          <Activity className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {activity.time}
                          </div>
                        </div>
                        <Badge variant="outline">{activity.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                  <CardTitle className="text-white">{t.achievements}</CardTitle>
                  <CardDescription className="text-purple-100">Your accomplishments and milestones</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="p-4 bg-white/50 rounded-lg border">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`p-2 bg-gradient-to-r ${achievement.color} rounded-lg`}>
                            <achievement.icon className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <Progress value={100} className="mt-3 h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
