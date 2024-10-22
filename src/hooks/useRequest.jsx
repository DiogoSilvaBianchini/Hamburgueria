
const useRequest = () => {
    const httpRequest  = async (url, method, body) => {
        const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${url}`, {
            headers: {"Content-Type":"application/json"},
            method,
            body: JSON.stringify(body)
        })

        const response = await req.json()

        return response
    } 


    return {httpRequest}
}

export default useRequest