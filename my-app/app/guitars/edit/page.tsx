import prisma from "@/utils/db"
import { redirect } from "next/navigation"

export default async function EditGuitarPage({ searchParams }: { searchParams: { id: string } }) {
  const guitar = await prisma.guitar.findUnique({ where: { id: searchParams.id } })

  if (!guitar) return <div className="p-6 text-red-600">Guitar not found.</div>

  async function updateGuitar(formData: FormData) {
    "use server"
    await prisma.guitar.update({
      where: { id: searchParams.id },
      data: {
        name: formData.get("name") as string,
        brand: formData.get("brand") as string,
        price: parseFloat(formData.get("price") as string)
      }
    })
    redirect("/guitars")
  }

  return (
    <form action={updateGuitar} className="p-6 space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Edit Guitar</h2>
      <input name="name" defaultValue={guitar.name} required className="border p-2 w-full" />
      <input name="brand" defaultValue={guitar.brand} required className="border p-2 w-full" />
      <input name="price" defaultValue={guitar.price} type="number" step="0.01" required className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Update</button>
    </form>
  )
}
