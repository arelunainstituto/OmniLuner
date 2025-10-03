'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Tenant } from '@/lib/tenant'

interface SignInFormProps {
  tenant?: Tenant | null
  error?: string
  callbackUrl?: string
}

export function SignInForm({ tenant, error, callbackUrl }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('azure-ad', {
        callbackUrl: callbackUrl || '/dashboard',
        redirect: true,
      })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Icons.alertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Authentication Error
              </h3>
              <div className="mt-2 text-sm text-red-700">
                {error === 'invalid_tenant' && 'Invalid tenant configuration.'}
                {error === 'unauthorized_tenant' && 'You do not have access to this tenant.'}
                {error === 'access_denied' && 'Access denied. Please contact your administrator.'}
                {!['invalid_tenant', 'unauthorized_tenant', 'access_denied'].includes(error) && 
                  'An error occurred during sign in. Please try again.'}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <Icons.microsoft className="mr-2 h-4 w-4" />
              Sign in with Microsoft
            </>
          )}
        </Button>

        {tenant && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Signing in to <span className="font-medium">{tenant.name}</span>
            </p>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}