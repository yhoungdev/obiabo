import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getCliClient } from 'sanity/cli'

type Project = {
  name: string
  description: string
  url: string
}

function toDocumentId(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `project-${slug}`
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectsPath = join(__dirname, '../../../src/data/projects.json')

async function main() {
  const projects = JSON.parse(await readFile(projectsPath, 'utf8')) as Project[]
  const client = getCliClient({apiVersion: '2023-10-01'})
  const transaction = client.transaction()

  projects.forEach((project, index) => {
    transaction.createOrReplace({
      _id: toDocumentId(project.name),
      _type: 'project',
      name: project.name.trim(),
      description: project.description.trim(),
      url: project.url.trim(),
      featured: true,
      order: index + 1,
    })
  })

  const result = await transaction.commit()

  console.log(`Migrated ${projects.length} projects to Sanity.`)
  console.log(`Transaction ID: ${result.transactionId}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
