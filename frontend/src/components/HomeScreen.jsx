import React from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

const popularPosts = [
  {
    title: 'How to grow your network with real connections',
    excerpt: 'A practical guide to building meaningful relationships through content and community.',
    category: 'Connections',
  },
  {
    title: 'Write stronger posts for more engagement',
    excerpt: 'Tips for creating articles that readers want to comment on, share, and follow.',
    category: 'Blog',
  },
  {
    title: 'Keep your feed focused and useful',
    excerpt: 'See how to organize updates, requests, and stories for a productive home screen.',
    category: 'Platform',
  },
]

const recommendedPeople = [
  { name: 'Mia Chen', role: 'Product Designer' },
  { name: 'Jordan Lee', role: 'Community Manager' },
  { name: 'Amira Patel', role: 'Tech Writer' },
]

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 rounded-4xl border border-border bg-card p-8 shadow-sm lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent-foreground">
              Blog + Connections
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Your space for stories, people, and trusted connections.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
              SocialBuzz helps you publish posts, find collaborators, and keep your professional network connected—all from one dashboard.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-w-40">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-40">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl border border-border bg-background p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Quick start</p>
              <h2 className="mt-3 text-2xl font-semibold">Ready to start publishing?</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Create a post, manage requests, and keep your feed updated with the latest activity.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="rounded-2xl border border-border bg-card p-4">Publish your first blog in minutes.</li>
                <li className="rounded-2xl border border-border bg-card p-4">Review incoming connection requests.</li>
                <li className="rounded-2xl border border-border bg-card p-4">Browse recommended stories and people.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-background p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">What you can do</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm font-medium">Add a blog</p>
                  <p className="mt-2 text-sm text-muted-foreground">Share a story or update with the community.</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm font-medium">Connect with people</p>
                  <p className="mt-2 text-sm text-muted-foreground">Accept requests and expand your network.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <section className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Featured people</p>
                <h2 className="mt-3 text-3xl font-semibold">People to follow</h2>
              </div>
              <Link to="/suggested-people" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">See all people</Link>
            </div>
            <div className="mt-8 space-y-4">
              {recommendedPeople.map((person) => (
                <div key={person.name} className="rounded-2xl border border-border bg-background p-4">
                  <p className="font-medium text-foreground">{person.name}</p>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-1">
            {popularPosts.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.category}</p>
                <h3 className="mt-4 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.excerpt}</p>
              </div>
            ))}
          </div>
        </section> */}

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          {/* <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Featured people</p>
            <h2 className="mt-4 text-3xl font-semibold">People to follow</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Connect with active members who write, design, and shape community conversations.
            </p>
            <div className="mt-8 space-y-4">
              {recommendedPeople.map((person) => (
                <div key={person.name} className="rounded-2xl border border-border bg-background p-4">
                  <p className="font-medium text-foreground">{person.name}</p>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              ))}
            </div>
          </div> */}
          <div className="grid gap-6 lg:grid-cols-1">
            {popularPosts.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.category}</p>
                <h3 className="mt-4 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.excerpt}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-border bg-background p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Why SocialBuzz</p>
            <h2 className="mt-4 text-3xl font-semibold">Built for creators and connectors</h2>
            <div className="mt-8 space-y-4 text-sm leading-7 text-muted-foreground">
              <div className="rounded-2xl border border-border bg-card p-5">Write and share posts that matter to your network.</div>
              <div className="rounded-2xl border border-border bg-card p-5">Find and manage connections from a single page.</div>
              <div className="rounded-2xl border border-border bg-card p-5">Keep your feed clean, useful, and professional.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomeScreen