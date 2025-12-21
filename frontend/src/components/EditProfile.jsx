import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const EditProfile = () => {
  const user = useSelector((store) => store.user)
  const [name, setName] = useState(user?.name || '')
  const [avatar, setAvatar] = useState(user?.avatar || '')

  if (!user) {
    return (
      <div>
        <p>Please login to edit your profile.</p>
      </div>
    )
  }

  const initials =
    name && typeof name === 'string'
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : 'U'

  const handleSave = () => {
    // TODO: Call API to save profile changes
    console.log('Save profile', { name, avatar })
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Avatar>
              <AvatarImage src={avatar || ''} alt={name + ' Avatar'} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <div>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditProfile