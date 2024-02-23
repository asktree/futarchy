import { initializeDAO } from "./main"



const f = async () => {
    try {
        const id = await initializeDAO()
        console.log(id)
    }
    catch (e) {
        console.error(e)
        console.error(e.msg)
        console.error(e.message)

    }
}

f()