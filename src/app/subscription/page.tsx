import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Subscription() {
  return (
    <div className="bg-gray-50 py-12 sm:py-16 lg:py-20 dark:bg-gray-950">
      <div className="container grid items-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Choose your Plan</h2>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Upgrade to unlock more features. You can cancel at any time.
          </p>
        </div>
        <div className="mx-auto max-w-sm grid gap-4 sm:grid-cols-3 sm:max-w-none sm:gap-6 lg:grid-cols-3 lg:gap-4">
          <Card className="border-2 border-gray-100 dark:border-gray-800">
            <CardHeader className="flex flex-col items-center gap-2 py-6">
              <CardTitle className="text-2xl font-bold">
                <span className="text-gray-900 dark:text-gray-50">Gold</span>
              </CardTitle>
              <CardDescription className="text-sm">Up to 5 team members</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 px-6 py-6 text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-3xl font-bold">$25</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/per month</span>
              </div>
              <ul className="grid gap-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4" />
                  Access to premium features
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4" />
                  Email support
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4" />
                  1-on-1 meeting scheduler
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col p-6 gap-2">
              <Button>Subscribe</Button>
            </CardFooter>
          </Card>
          <Card className="border border-gray-100 shadow-md dark:border-gray-800">
            <CardHeader className="flex flex-col items-center gap-2 py-6">
              <CardTitle className="text-2xl font-bold">
                <span className="text-gray-900 dark:text-gray-50">Platinum</span>
              </CardTitle>
              <CardDescription className="text-sm">Up to 10 team members</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 px-6 py-6 text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-3xl font-bold">$49</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/per month</span>
              </div>
              <ul className="grid gap-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4" />
                  Access to premium features
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4" />
                  Email support
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4" />
                  1-on-1 meeting scheduler
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col p-6 gap-2">
              <Button>Subscribe</Button>
            </CardFooter>
          </Card>
          <Card className="border border-gray-100 dark:border-gray-800">
            <CardHeader className="flex flex-col items-center gap-2 py-6">
              <CardTitle className="text-2xl font-bold">
                <span className="text-gray-900 dark:text-gray-50">Silver</span>
              </CardTitle>
              <CardDescription className="text-sm">Up to 3 team members</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 px-6 py-6 text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-3xl font-bold">$15</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/per month</span>
              </div>
              <ul className="grid gap-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4" />
                  Access to premium features
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4" />
                  Email support
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4" />
                  1-on-1 meeting scheduler
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col p-6 gap-2">
              <Button>Subscribe</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

