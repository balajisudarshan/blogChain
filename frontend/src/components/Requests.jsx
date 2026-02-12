import axios from "axios"
import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Modal from "./Modal"
import { toast } from "sonner"
import { Link } from "react-router"
import CheckUser from "./utils/CheckUser"

const Requests = () => {
  const [requests, setRequests] = useState([])
  const [requestedUser, setRequestedUser] = useState(null)
  const [status, setStatus] = useState('')
  // const [resStatus, setResStatus] = useState('')

  const fetchRequets = async () => {
    const res = await axios.get("http://localhost:3000/connection/getRequests", {
      withCredentials: true,
    })
    setRequests(res.data.filteredConnections)
  }

  const handleRequest = async (resStatus) => {
    console.log(resStatus)
    try {
      const res = await axios.post(
        `http://localhost:3000/connection/connections/${resStatus}/${requestedUser.fromId._id}`,
        {},
        { withCredentials: true }
      )
      console.log(res)
      toast(res.data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchRequets()
  }, [])

  return (
    <CheckUser>
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-md border rounded-xl bg-card">
            <CardHeader className="bg-muted p-6">
              <CardTitle className="text-2xl font-semibold">
                Requests ({requests.length})
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              {requests.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-muted w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-muted-foreground">👥</span>
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">
                    No pending requests
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    When someone wants to connect, they’ll appear here.
                  </p>
                </div>
              )}

              <ul className="space-y-5">
                {requests.map((request) => {
                  const from = request.fromId
                  const initials =
                    from.name && typeof from.name === "string"
                      ? from.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "U"

                  return (
                    <li
                      key={request._id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-5 rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                      <Link to={`/profile/${from._id}`} className="flex items-start gap-4 flex-1">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="h-14 w-14 ring-2 ring-muted shadow-sm">
                            <AvatarImage src={from.avatar || ""} alt={from.name + " Avatar"} />
                            <AvatarFallback className="bg-muted text-foreground font-medium">
                              {initials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="space-y-1">
                            <div className="text-lg font-medium">{from.name}</div>
                            <div className="text-sm text-muted-foreground max-w-md line-clamp-2">
                              {from.bio || "No bio available"}
                            </div>

                            <div className="flex flex-wrap gap-2 pt-1">
                              {from.skills &&
                                from.skills.map((item, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="text-xs font-normal"
                                  >
                                    {item}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="flex gap-3 w-full sm:w-auto">
                        <Button
                          onClick={() => {
                            setRequestedUser(request)
                            setStatus('accept')
                          }}
                          size="sm"
                          className="flex-1 sm:flex-initial font-medium shadow-sm hover:shadow-md cursor-pointer"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => {
                            setRequestedUser(request)
                            setStatus('reject')
                          }}
                          size="sm"
                          variant="destructive"
                          className="flex-1 sm:flex-initial font-medium shadow-sm hover:shadow-md cursor-pointer"
                        >
                          Reject
                        </Button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
          {requestedUser && (
            <>
              {console.log(requestedUser)}
              <Modal>
                <Card className="w-full max-w-md mx-auto rounded-xl shadow-lg overflow-hidden">
                  <CardHeader className="bg-accent py-4">
                    <CardTitle className="text-xl text-center">Confirmation</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6 py-6">
                    <p className="text-center text-muted-foreground">
                      Do you want to{' '}
                      <span
                        className={
                          status === "accept"
                            ? "text-green-500 font-semibold"
                            : "text-red-500 font-semibold"
                        }
                      >
                        {status}
                      </span>
                      <span className="font-bold underline-offset-5 underline ml-1">
                        {requestedUser.fromId.name}
                      </span>{' '}
                      Request?
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      <Button
                        className="px-6 cursor-pointer"
                        onClick={() => {
                          const finalStatus = status === "accept" ? "accepted" : "rejected"
                          handleRequest(finalStatus)
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setRequestedUser(null)
                        }}
                        className="px-6"
                      >
                        Close
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Modal>
            </>
          )}
        </div>
      </div>
    </CheckUser>
  )
}

export default Requests

