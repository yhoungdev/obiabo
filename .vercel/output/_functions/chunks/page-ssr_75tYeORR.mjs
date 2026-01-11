/* empty css                         */
import { createClient } from '@sanity/client';

const sanityClient = createClient(
            {"apiVersion":"v2023-08-24","projectId":"6jsm7r00","dataset":"production","useCdn":false}
          );

globalThis.sanityClient = sanityClient;
