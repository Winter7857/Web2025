import prisma from "@/utils/db"
import Link from "next/link"

export default async function GuitarList({ searchParams }: { searchParams: { name?:string ,brand?: string, price?: string } }) {
  const filters: any = {}
  if (searchParams.name) filters.name = searchParams.name 
  if (searchParams.brand) filters.brand = searchParams.brand
  if (searchParams.price) filters.price = parseFloat(searchParams.price)

  const guitars = await prisma.guitar.findMany({
    where: filters,
    orderBy: { name: "asc" }
  })

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🎸 Guitar Inventory</h1>

      <form className="space-x-2">
  <input name="name" placeholder="Search by name" className="border p-1" />
  <input name="brand" placeholder="Search by brand" className="border p-1" />
  <input name="price" placeholder="Max price" type="number" className="border p-1" />
  <button type="submit" className="px-3 py-1 bg-blue-600 text-white">Search</button>
  <Link href="/guitars/new" className="ml-4 underline text-green-600">+ Add Guitar</Link>
</form>


      <ul className="space-y-2">
        {guitars.map(g => (
          <li key={g.id} className="border p-2 rounded shadow-sm">
            <strong>{g.name}</strong> ({g.brand}) - ${g.price}
            <div className="space-x-2 mt-1">
              <Link className="text-blue-600 underline" href={`/guitars/edit?id=${g.id}`}>Edit</Link>
              <form action={`/guitars/delete`} method="POST" className="inline">
                <input type="hidden" name="id" value={g.id} />
                <button className="text-red-500 ml-2" type="submit">Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
