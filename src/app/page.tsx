import { db } from "@/db"
import { users } from "@/db/schema"
import { revalidatePath } from "next/cache"

export default async function Home() {
  const allUsers = await db.select().from(users)

  async function addUser(data: FormData) {
    'use server'

    const fullName = data.get("fullName")?.toString()
    const phone = data.get("phone")?.toString()

    if (!fullName || !phone) {
      return;
    }

    await db.insert(users).values({
      fullName,
      phone
    })

    revalidatePath('/')
  }
  
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-900 text-zinc-50">
      <p>
        <pre>{JSON.stringify(allUsers, null, 2)}</pre>
      </p>
      <form action={addUser} className="flex flex-col gap-3 text-zinc-900">
        <input type="text" name="fullName" placeholder="Full name" className="text-zinc-900" />
        <input type="text" name="phone" placeholder="Phone number" className="text-zinc-900" />

        <button type="submit" className="text-zinc-50">Create</button>
      </form>
    </div>
  )
}
