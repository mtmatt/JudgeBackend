import { createApp } from './create-app.mjs'
import { sleep } from './utils/sleep.mjs'
import { submissionListener } from './utils/submission-listener.mjs'

const app = createApp()
const PORT = process.env.PORT || 8787

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})

submissionListener()