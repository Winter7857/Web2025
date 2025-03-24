import prisma from "@/utils/db"
import { redirect } from "next/navigation"

export default function NewGuitarPage() {
  async function createGuitar(formData: FormData) {
    "use server"
    await prisma.guitar.create({
      data: {
        name: formData.get("name") as string,
        brand: formData.get("brand") as string,
        price: parseFloat(formData.get("price") as string)
      }
    })
    redirect("/guitars")
  }

  return (
    <form action={createGuitar} className="p-6 space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Add New Guitar</h2>
      <input name="name" placeholder="Name" required className="border p-2 w-full" />
      <input name="brand" placeholder="Brand" required className="border p-2 w-full" />
      <input name="price" placeholder="Price" type="number" step="0.01" required className="border p-2 w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Create</button>
    </form>
  )
}
