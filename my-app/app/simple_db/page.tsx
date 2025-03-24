import TodoItem from "@/components/TodoItem"
import STYLE from "@/constants/style"
import prisma from "@/utils/db"
import { revalidatePath } from "next/cache"

export default async function SimpleDb() {

  // await prisma.todo.create({
  //   data: {
  //     title: 'Learn how to use Prisma 3',
  //     done: true,
  //   }
  // })

  // const todo = await prisma.todo.findFirst()
  // console.log("First record: ", todo)

  // const todoX = await prisma.todo.findMany( { where: { title: "xxx" } } )
  // console.log("X record: ", todoX)

  const todos = await prisma.todo.findMany()

  async function addTask(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const done = formData.get("done") === "on"
    console.log("title: ", title, "done: ", done ? "true" : "false")
    await prisma.todo.create({
      data: {
        title,
        done,
      }
    })
    revalidatePath("/simple_db")
  }

  async function deleteTask(id: string) {
    "use server"
    console.log("Delete task")
    await prisma.todo.delete({ where: { id } })
    revalidatePath("/simple_db")
  }

  async function toggleTask(id: string, done: boolean) {
    "use server"
    console.log("Toggle task")
    await prisma.todo.update({
      where: { id },
      data: { done }
    })
    revalidatePath("/simple_db")
  }

  return (
    <div>
      <h1>Simple DB</h1>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            index={index}
            title={todo.title}
            done={todo.done}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        ))
        }
      </ul>


      <div>
        <h2>Add task</h2>
        <form action={addTask}>
          <input className={STYLE} type="text" name="title" placeholder="Title" />
          <input className={STYLE} type="checkbox" name="done" />
          <button className={STYLE} type="submit">Add</button>
        </form>
      </div>

    </div>
  )
}