import { useEffect, useState } from "react"

const useFetch = (url, method, body) => {
    const [data, setData] = useState("")
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const httpRequest = async () => {
            setLoad(true)
            const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${url}`, {
                headers: {"Content-Type":"application/json"},
                method,
                body: body ? JSON.stringify(body) : null
            })

            const res = await req.json()
            if(res.status === 200 || res.status === 201 || res.status === 304){
                setData(res.results)
            }else{
                setError(res.results)
            }
            setLoad(false)
        }

        url && httpRequest()
    },[url, method, body])

    return { data, load, error}
}

export default useFetch