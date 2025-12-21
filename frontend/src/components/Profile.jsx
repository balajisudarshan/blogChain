import React from "react"
import { useSelector } from "react-redux"

import ProfileCard from "./modules/ProfileCard"

const Profile = () => {
  const user = useSelector((store) => store.user)

  if (!user) {
    return (
      <div>
        <h1>Please login to view this page</h1>
      </div>
    )
  }

 

  return (
    <div className="p-4">
      {/* <div className="grid md:grid-cols-3 gap-6">

        <Card className="md:col-span-1">
          <CardHeader className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user.avatar || ""} alt={user.name + " Avatar"} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.bio && <p>{user.bio}</p>}
            <Button asChild>
              <Link to="/edit">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2 grid gap-6">

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((skill, i) => <Badge key={i}>{skill}</Badge>)
              ) : (
                <p>No skills added.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Connections</p>
                <p>0</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Posts</p>
                <p>0</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div> */}
      <ProfileCard user={user} isMine={true}/>
    </div>
  )
}

export default Profile
