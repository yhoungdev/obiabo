import {readFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const __dirname = dirname(fileURLToPath(import.meta.url))
const introPath = join(__dirname, '../../../src/data/intro.md')
const aboutPath = join(__dirname, '../../../src/data/about.md')

async function main() {
  const [introMarkdown, fullMarkdown] = await Promise.all([
    readFile(introPath, 'utf8'),
    readFile(aboutPath, 'utf8'),
  ])
  const client = getCliClient({apiVersion: '2023-10-01'})

  const result = await client.createOrReplace({
    _id: 'about',
    _type: 'about',
    title: 'About',
    introMarkdown: introMarkdown.trim(),
    fullMarkdown: fullMarkdown.trim(),
  })

  console.log(`Migrated about content to Sanity document: ${result._id}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
