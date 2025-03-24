import prisma from "@/utils/db"
import { redirect } from "next/navigation"

export async function POST(request: Request) {
  const formData = await request.formData()
  const id = formData.get("id") as string

  await prisma.guitar.delete({ where: { id } })
  redirect("/guitars")
}
