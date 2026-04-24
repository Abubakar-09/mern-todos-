import { useEffect, useState } from 'react'

function App() {
  const [data, setdata] = useState([
    { task: "to make coffee lorem12 lorem 12 lorem34 lorem45", status: false, createdAt: "23013123" },
    { task: "to make chai", status: false, createdAt: "2301as3123" },
    { task: "to make website", status: true, createdAt: "2301343123" }
  ])

  const [form, setform] = useState({
    task: ''
  })

  useEffect(() => {
    let data;
    let getfunc = async () => {
      let res = (await fetch("http://localhost:3000/"))
      let result = await res.json();
      setdata(result)
    }
    getfunc()
  }, [])

  let handleStatusChange = async (item) => {
    let taskToChange = data.map(e => {
      return (e.createdAt == item.createdAt) && (e.task == item.task) ? { ...e, status: !e.status } : e
    })
    setdata(taskToChange)
     let res = await fetch("http://localhost:3000/", {
      method: "PUT",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(item)
    })
    let result = await res;

  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleDelete = async (item) => {
    let updateddata = data.filter(
      e => {
        return !(e.task === item.task && e.createdAt === item.createdAt)
      })
    setdata(updateddata)
    let res = await fetch(`http://localhost:3000/${item.task}`, {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ "mess": "just check" })
    })
    let result = await res;
  }

  const handleSubmit = async () => {
    if (form.task == 999) {
      setdata([])
      let res = await fetch(`http://localhost:3000/999`, {
        method: "DELETE",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ "mess": "just check" })
      })
      let result = await res;
      return null;
    }
    setdata([...data, { task: form.task, createdAt: Date.now() }])
    let res = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ "task": `${form.task}` })
    })
    let result = await res;
    setform({
      task: ''
    })
  }

  return (
    <>
      <div className="w-screen flex justify-center items-center max-md:flex-col gap-5 p-3">
        <input type="text" name="task" value={form.task} onChange={(e) => handleChange(e)} placeholder='Enter The Task' className='bg-white max-md:w-[90vw] border w-[40vw] p-1 rounded' />
        <button onClick={() => handleSubmit()} className='w-[10vw] bg-white p-1 max-md:w-[40vw] border rounded cursor-pointer'>Enter</button>
      </div>

      {/* table */}
      <div className="flex justify-center">
        <table className="w-[90vw] border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left w-[70%]">Tasks</th>
              <th className="border px-4 py-2 text-center w-[15%]">Status</th>
              <th className="border px-4 py-2 text-center w-[15%]">Delete</th>
            </tr>
          </thead>

          <tbody>
            {data.map(e => (
              <tr key={e.createdAt} className="hover:bg-gray-50">
                {/* Task */}
                <td className="border px-4 py-2">
                  {e.task}
                </td>

                {/* Status */}
                <td className="border px-4 py-2 text-center">
                  <button onClick={() => handleStatusChange(e)}>
                    {e.status ? (
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#48752C"><path d="M288-240q-100 0-170-70T48-480q0-100 70-170t170-70h384q100 0 170 70t70 170q0 100-70 170t-170 70H288Zm0-72h384q70 0 119-49t49-119q0-70-49-119t-119-49H288q-70 0-119 49t-49 119q0 70 49 119t119 49Zm469-83q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm-277-85Z" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#8C1A10"><path d="M288-240q-100 0-170-70T48-480q0-100 70-170t170-70h384q100 0 170 70t70 170q0 100-70 170t-170 70H288Zm0-72h384q70 0 119-49t49-119q0-70-49-119t-119-49H288q-70 0-119 49t-49 119q0 70 49 119t119 49Zm85-83q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm107-85Z" /></svg>
                    )}
                  </button>
                </td>

                {/* Delete */}
                <td className="border px-4 py-2 text-center">
                  <button onClick={() => handleDelete(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#8C1A10"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
