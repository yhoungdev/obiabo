import { createClient } from '@sanity/client';

const sanity = createClient({
  projectId: "0jlly5ep",
  // Your Sanity project ID
  dataset: "production",
  // Your dataset name
  apiVersion: "2023-10-01",
  // Use a recent date for the API version
  useCdn: true
  // `false` if you want to ensure fresh data
});
createClient({
  projectId: "0jlly5ep",
  dataset: "production",
  apiVersion: "2023-10-01",
  token: "skpsPocTUMV8NRxmSfzNMOlYI4yFspkKUu0hgrQnBJhHHYg5afP153Upfp1eBDBBdPXekWIAQMUIwloOlKzKhwfxkoMGd8z88MJs5sWgyFhPJZrJRjaj7O8OdkAGliHXGTzOKdvNszjzxd7baPmQOmYQB5FMOENdfn5ZDSQPnEV7t32DLrun",
  useCdn: false
  // Disable CDN for write operations
});

export { sanity as s };
