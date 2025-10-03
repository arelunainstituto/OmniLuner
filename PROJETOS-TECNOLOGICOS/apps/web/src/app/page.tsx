import { redirect } from 'next/navigation'

export default function HomePage() {
  // This will be handled by middleware
  // Authenticated users will be redirected to /dashboard
  // Unauthenticated users will be redirected to /auth/signin
  redirect('/dashboard')
}