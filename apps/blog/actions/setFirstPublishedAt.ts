import type {DocumentActionDescription} from 'sanity'

export const setFirstPublishedAtAction = (
  prev: DocumentActionDescription[],
  context: any
): DocumentActionDescription[] => {
  return prev.map((action) => {
    //@ts-ignore
    if (action.action === 'publish') {
      return {
        ...action,
        onHandle: async () => {
          const doc = context.document.displayed
          const patches = []

          // Only set firstPublishedAt if it doesn't exist and document is being published
          if (doc && !doc.firstPublishedAt && doc.publishedAt) {
            patches.push({
              setIfMissing: {
                firstPublishedAt: new Date().toISOString(),
              },
            })
          }

          // Execute patches if any
          if (patches.length > 0) {
            await context.patch.execute(patches)
          }

          // Call original publish action
          return action.onHandle?.()
        },
      }
    }
    return action
  })
}
